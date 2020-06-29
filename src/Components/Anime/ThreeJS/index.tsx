import * as React from 'react'
import * as THREE from 'three'
import TreeImage from '../../../Sprites/graveyard/png/Objects/Tree.png'


export const AnimeThreeJS = () => {
    /* Renderer ==> Scene, Camera */
    const renderer = React.useRef(new THREE.WebGL1Renderer({
        antialias: true
    })).current
    /* Scene ==> Lights, Mesh */
    const scene = React.useRef(new THREE.Scene()).current
    /* Camera */
    const camera = React.useRef(new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        3000
    )).current

    /* Geometry */
    const geometry = React.useRef(new THREE.BoxGeometry(100, 100, 100)).current
    // const geometry = React.useRef(new THREE.SphereGeometry(50, 20, 10)).current
    // const geometry = React.useRef(new THREE.PlaneGeometry(50, 50)).current
    // const geometry = React.useRef(new THREE.ConeGeometry(50, 100, 100)).current
    // const geometry = React.useRef(new THREE.CylinderGeometry(50, 100, 100, 20, 20, true)).current
    // const geometry = React.useRef(new THREE.TorusKnotGeometry(100, 30, 100, 100)).current

    /* Material */
    // const material = React.useRef(new THREE.MeshBasicMaterial({ color: 0xF3FFE2 })).current
    // const material = React.useRef(new THREE.MeshBasicMaterial({
    //     color: 0xff0000,
    //     transparent: true,
    //     opacity: 1,
    //     wireframe: true,
    //     wireframeLinewidth: 1,
    // })).current
    // const material = React.useRef(new THREE.MeshLambertMaterial({
    //     color: 0xF3FFE2,
    //     emissive: 0xff0000,
    // })).current
    // const material = React.useRef(new THREE.MeshLambertMaterial({
    //     color: 0xF3FFE2,
    //     emissive: 0xff0000,
    //     emissiveIntensity: 0.1,
    //     map: new THREE.TextureLoader().load(TreeImage)
    // })).current
    // const material = React.useRef(new THREE.MeshPhongMaterial({
    //     color: 0xF3FFE2,
    //     emissive: 0xff0000,
    //     emissiveIntensity: 0.1,
    //     specular: 0xffffff,
    //     shininess: 2,
    //     map: new THREE.TextureLoader().load(TreeImage)
    // })).current
    const material = React.useRef(new THREE.MeshStandardMaterial({
        color: 0xF3FFE2,
        roughness: 0.5,
        metalness: 0.5,
        map: new THREE.TextureLoader().load(TreeImage)
    })).current

    /* Mesh ==> Geometry, Material */
    const mesh = React.useRef(new THREE.Mesh(geometry, material)).current
    mesh.position.set(0, 0, -1000)
    scene.add(mesh)

    /* Lights */
    const lightOne = React.useRef(new THREE.AmbientLight(0xffffff, 0.5)).current
    const lightTwo = React.useRef(new THREE.PointLight(0xffffff, 0.5)).current
    // const lightTwo = React.useRef(new THREE.DirectionalLight(0xffffff, 0.5)).current
    // lightTwo.target = mesh
    // const lightTwo = React.useRef(new THREE.SpotLight(0xffffff, 0.5)).current
    // lightTwo.target = mesh
    // const lightTwo = React.useRef(new THREE.HemisphereLight(0xffffff, 0xffffff, 1)).current

    scene.add(lightOne)
    scene.add(lightTwo)


    const animate = () => {
        mesh.rotation.x += 0.01
        mesh.rotation.y += 0.01
        // mesh.rotation.z += 0.01
        renderer.render(scene, camera)
        requestAnimationFrame(animate)
    }

    requestAnimationFrame(animate)

    const setCanvasRef = (element: any) => {
        renderer.setSize(window.innerWidth, window.innerHeight)
        renderer.setClearColor(0x00000);
        renderer.setPixelRatio(window.devicePixelRatio || 1)
        renderer.render(scene, camera)
        element.appendChild(renderer.domElement)
    }

    return (
        <div ref={setCanvasRef}></div>
    )
}