import * as React from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

let materialsArray = []
export const AnimeThreeJSSkybox = ({ colors, theme, history }: any) => {
    /* Renderer */
    const renderer = React.useRef(new THREE.WebGLRenderer({
        antialias: true
    })).current
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(window.innerWidth, window.innerHeight)

    /* Scene */
    const scene = React.useRef(new THREE.Scene()).current

    /* Camera */
    const camera = React.useRef(new THREE.PerspectiveCamera(
        55,
        window.innerWidth / window.innerHeight,
        45,
        30000
    )).current
    camera.position.set(-900, -200, -900)

    /* Control */
    const control = React.useRef(new OrbitControls(camera, renderer.domElement)).current

    /* Animation */
    const animate = () => {
        renderer.render(scene, camera)
        control.update()
        requestAnimationFrame(animate)
    }

    /* Window Resize */
    const onWindowResize = () => {
        renderer.setSize(window.innerWidth, window.innerHeight)
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix()
        control.update()
    }

    /* LifeCycle */
    React.useEffect(() => {
        requestAnimationFrame(animate)

        let texture_bk = new THREE.TextureLoader().load('Skybox/arid_bk.jpg')
        let texture_dn = new THREE.TextureLoader().load('Skybox/arid_dn.jpg')
        let texture_ft = new THREE.TextureLoader().load('Skybox/arid_ft.jpg')
        let texture_lf = new THREE.TextureLoader().load('Skybox/arid_lf.jpg')
        let texture_rt = new THREE.TextureLoader().load('Skybox/arid_rt.jpg')
        let texture_up = new THREE.TextureLoader().load('Skybox/arid_up.jpg')
        materialsArray = [
            new THREE.MeshBasicMaterial({ map: texture_ft }),
            new THREE.MeshBasicMaterial({ map: texture_bk }),
            new THREE.MeshBasicMaterial({ map: texture_up }),
            new THREE.MeshBasicMaterial({ map: texture_dn }),
            new THREE.MeshBasicMaterial({ map: texture_rt }),
            new THREE.MeshBasicMaterial({ map: texture_lf }),
        ]

        for (let i = 0; i < materialsArray.length; i++) {
            materialsArray[i].side = THREE.BackSide
        }

        let skyboxGeometry = new THREE.BoxGeometry(10000, 10000, 10000)
        let skybox = new THREE.Mesh(skyboxGeometry, materialsArray)
        scene.add(skybox)

        control.minDistance = 500
        control.maxDistance = 1500

        window.addEventListener('resize', onWindowResize)

        return () => {
            window.removeEventListener('resize', onWindowResize)
        }
    }, [theme])

    /* Append Child */
    const setElement = React.useCallback((element: any) => {
        if (element) element.firstElementChild && element.removeChild(element.firstElementChild)
        element && element.appendChild(renderer.domElement)
    }, [theme])

    return (
        <>
            <div ref={setElement}></div>
        </>
    )
}