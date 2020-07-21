import * as React from 'react'
import * as THREE from 'three'
import { useThree, useResource, useFrame } from 'react-three-fiber'
import { RandomRange } from '../../../../Utilities/RandomRange'

export const StarField = ({ colors, particles = 10000, position = {x: 0, y: 50, z: -100} }: any) => {
    const [geometry, setGeometry]: any = React.useState(null)

    React.useEffect(() => {
        let prepareGeometry = new THREE.Geometry()
        for (let i = 0; i < particles; i++) {
            let vertex = new THREE.Vector3(
                RandomRange({ min: -70000, max: 2000 }),
                RandomRange({ min: 20, max: 300}),
                RandomRange({ min: -2000, max: 300 }),
            )
            prepareGeometry.vertices.push(vertex)
        }
        setGeometry(prepareGeometry)
    }, [])

    return (
        <>
            {
                geometry && (
                    <points
                        castShadow={false}
                        position={[position.x, position.y, position.z]}
                        geometry={geometry}>
                        <pointsMaterial
                            size={20}
                            color={colors.primaryColor} />
                    </points>
                )
            }
        </>
    )
}