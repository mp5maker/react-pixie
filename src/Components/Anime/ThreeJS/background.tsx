import * as React from 'react'
import * as THREE from 'three'
import get from 'lodash/get'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export const AnimeThreeJS = ({ colors, theme }: any) => {
    const COLORS = React.useRef({
        primaryColor: new THREE.Color(colors[theme].primaryColor),
        backgroundColor: new THREE.Color(colors[theme].backgroundColor),
        secondaryColor: new THREE.Color(colors[theme].secondaryColor),
        infoColor: new THREE.Color(colors[theme].infoColor),
        dangerColor: new THREE.Color(colors[theme].dangerColor),
        warningColor: new THREE.Color(colors[theme].warningColor),
        successColor: new THREE.Color(colors[theme].successColor),
    }).current

    /* Renderer */
    const renderer = React.useRef(new THREE.WebGLRenderer({
        antialias: true
    })).current

    /* Camera */
    const camera = React.useRef({
        perspective: new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            100000
        )
    }).current

    /* Geometry */
    const geometry = React.useRef({
        box: new THREE.BoxGeometry(5, 5, 5)
    }).current

    /* Material */
    const material = React.useRef({
        lambert: new THREE.MeshLambertMaterial({
            color: COLORS.primaryColor,
            wireframe: true
        })
    }).current

    /* Mesh */
    const mesh = React.useRef({
        box: new THREE.Mesh(geometry.box, material.lambert)
    }).current

    /* Scene */
    const scene = React.useRef(new THREE.Scene()).current

    /* Light */
    const light = React.useRef({
        ambient: new THREE.AmbientLight(COLORS.primaryColor, 1),
        point: new THREE.PointLight(COLORS.primaryColor, 10, 5000, 500),
        pointTwo: new THREE.PointLight(COLORS.primaryColor, 10, 5000, 500)
    }).current

    /* Loader */
    const loader = React.useRef({
        gltf: new GLTFLoader(),
        texture: new THREE.TextureLoader()
    }).current

    /* Control */
    const control = React.useRef({
        orbit: new OrbitControls(camera.perspective, renderer.domElement)
    }).current

    /* Load Background GLTF */
    const onSuccessLoadGLTF = (bangladeshImageGLTF: any) => {
        let bangladeshGLTFMesh = get(bangladeshImageGLTF, 'scene', {})
        bangladeshGLTFMesh.position.set(0, 0, 0)
        bangladeshGLTFMesh.scale.set(1, 1, 1)
        scene.add(bangladeshGLTFMesh)
        control.orbit.update()
    }

    /* Animation */
    const animate = () => {
        renderer.render(scene, camera.perspective)

        mesh.box.rotation.y += 0.01
        mesh.box.rotation.x += 0.01

        control.orbit.update()
        requestAnimationFrame(animate)
    }

    /* On Window Resize */
    const onWindowResize = () => {
        renderer.setSize(window.innerWidth, window.innerHeight)
        camera.perspective.aspect = window.innerWidth / window.innerHeight
        camera.perspective.updateProjectionMatrix()
        control.orbit.update()
    }

    /* Lifecycle */
    React.useEffect(() => {
        /* Renderer Settings */
        renderer.setClearColor(COLORS.backgroundColor)
        renderer.setSize(window.innerWidth, window.innerHeight)
        renderer.setPixelRatio(window.devicePixelRatio)
        renderer.shadowMap.enabled = true

        /* Camera Settings */
        camera.perspective.position.set(0, 0, -25)
        camera.perspective.lookAt(0, 0, 0)

        /* Light Settings */
        light.ambient.position.set(0, 0, -25)
        light.point.position.set(0, 0, -25)
        light.pointTwo.position.set(0, 0, -5000)

        /* Scene Settings */
        scene.add(light.ambient)
        scene.add(light.point)
        scene.add(mesh.box)

        /* Control Settings */
        control.orbit.keys = {
            RIGHT: 37, //left arrow
            BOTTOM: 38, // up arrow
            LEFT: 39, // right arrow
            UP: 40 // down arrow
        }
        control.orbit.update()

        /* Load GLTF */
        loader.gltf.load('Sculptures/bangladesh-image.glb', onSuccessLoadGLTF)

        /* Start Animation */
        requestAnimationFrame(animate)

        /* Window Resize Event */
        window.addEventListener('resize', onWindowResize)
        return () => {
            window.removeEventListener('resize', onWindowResize)
        }
    })

    /* Set Canvas */
    const setCanvasRef = (element: any) => element.appendChild(renderer.domElement)


    return (
        <>
            <div ref={setCanvasRef}></div>
        </>
    )
}