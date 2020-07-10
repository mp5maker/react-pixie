import * as React from 'react'
import * as THREE from 'three'
import { useThree, useFrame, extend, useResource } from 'react-three-fiber'
import { Face3 } from 'three'

const randomRange = ({min, max}: any) => (Math.random() * (max - min + 1)) + min

export const RainDroplets = ({ colors, acceleration }: any) => {
    const loader = React.useRef(new THREE.TextureLoader()).current
    const geometry = React.useRef(new THREE.Geometry()).current
    const [texture, setTexture] = React.useState()
    const { gl, camera, scene } = useThree()
    scene.fog = new THREE.FogExp2(colors.backgroundColor, 0.0009)

    const onSuccessLoad = (texture: any) => {
        setTexture(texture)
        for (let i = 0; i < 30000; i++) {
            let droplet: any = new THREE.Vector3(
                randomRange({ min: -(window.innerWidth / 2), max: (window.innerWidth / 2)}),
                randomRange({ min: 0, max: window.innerHeight}),
                randomRange({ min: -5000, max: 5000 }),
            )
            droplet.velocity = 0
            geometry.vertices.push(droplet)
        }
    }

    useFrame(() => {
        geometry.vertices.forEach((item: any) => {
            item.velocity += acceleration * 0.01
            item.y -= item.velocity
            item.z += item.velocity

            if (item.y <= 0) {
                item.x = randomRange({ min: -(window.innerWidth / 2), max: (window.innerWidth / 2) })
                item.y = randomRange({ min: 0, max: window.innerHeight })
                item.z = randomRange({ min: -5000, max: 5000 })
                item.velocity = 0
            }
        })
        geometry.verticesNeedUpdate = true
    })

    React.useEffect(() => {
        loader.load('Circle/circle.png', onSuccessLoad)
    }, [])

    return (
        <>
            {
                texture && (
                    <points
                        material={new THREE.PointsMaterial({
                            color: colors.primaryColor,
                            size: 1.5,
                            map: texture,
                            transparent: true
                        })}
                        geometry={geometry} />
                )
            }
        </>
    )
}