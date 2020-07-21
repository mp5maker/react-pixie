import * as THREE from 'three'
import * as React from 'react'
import { useThree, useFrame, useResource, extend } from 'react-three-fiber'

let delta = 0
export const Portal = ({ colors, frequency, position = { x: 200, y: 50, z: -100 } }: any) => {
    const { gl, scene, camera } = useThree()
    const [sphereRef, sphereGeometry]: any = useResource()
    const [lineRef, line]: any = useResource()
    const [pointLightRef, pointLight]: any = useResource()
    const [bulbRef, bulb]: any = useResource()
    const [bulbOuterRef, bulbOuter]: any = useResource()

    const hasFrequency = frequency == 0 || frequency == 1 ? true : false
    const frequencyParam = hasFrequency ? 1 : 0.01 * frequency

    useFrame(() => {
        if (bulb) {
            delta += 0.001
            bulb.position.x = 200 * Math.cos(delta * Math.PI)
            bulb.position.z = 200 * Math.sin(delta * Math.PI)
            if (bulbOuter) {
                bulbOuter.rotation.x += 0.01
                bulbOuter.rotation.y += 0.01
                bulbOuter.rotation.z += 0.01
            }
        }
        if (line) {
            line.rotation.x += 0.01
            line.rotation.y += 0.01
            line.rotation.z += 0.01
        }
        if (Math.random() > 0.95) {
            pointLight.power = 50
        } else {
            pointLight.power = 1
        }
    })

    React.useEffect(() => {
        scene.fog = new THREE.FogExp2(colors.backgroundColor, 0.0009)
    }, [])

    const memoPortal = React.useMemo(() => {
        return (
            <>
                <sphereBufferGeometry
                    // @ts-ignore
                    ref={sphereRef}
                    attach={`geometry`}
                    args={[
                        frequencyParam * 12,
                        frequencyParam * 25,
                        frequencyParam * 25,
                    ]} />
                {
                    sphereGeometry && (
                        <group>
                            <pointLight
                                position={[200, 100, -100]}
                                ref={pointLightRef} />
                            <lineSegments
                                ref={lineRef}
                                geometry={sphereGeometry}
                                position={[position.x, position.y, position.z]}>
                                <meshLambertMaterial
                                    attach={`material`}
                                    wireframe={true}
                                    color={colors.primaryColor} />
                            </lineSegments>
                        </group>
                    )
                }
                <group
                    position={[200, 120, -100]}
                    ref={bulbRef}>
                    <mesh
                        castShadow={true}
                        receiveShadow={true}>
                        <meshLambertMaterial
                            attach={`material`}
                            color={colors.dangerColor} />
                        <sphereGeometry
                            attach={`geometry`}
                            args={[2, 16, 16]} />
                        <pointLight
                            args={[colors.primaryColor, 2, 800]} />
                    </mesh>
                    <mesh
                        ref={bulbOuterRef}>
                        <meshLambertMaterial
                            attach={`material`}
                            side={THREE.DoubleSide}
                            color={colors.primaryColor} />
                        <circleGeometry
                            attach={`geometry`}
                            args={[5, 20]} />
                    </mesh>
                </group>
            </>
        )
    }, [sphereGeometry, position, colors])

    return memoPortal
}