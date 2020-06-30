import * as React from 'react'
import * as THREE from 'three'
import TreeImage from '../../../Sprites/graveyard/png/Objects/Tree.png'


export const AnimeThreeJS = () => {
    /* Renderer */
    const renderer = React.useRef(new THREE.WebGLRenderer({
        antialias: true
    })).current

    /* Camera */
    const camera = React.useRef(new THREE.PerspectiveCamera(
        35,
        window.innerWidth / window.innerHeight,
        300,
        10000
    )).current

    /* Colors */
    const lightgrey = React.useRef(new THREE.Color('lightgrey')).current

    /* Scene */
    const scene = React.useRef(new THREE.Scene()).current

    /* Lights */
    const ambientLight = React.useRef(new THREE.AmbientLight(0xffffff, 0.5)).current
    const pointLight = React.useRef(new THREE.PointLight(0xffffff, 0.5)).current

    /* Geometry */
    const boxGeometry = React.useRef(new THREE.BoxGeometry(100, 100, 100, 10, 10, 10)).current
    const sphereGeometry = React.useRef(new THREE.SphereGeometry(50, 20, 20)).current
    const planeGeometry = React.useRef(new THREE.PlaneGeometry(window.innerWidth * 10, window.innerHeight * 10, 1, 1)).current

    /* Material */
    const meshLambertMaterial = React.useRef(new THREE.MeshLambertMaterial()).current
    const meshPhongMaterial = React.useRef(new THREE.MeshPhongMaterial()).current
    const meshStandardMaterial = React.useRef(new THREE.MeshStandardMaterial({
        color: lightgrey
    })).current

    /* Mesh */
    const boxMesh = React.useRef(new THREE.Mesh(boxGeometry, meshLambertMaterial)).current
    const sphereMesh = React.useRef(new THREE.Mesh(sphereGeometry, meshPhongMaterial)).current
    const planeMesh = React.useRef(new THREE.Mesh(planeGeometry, meshStandardMaterial)).current

    const animate = () => {
        boxMesh.rotation.x += 0.01
        boxMesh.rotation.y += 0.01
        renderer.render(scene, camera)
        requestAnimationFrame(animate)
    }

    React.useEffect(() => {
        requestAnimationFrame(animate)
    }, [])

    const setCanvasRef = (element: any) => {
        renderer.setClearColor(0xffffff);
        renderer.setPixelRatio(window.devicePixelRatio || 1)
        renderer.setSize(window.innerWidth, window.innerHeight)
        element.appendChild(renderer.domElement)

        /* Mesh Position */
        boxMesh.position.set(0, 0, -800)
        sphereMesh.position.set(200, 0, -800)
        planeMesh.position.set(0, -100, -2000)
        planeMesh.rotation.set(-90 * (Math.PI / 180), 0, 0)

        /* Added in the scene */
        scene.add(ambientLight)
        scene.add(pointLight)
        scene.add(boxMesh)
        scene.add(sphereMesh)
        scene.add(planeMesh)
    }

    const onWindowResize = () => {
        // renderer.setSize(window.innerWidth, window.innerHeight)
        // sphereMesh.scale.set(1, 1, 1)
        // boxMesh.scale.set(1, 1, 1)
        // boxMesh.scale.set(100 / window.innerWidth, 100 / window.innerHeight, 1)
    }

    window.addEventListener('resize', onWindowResize)

    return (
        <div ref={setCanvasRef}></div>
    )
}