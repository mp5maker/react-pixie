import * as React from 'react'
import * as THREE from 'three'
import { useThree, useFrame } from 'react-three-fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import head from 'lodash/head'

import { useDimension } from '../../../../Hooks/UseDimension'
import { RandomRange } from '../../../../Utilities/RandomRange'

let mixers: Array<any> = []
let animations: Array<any> = []
let meshes: Array<any> = []
export const Bird = ({ colors }: any) => {
    const { scene, gl, camera } = useThree()
    const loader = React.useRef(new GLTFLoader()).current
    const { width, height } = useDimension()

    useFrame((state, delta: any) => {
        if (Array.isArray(mixers) && mixers.length > 0) {
            mixers.forEach((mixer) => {
                mixer.update(delta)
            })
        }
        if (Array.isArray(meshes) && meshes.length > 0) {
            meshes.forEach((mesh) => {
                mesh.position.y += RandomRange({ min: 0.1, max: 0.5 })
                mesh.position.z -= RandomRange({ min: 0.1, max: 0.5 })
                mesh.position.x += RandomRange({ min: 0.1, max: 0.2 })
                if (mesh.position.y > ((height / 2) + 300) || mesh.position.x > ((width / 2) + 300)) {
                    mesh.position.y = RandomRange({ min: -200, max: 100 })
                    mesh.position.x = RandomRange({ min: -(width / 2) - 800, max: -(width / 2) })
                    mesh.position.z = RandomRange({ min: -5, max: 5 })
                }
            })
        }
    })

    const onSuccessLoad = ({ gltf, name }: any) => {
        const mesh = gltf.scene
        mesh.castShadow = true
        mesh.rotation.set(0, -Math.PI, 0)
        mesh.position.y = RandomRange({ min: -200, max: 100})
        mesh.position.x = RandomRange({ min: -(width / 2) - 800, max: -(width / 2) })
        mesh.position.z = RandomRange({ min: -5, max: 5 })
        mesh.name = name
        meshes = [...meshes, mesh]
        scene.add(mesh)

        /* Animations */
        let gltfAnimations = gltf.animations
        animations = ([...animations, [gltfAnimations]])

        /* Animation Mixer */
        let animationMixer: any = new THREE.AnimationMixer(mesh)
        mixers = [ ...mixers, animationMixer]

        /* Flying */
        let flying: any = animationMixer.clipAction(head(gltfAnimations))
        flying.enabled = true
        flying.setEffectiveTimeScale(1)
        flying.setEffectiveWeight(1)

        /* Actions */
        const actions = [flying]
        actions.forEach((action: any) => action.play())
    }

    React.useEffect(() => {
        loader.load('/AnimationModel/Flamingo.glb', (gltf) => onSuccessLoad({ gltf, name: `flamingo` }))
        loader.load('/AnimationModel/Parrot.glb', (gltf) => onSuccessLoad({ gltf, name: `parrot` }))
    }, [])

    return <></>
}