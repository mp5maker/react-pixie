import * as React from 'react'
import * as THREE from 'three'
import { useFrame, useResource, useThree } from 'react-three-fiber'
import { Fire } from 'three/examples/jsm/objects/Fire'
import { RandomRange } from '../../../../Utilities/RandomRange'

export const BonFire = ({ colors }: any) => {
    const { gl, camera, scene } = useThree()
    const fireColor = React.useRef({
        colorOne: new THREE.Color('#ffffff'),
        colorTwo: new THREE.Color('#ffa000'),
        colorThree: new THREE.Color('#000000'),
    }).current

    React.useEffect(() => {
        const position ={
            x: -100,
            y: 0,
            z: -700
        }
        const plane = new THREE.PlaneBufferGeometry(50, 100, 50)
        let fire = new Fire(plane, {
            textureWidth: 500,
            textureHeight: 500,
            debug: false
        })
        fire.position.set(position.x, position.y, position.z)
        fire.color1.set(fireColor.colorOne);
        fire.color2.set(fireColor.colorTwo);
        fire.color3.set(fireColor.colorThree);
        fire.addSource(0.45, 0.1, 0.1, 0.5, 0.0, 1.0);
        fire.addSource(0.55, 0.1, 0.1, 0.5, 0.0, 1.0);
        scene.add(fire)

        return () => {
            scene.children.forEach((item) => {
                if (item instanceof Fire) scene.remove(item)
            })
        }
    }, [])

    return (
        <></>
    )
}