import * as React from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

let delta = 0
export const AnimeThreeJS = ({ colors, theme }: any) => {
    /* Colors */
    const colorCollection = React.useRef({
        primaryColor: new THREE.Color(colors[theme].primaryColor),
        bgColor: new THREE.Color(colors[theme].backgroundColor),
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

    /* Scene */
    const scene = React.useRef(new THREE.Scene()).current

    /* Camera */
    const camera = React.useRef({
        perspective: new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            1,
            1000
        ),
    }).current

    /* Geometry */
    const geometry = React.useRef({
        sphere: new THREE.SphereGeometry(
            5,
            32,
            32,
            0,
            2 * Math.PI,
            0,
            2 * Math.PI
        ),
        box: new THREE.BoxGeometry(1, 1, 1)
    }).current

    /* Material */
    const material = React.useRef({
        lambert: new THREE.MeshLambertMaterial({
            color: colorCollection.primaryColor,
            wireframe: true
        }),
        basic: new THREE.MeshBasicMaterial({
            color: colorCollection.secondaryColor
        }),
    }).current

    /* Mesh */
    const mesh = React.useRef({
        sphereLambert: new THREE.Mesh(geometry.sphere, material.lambert),
        sphereBasic: new THREE.Mesh(geometry.sphere, material.basic),
        boxLambert: new THREE.Mesh(geometry.box, material.lambert)
    }).current

    /* Light */
    const light = React.useRef({
        ambient: new THREE.AmbientLight(
            0x404040,
            5
        ),
        point: new THREE.PointLight(
            0xff0000,
            1,
            100
        )
    }).current

    /* Helper */
    const helper = {
        light: {
            point: new THREE.PointLightHelper(
                light.point,
                1
            )
        }
    }

    /* Orbit Controls */
    const orbitControls = React.useRef(new OrbitControls(
        camera.perspective,
        renderer.domElement
    )).current

    /* Animation */
    const animate = () => {
        mesh.boxLambert.rotation.x += 0.01
        mesh.boxLambert.rotation.y += 0.01
        renderer.render(scene, camera.perspective)
        requestAnimationFrame(animate)
    }

    /* Resizing */
    const onWindowResize = () => {
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.perspective.aspect = window.innerWidth / window.innerHeight;
        camera.perspective.updateProjectionMatrix()
        orbitControls.update()
    }

    /* First Cycle + Changing Cycle */
    React.useEffect(() => {
        /* Renderer Settings */
        renderer.setClearColor(colorCollection.bgColor)
        renderer.setPixelRatio(window.devicePixelRatio || 1)
        renderer.setSize(window.innerWidth, window.innerHeight)
        renderer.shadowMap.enabled = true

        /* Light Settings */
        light.ambient.position.set(0, 0, 5)
        light.point.position.set(0, 0, 5)

        /* Camera Settings */
        camera.perspective.position.set(0, 0, 5)
        camera.perspective.lookAt(0, 0, 0)

        /* Scene Settings */
        scene.add(camera.perspective)
        // scene.add(mesh.sphereLambert)
        // scene.add(mesh.sphereBasic)
        scene.add(mesh.boxLambert)
        scene.add(light.ambient)
        scene.add(light.point)
        // scene.add(helper.light.point)


        /* Start Animation */
        requestAnimationFrame(animate)

        /* Orbit Controls */
        orbitControls.keys = {
            RIGHT: 37, //left arrow
            BOTTOM: 38, // up arrow
            LEFT: 39, // right arrow
            UP: 40 // down arrow
        }
        orbitControls.update()

        /* Reszing Event */
        window.addEventListener('resize', onWindowResize)

        return () => {
            window.removeEventListener('resize', onWindowResize)
        }
    }, [theme])

    const setRef = (element: any) => {
        element.appendChild(renderer.domElement)
    }

    return (
        <>
            <div ref={setRef}></div>
        </>
    )
}