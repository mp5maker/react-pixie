### Basic ###
```javascript
import * as React from 'react'
import * as THREE from 'three'
import { useTranslation } from 'react-i18next'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { DragControls } from 'three/examples/jsm/controls/DragControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { TTFLoader } from 'three/examples/jsm/loaders/TTFLoader'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { GlitchPass } from 'three/examples/jsm/postprocessing/GlitchPass'
import get from 'lodash/get'

import * as Routes from '../../../Constants/Routes'

let glitch = false
let textMeshes: Array<any> = []
let font: any

export const AnimeThreeJSHome = ({
    colors,
    theme,
    history,
    acceleration = 0.002
}: any) => {
    const { t, i18n } = useTranslation()

    /* Colors */
    const COLORS = {
        primaryColor: new THREE.Color(colors[theme].primaryColor),
        backgroundColor: new THREE.Color(colors[theme].backgroundColor),
        secondaryColor: new THREE.Color(colors[theme].secondaryColor),
        infoColor: new THREE.Color(colors[theme].infoColor),
        dangerColor: new THREE.Color(colors[theme].dangerColor),
        warningColor: new THREE.Color(colors[theme].warningColor),
        successColor: new THREE.Color(colors[theme].successColor),
    }

    /* Renderer */
    const renderer = React.useRef(new THREE.WebGLRenderer({
        antialias: true
    })).current

    /* Scene */
    const scene = React.useRef(new THREE.Scene()).current

    /* Group */
    const group = React.useRef({
        text: new THREE.Group()
    }).current

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
        ambient: new THREE.AmbientLight(COLORS.primaryColor, 1),
        point: new THREE.PointLight(COLORS.primaryColor, 10, 5000, 500),
        spot: new THREE.SpotLight(COLORS.primaryColor, 1),
    }).current

    /* Geometry */
    const geometry = React.useRef({
        box: new THREE.BoxGeometry(5, 5, 5),
        sphere: new THREE.SphereGeometry(5, 32, 32),
        stars: new THREE.Geometry(),
    }).current

    /* Material */
    const material = React.useRef({
        meshLambert: new THREE.MeshLambertMaterial({ color: COLORS.primaryColor }),
        meshBasic: new THREE.MeshBasicMaterial({ color: COLORS.primaryColor }),
    }).current

    /* Mesh */
    const mesh = React.useRef({
        box: new THREE.Mesh(geometry.box, material.meshLambert),
    }).current

    /* Helper */
    const helper = React.useRef({
        light: {
            point: new THREE.PointLightHelper(
                light.point,
                1
            )
        }
    }).current

    /* Loader */
    const loader = React.useRef({
        gltf: new GLTFLoader(),
        texture: new THREE.TextureLoader(),
        ttf: new TTFLoader()
    }).current


    /* Control */
    const control = React.useRef({
        orbit: new OrbitControls(camera.perspective, renderer.domElement),
        drag: new DragControls([
            mesh.box
        ], camera.perspective, renderer.domElement)
    }).current

    /* Composer */
    const composer = React.useRef(new EffectComposer(renderer)).current

    /* Pass */
    const renderPass = React.useRef(new RenderPass(scene, camera.perspective)).current
    const glitchPass = React.useRef(new GlitchPass()).current

    /* Load Texture */
    const onSuccessLoadTexture = (texture: any) => {
        for (let i = 0; i < 6000; i++) {
            let star: any = new THREE.Vector3(
                Math.random() * 600 - 300,
                Math.random() * 600 - 300,
                Math.random() * 600 - 300
            )
            star.velocity = 0
            geometry.stars.vertices.push(star)
        }
        let starMaterial = new THREE.PointsMaterial({
            color: COLORS.primaryColor,
            size: 0.5,
            map: texture,
            transparent: true
        })
        scene.add(new THREE.Points(geometry.stars, starMaterial))
    }

    /* Load Font */
    // const onTextDragStart = (event: any) => history.push(event.object.route)
    // const onSuccessLoadFont = (json: any) => {
    //     const font = new THREE.Font(json)
    //     const texts = [
    //         { label: t(`HOME`), route: Routes.HOME },
    //         { label: t(`RESUME`), route: Routes.RESUME },
    //         { label: t(`SKYBOX`), route: Routes.SKYBOX },
    //         { label: t(`RAIN`), route: Routes.RAIN }
    //     ]

    //     texts.forEach((text: any, index: number) => {
    //         let textGeometry = new THREE.TextGeometry(text.label, {
    //             font,
    //             size: 20,
    //             height: 10,
    //             curveSegments: 5,
    //         })
    //         textGeometry.computeBoundingBox();
    //         textGeometry.computeVertexNormals();
    //         let textMesh: any = new THREE.Mesh(textGeometry, material.meshBasic)
    //         textMesh.position.set(-(window.innerWidth / 2) + 800, (index - 5) * -50, -500)
    //         const textDrag = new DragControls([
    //             textMesh
    //         ], camera.perspective, renderer.domElement)
    //         textMesh.route = text.route
    //         textMeshes.push(textMesh)
    //         group.text.add(textMesh)
    //         textDrag.addEventListener('dragstart', onTextDragStart)
    //     })
    //     scene.add(group.text)
    // }

    /* Load Background GLTF */
    // const onSuccessLoadGLTF = (gltfImage: any) => {
    //     let gltfMesh = get(gltfImage, 'scene', {})
    //     gltfMesh.position.set(0, 0, 0)
    //     gltfMesh.scale.set(1, 1, 1)
    //     scene.add(gltfMesh)
    //     control.orbit.update()
    // }

    /* Animation */
    const animate = () => {
        /* Box Animation */
        mesh.box.rotation.x += 0.01;
        mesh.box.rotation.y += 0.01;

        /* Stars Animation */
        geometry.stars.vertices.forEach((star: any, index) => {
            star.velocity += acceleration
            star.z += star.velocity

            if (star.z > 200) {
                star.z = -200
                star.velocity = 0
            }
        })
        geometry.stars.verticesNeedUpdate = true

        /* Effects */
        if (glitch) composer.render()
        else renderer.render(scene, camera.perspective)

        /* Orbit Update */
        control.orbit.update()

        /* Loop */
        requestAnimationFrame(animate)
    }

    /* Control Listener */
    const onObjectHoverOn = (event: any) => {
        if (!glitch) glitch = true
        if (event.object.geometry.type == 'BoxGeometry') event.object.geometry = geometry.sphere
    }
    const onObjectHoverOff = (event: any) => {
        if (glitch) glitch = false
        if (event.object.geometry.type == 'SphereGeometry') event.object.geometry = geometry.box
    }
    const onObjectDragStart = (event: any) => history.push(Routes.RESUME)

    /* On Window Resize */
    const onWindowResize = () => {
        /* Renderer Settings */
        renderer.setSize(window.innerWidth, window.innerHeight)
        /* Composer Settings */
        composer.setSize(window.innerWidth, window.innerHeight)
        /* Camera Settings */
        camera.perspective.aspect = window.innerWidth / window.innerHeight
        camera.perspective.updateProjectionMatrix();
        /* Orbit Settings */
        control.orbit.update()
    }

    /* Lifecycle */
    React.useEffect(() => {
        /* Renderer Settings */
        renderer.setClearColor(COLORS.backgroundColor)
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
        mesh.box.position.set(0, 0, -25)

        /* Scene Settings */
        scene.add(camera.perspective)
        scene.add(light.point)
        scene.add(light.ambient)
        scene.add(light.spot)
        scene.add(mesh.box)

        /* Control Settings */
        control.orbit.keys = {
            RIGHT: 37, //left arrow
            BOTTOM: 38, // up arrow
            LEFT: 39, // right arrow
            UP: 40 // down arrow
        }
        control.orbit.minDistance = 0
        control.orbit.maxDistance = 200
        control.orbit.update()

        /* Text  */
        textMeshes.forEach((textMesh) => {
            textMesh.material.color = COLORS.primaryColor
        })

        /* Loader Settings */
        loader.texture.load('Circle/circle.png', onSuccessLoadTexture)
        // loader.ttf.load('Font/FiraSans-ExtraLight.ttf', onSuccessLoadFont)

        /* Composer Settings */
        composer.setSize(window.innerWidth, window.innerHeight)
        composer.addPass(renderPass)
        composer.addPass(glitchPass)
        renderPass.renderToScreen = true

        /* Start Animation */
        requestAnimationFrame(animate)
    }, [])

    React.useEffect(() => {
        /* Renderer Settings */
        renderer.setClearColor(COLORS.backgroundColor)

        /* Box Settings */
        material.meshLambert.color = COLORS.primaryColor

        /* Control Settings */
        control.orbit.update()

        /* Events */
        control.drag.addEventListener('dragstart', onObjectDragStart)
        control.drag.addEventListener('hoveron', onObjectHoverOn)
        control.drag.addEventListener('hoveroff', onObjectHoverOff)
        window.addEventListener('resize', onWindowResize)

        return () => {
            window.removeEventListener('resize', onWindowResize)
            control.drag.removeEventListener('dragstart', onObjectDragStart)
            control.drag.removeEventListener('hoveron', onObjectHoverOn)
            control.drag.removeEventListener('hoveroff', onObjectHoverOff)
        }
    }, [theme])

    /* Append Child */
    const setElement = React.useCallback((element: any) => {
        if (element) element.firstElementChild && element.removeChild(element.firstElementChild)
        element && element.appendChild(renderer.domElement)
    }, [theme])

    return (
        <div ref={setElement}></div>
    )
}
```


### Skybox ###
```javascript
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
```