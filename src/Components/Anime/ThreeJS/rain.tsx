import * as React from 'react'
import * as THREE from 'three'

let smokes: Array<any> = []
let rain: any;
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
        point: new THREE.PointLight(0xff0000, 30, 500, 1.7),
        ambient: new THREE.AmbientLight(0xff0000, 1),
        directional: new THREE.DirectionalLight(0xff0000, 1)
    }).current

    /* Geometry */
    const geometry = React.useRef({
        rain: new THREE.Geometry(),
        box: new THREE.BoxGeometry(1, 1, 1),
        planeBuffer: new THREE.PlaneBufferGeometry(350, 350),
    }).current

    /* Material */
    const material = React.useRef({
        lambert: new THREE.MeshLambertMaterial({
            color: preparedColors.primaryColor,
            wireframe: true,
        }),
        basic: new THREE.MeshBasicMaterial({
            color: preparedColors.primaryColor
        }),
        standard: new THREE.MeshStandardMaterial({
            color: preparedColors.backgroundColor,
            transparent: true,
        }),
        points: new THREE.PointsMaterial({
            color: preparedColors.primaryColor,
            size: 0.1,
            transparent: true,
        })
    }).current

    /* Mesh */
    const mesh = React.useRef({
        boxLambert: new THREE.Mesh(geometry.box, material.lambert),
        standardPlaneBuffer: new THREE.Mesh(geometry.planeBuffer, material.standard)
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
        renderer.clear();

        smokes.forEach((particle: any) => {
            particle.rotation.z += 0.001 * Math.random()
        })

        if (Math.random() > 0.95) {
            light.point.power = 50 + (Math.random() * 1000)
        }

        geometry.rain.vertices.forEach((vertex) => {
            vertex.y -= 0.1 * Math.random() * 0.1
        })
        geometry.rain.verticesNeedUpdate = true;
        rain.rotation.y += 0.002

        renderer.render(scene, camera.perspective)
        requestAnimationFrame(animate)
    }

    const prepareRain = () => {
        for (let i = 0; i < 1000; i++) {
            let rainDrop = new THREE.Vector3(
                (Math.random() * window.innerWidth) - (window.innerWidth / 2),
                (Math.random() * 500) - 250,
                (Math.random() * 400) - 200
            )
            geometry.rain.vertices.push(rainDrop)
        }
        rain = new THREE.Points(geometry.rain, material.points)
        scene.add(rain)
    }

    /* On Loads */
    const onLoadSmokeImage = (texture: any) => {
        material.standard.map = texture

        for (let p = 0; p < 35; p++) {
            let smoke = new THREE.Mesh(geometry.planeBuffer, material.standard)
            smoke.position.set((window.innerWidth * Math.random()) - (window.innerWidth / 2), 600, -100);
            smoke.rotation.x = 0
            smoke.rotation.z = Math.random() * 360
            smokes.push(smoke)
            scene.add(smoke)
        }
    }

    /* Resizing Window */
    const onWindowResize = () => {
        renderer.setSize(window.innerWidth, window.innerHeight)
        camera.perspective.aspect = window.innerWidth / window.innerHeight
        camera.perspective.updateProjectionMatrix()
    }

    /* Life Cycle */
    React.useEffect(() => {
        /* Renderer Settings */
        renderer.setSize(window.innerWidth, window.innerHeight)
        renderer.setClearColor(preparedColors.backgroundColor)
        renderer.shadowMap.enabled = true
        renderer.setPixelRatio(window.devicePixelRatio | 1)

        /* Light Settings Settings */
        light.directional.position.set(5, 5, 20)
        light.point.position.set(0, 500, 0)
        light.ambient.position.set(5, 5, 20)

        /* Camera Settings */
        camera.perspective.add(light.point)
        camera.perspective.position.set(0, 0, 1000)
        camera.perspective.lookAt(0, 0, 0)

        /* Scene Settings */
        scene.add(camera.perspective)
        scene.add(light.directional)
        scene.add(light.point)
        scene.add(light.ambient)

        /* Load Texture */
        loader.texture.load('/Smoke/smoke.png', onLoadSmokeImage)

        /* Prepare Rain Geometry */
        prepareRain()

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