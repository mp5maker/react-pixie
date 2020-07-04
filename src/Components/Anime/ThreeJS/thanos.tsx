import * as React from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import SmokeImage from '../../../Sprites/smoke/smoke.png'

let particles: any = []
export const AnimeThreeJS = ({ colors, theme }: any) => {
    /* Colors */
    const preparedColors = React.useRef({
        primaryColor: new THREE.Color(colors[theme].primaryColor),
        secondaryColor: new THREE.Color(colors[theme].secondaryColor),
        backgroundColor: new THREE.Color(colors[theme].backgroundColor),
        infoColor: new THREE.Color(colors[theme].infoColor),
        warningColor: new THREE.Color(colors[theme].warningColor),
        successColor: new THREE.Color(colors[theme].successColor),
        dangerColor: new THREE.Color(colors[theme].dangerColor),
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
            80,
            window.innerWidth / window.innerHeight,
            1,
            10000
        )
    }).current

    /* Light */
    const light = React.useRef({
        point: new THREE.PointLight(0xff0000, 30, 350, 1.7),
        ambient: new THREE.AmbientLight(0xff0000, 1),
        directional: new THREE.DirectionalLight(0xff0000, 1)
    }).current

    /* Geometry */
    const geometry = React.useRef({
        box: new THREE.BoxGeometry(1, 1, 1),
        planeBuffer: new THREE.PlaneBufferGeometry(350, 350),
    }).current

    /* Material */
    const material = React.useRef({
        lambert: new THREE.MeshLambertMaterial({
            color: preparedColors.primaryColor,
            wireframe: true
        }),
        basic: new THREE.MeshBasicMaterial({
            color: preparedColors.primaryColor
        }),
        standard: new THREE.MeshStandardMaterial({
            color: preparedColors.secondaryColor,
            transparent: true
        })
    }).current

    /* Mesh */
    const mesh = React.useRef({
        boxLambert: new THREE.Mesh(geometry.box, material.lambert),
        standardPlaneBuffer: new THREE.Mesh(geometry.planeBuffer, material.standard)
    }).current

    /* Controls */
    const control = React.useRef({
        orbit: new OrbitControls(camera.perspective, renderer.domElement)
    }).current

    /* Loaders */
    const loader = React.useRef({
        texture: new THREE.TextureLoader()
    }).current

    /* Clock */
    const clock = React.useRef(new THREE.Clock()).current

    /* Animation */
    const animate = () => {
        let delta = clock.getDelta()

        particles.forEach((particle: any) => {
            particle.rotation.z -= delta * 1.5
        })

        if (Math.random() > 0.9) {
            light.point.power = 350 + (Math.random() * 200)
        }

        renderer.render(scene, camera.perspective)
        control.orbit.update()
        requestAnimationFrame(animate)
    }

    /* On Loads */
    const onLoadSmokeImage = (texture: any) => {
        material.standard.map = texture

        for (let p = 880; p > 780; p--) {
            let particle = new THREE.Mesh(geometry.planeBuffer, material.standard)
            particle.position.set(
                0.1 * p * Math.cos((44 * p * Math.PI) / 180),
                0.1 * p * Math.sin((45 * p * Math.PI) / 180),
                0.01 * p
            );
            particle.rotation.z = Math.random() * 360;
            particles.push(particle)
            scene.add(particle)
        }
    }

    /* Resizing Window */
    const onWindowResize = () => {
        renderer.setSize(window.innerWidth, window.innerHeight)
        camera.perspective.aspect = window.innerWidth / window.innerHeight
        camera.perspective.updateProjectionMatrix()
        control.orbit.update()
    }

    /* Life Cycle */
    React.useEffect(() => {
        /* Renderer Settings */
        renderer.setSize(window.innerWidth, window.innerHeight)
        renderer.setClearColor(preparedColors.backgroundColor)
        renderer.shadowMap.enabled = true
        renderer.setPixelRatio(window.devicePixelRatio | 1)

        /* Light Settings Settings */
        light.directional.position.set(0, 0, 1)
        light.point.position.set(0, 0, 250)

        /* Camera Settings */
        camera.perspective.position.set(0, 0, 1000)
        camera.perspective.lookAt(0, 0, 0)

        /* Scene Settings */
        scene.add(camera.perspective)
        scene.add(light.directional)
        scene.add(light.point)

        /* Orbit Settings */
        control.orbit.keys = {
            RIGHT: 37, //left arrow
            BOTTOM: 38, // up arrow
            LEFT: 39, // right arrow
            UP: 40 // down arrow
        }
        control.orbit.update()

        /* Load Texture */
        loader.texture.load(SmokeImage, onLoadSmokeImage)

        /* Start Animation */
        requestAnimationFrame(animate)

        /* Resize Listener */
        window.addEventListener('resize', onWindowResize)

        return () => {
            window.removeEventListener('resize', onWindowResize)
        }
    }, [theme])

    /* DOM */
    const setElement = (element: any) => element.appendChild(renderer.domElement)

    return (
        <>
            <div ref={setElement}></div>
        </>
    )
}