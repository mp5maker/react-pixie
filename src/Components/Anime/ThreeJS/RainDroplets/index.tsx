import * as React from 'react'
import * as THREE from 'three'
import { useThree, useFrame, extend, useResource } from 'react-three-fiber'
import { RandomRange } from '../../../../Utilities/RandomRange'


export const RainDroplets = ({ colors, acceleration }: any) => {
    const loader = React.useRef(new THREE.TextureLoader()).current
    const geometry = React.useRef(new THREE.Geometry()).current
    const [texture, setTexture] = React.useState()
    const { gl, camera, scene } = useThree()

    const onSuccessLoad = (texture: any) => {
        setTexture(texture)
        for (let i = 0; i < 30000; i++) {
            let droplet: any = new THREE.Vector3(
                RandomRange({ min: -(window.innerWidth / 2), max: (window.innerWidth / 2)}),
                RandomRange({ min: 0, max: window.innerHeight}),
                RandomRange({ min: -5000, max: 5000 }),
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
                item.x = RandomRange({ min: -(window.innerWidth / 2), max: (window.innerWidth / 2) })
                item.y = RandomRange({ min: 0, max: window.innerHeight })
                item.z = RandomRange({ min: -5000, max: 5000 })
                item.velocity = 0
            }
        })
        geometry.verticesNeedUpdate = true
    })

    React.useEffect(() => {
        loader.load('Circle/circle.png', onSuccessLoad)
        scene.fog = new THREE.FogExp2(colors.backgroundColor, 0.0009)
    }, [])

    const rainDroplets = React.useMemo(() => {
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
    }, [texture, colors])

    return rainDroplets
}