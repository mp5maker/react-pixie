import * as React from 'react'
import * as THREE from 'three'
import { useFrame } from 'react-three-fiber'

export const Stars = ({ colors, history, acceleration, ...props }: any) => {
    const [texture, setTexture] = React.useState()

    const points: any = React.useRef()
    const geometry = React.useRef({
        stars: new THREE.Geometry()
    }).current

    const loader = React.useRef({
        texture: new THREE.TextureLoader(),
    }).current

    const onSuccessTextureLoad = (texture: any) => {
        setTexture(texture)
        for (let i = 0; i < 6000; i++) {
            let star: any = new THREE.Vector3(
                Math.random() * 600 - 300,
                Math.random() * 600 - 300,
                Math.random() * 600 - 300
            )
            star.velocity = 0
            geometry.stars.vertices.push(star)
        }
    }

    useFrame(() => {
        geometry.stars.vertices.forEach((star: any, index) => {
            star.velocity += acceleration * 0.01
            star.z += star.velocity

            if (star.z > 200) {
                star.z = -200
                star.velocity = 0
            }
        })
        geometry.stars.verticesNeedUpdate = true
    })

    React.useEffect(() => {
        loader.texture.load('Circle/circle.png', onSuccessTextureLoad)
    }, [])

    return texture ? (
        <group>
            <points
                ref={points}
                geometry={geometry.stars}
                material={new THREE.PointsMaterial({
                    color: colors.primaryColor,
                    size: 0.5,
                    map: texture,
                    transparent: true
                })} />
        </group>
    ) : <></>
}