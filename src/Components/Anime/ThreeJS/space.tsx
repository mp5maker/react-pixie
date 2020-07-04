import * as React from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

let stars;
let acceleration = 0.001;

export const AnimeThreeJS = ({ colors, theme }: any) => {
    /* Colors */
    const preparedColors = React.useRef({
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

    /* Light */
    const light = React.useRef({
        point: new THREE.PointLight(preparedColors.primaryColor, 1),
        ambient: new THREE.AmbientLight(preparedColors.primaryColor, 1),
        spot: new THREE.SpotLight(preparedColors.primaryColor, 1)
    }).current

    const geometry = React.useRef({
        stars: new THREE.Geometry(),
        box: new THREE.BoxGeometry(5, 5, 5)
    }).current

    /* Material */
    const material = React.useRef({
        meshLambert: new THREE.MeshLambertMaterial({ color: preparedColors.primaryColor }),
    }).current

    /* Mesh */
    const mesh = React.useRef({
        boxMeshLambert: new THREE.Mesh(geometry.box, material.meshLambert),
    }).current

    /* Control */
    const control = React.useRef({
        orbit: new OrbitControls(camera.perspective, renderer.domElement)
    }).current

    /* Animation */
    const animate = () => {
        mesh.boxMeshLambert.rotation.x += 0.01;
        mesh.boxMeshLambert.rotation.y += 0.01;

        geometry.stars.vertices.forEach((star: any, index) => {
            star.velocity += acceleration
            star.z += star.velocity

            if (star.z > 200) {
                star.z = -200
                star.velocity = 0
            }
        })

        geometry.stars.verticesNeedUpdate = true
        renderer.render(scene, camera.perspective)
        control.orbit.update()
        requestAnimationFrame(animate)
    }

    const prepareSpace = () => {
        for(let i = 0; i < 6000; i++) {
            let star: any = new THREE.Vector3(
                Math.random() * 600 - 300,
                Math.random() * 600 - 300,
                Math.random() * 600 - 300,
            )
            star.velocity = 0;
            geometry.stars.vertices.push(star)
        }
        let texture = new THREE.TextureLoader().load('Circle/circle.png')
        let starMaterial = new THREE.PointsMaterial({
            color: 0xaaaaaa,
            size: 0.5,
            map: texture,
            transparent: true,
        })
        stars = new THREE.Points(geometry.stars, starMaterial)
        scene.add(stars)
    }

    /* On Window Resize */
    const onWindowResize = () => {
        /* Renderer Settings */
        renderer.setSize(window.innerWidth, window.innerHeight)
        /* Camera Settings */
        camera.perspective.aspect = window.innerWidth / window.innerHeight
        camera.perspective.updateProjectionMatrix();
        /* Orbit Settings */
        control.orbit.update()
    }

    /* Lifecycle */
    React.useEffect(() => {
        /* Renderer Settings */
        renderer.setClearColor(preparedColors.backgroundColor)
        renderer.setSize(window.innerWidth, window.innerHeight)
        renderer.setPixelRatio(window.devicePixelRatio || 1)
        renderer.shadowMap.enabled = true

        /* Camera Settings */
        camera.perspective.position.set(0, 0, 5)
        camera.perspective.lookAt(0, 0, 0)

        /* Light Settings */
        light.ambient.position.set(0, 0, 0)
        light.point.position.set(0, 0, 0)
        light.spot.position.set(0, 0, 0)

        /* Mesh Settings */
        mesh.boxMeshLambert.position.set(0, 0, -25)

        /* Scene Settings */
        scene.add(camera.perspective)
        scene.add(light.point)
        scene.add(light.ambient)
        scene.add(light.spot)
        scene.add(mesh.boxMeshLambert)

        /* Orbit Controls */
        control.orbit.keys = {
            RIGHT: 37, //left arrow
            BOTTOM: 38, // up arrow
            LEFT: 39, // right arrow
            UP: 40 // down arrow
        }
        control.orbit.update()
        control.orbit.minDistance = 0
        control.orbit.maxDistance = 200

        prepareSpace()

        requestAnimationFrame(animate)
        window.addEventListener('resize', onWindowResize)

        return () => {
            window.removeEventListener('resize', onWindowResize)
        }
    }, [theme])

    /* Append Child */
    const setElement = (element: any) => element.appendChild(renderer.domElement)

    return (
        <div ref={setElement}></div>
    )
}