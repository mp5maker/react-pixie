import * as React from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

export const AnimeThreeJS = ({ colors, theme }: any) => {
    /* Renderer */
    const renderer = React.useRef(new THREE.WebGLRenderer({
        antialias: true
    })).current;
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.shadowMap.enabled = true

    /* Camera */
    const camera = React.useRef(new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    )).current

    /* Scene */
    const scene = React.useRef(new THREE.Scene()).current

    /* Geometry */
    const geometry = React.useRef({
        box: new THREE.BoxGeometry(),
        line: new THREE.BufferGeometry().setFromPoints([
            new THREE.Vector3(-10, 0, 0),
            new THREE.Vector3(0, 0, 0),
            new THREE.Vector3(10, 0, 0),
        ])
    }).current

    /* Material */
    const material = React.useRef({
        meshBasic: new THREE.MeshBasicMaterial({
            color: 0x00ff00
        }),
        lineBasic: new THREE.LineBasicMaterial({
            color: 0x0000ff
        })
    }).current

    /* Mesh */
    const mesh = React.useRef({
        box: new THREE.Mesh(geometry.box, material.meshBasic),
    }).current

    /* Line */
    const line = React.useRef(new THREE.Line(geometry.line, material.lineBasic)).current

    /* Controls */
    const orbitControls = React.useRef(new OrbitControls(camera, renderer.domElement)).current

    /* Animate */
    const animate = () => {
        renderer.render(scene, camera)

        mesh.box.rotation.x += 0.01;
        mesh.box.rotation.y += 0.01;

        orbitControls.update()
        requestAnimationFrame(animate)
    }

    const onResizeWindow = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        orbitControls.update()
    }

    React.useEffect(() => {
        /* Add Scenes */
        scene.add(mesh.box)
        scene.add(line)

        /* Camera Settings */
        camera.position.set(0, 0, 5)
        camera.lookAt(0, 0, 0)
        orbitControls.keys = {
            RIGHT: 37, //left arrow
            BOTTOM: 38, // up arrow
            LEFT: 39, // right arrow
            UP: 40 // down arrow
        }
        orbitControls.update()

        /* Window Size Change */
        window.addEventListener('resize', onResizeWindow)

        /* Animation */
        requestAnimationFrame(animate)

        return () => window.removeEventListener('resize', onResizeWindow)
    }, [])

    const appendThreeJSContainer = (element: any) => {
        element.appendChild(renderer.domElement)
    }

    return (
        <>
            <div ref={appendThreeJSContainer}></div>
        </>
    )
}