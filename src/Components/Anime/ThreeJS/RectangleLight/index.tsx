import * as React from 'react'
import * as THREE from 'three'
import { useResource } from 'react-three-fiber'
import { RectAreaLightUniformsLib } from 'three/examples/jsm/lights/RectAreaLightUniformsLib.js'

RectAreaLightUniformsLib.init()

export const RectangleLight = ({ colors }: any) => {
    const [rectAreaLightRef, rectAreaLight]: any = useResource()
    const [planeGeometryRef, planeGeometry]: any = useResource()
    const [rectLightMeshRef, rectLightMesh]: any = useResource()
    const [rectLightMeshBackRef, rectLightMeshBack]: any = useResource()

    return (
        <>
            <rectAreaLight
                add={rectLightMesh}
                ref={rectAreaLightRef}
                args={[colors.primaryColor, 1, 10, 10]}
                position={[5, 5, 0]}
                rotation={[0, -Math.PI, 0]}/>
            <planeGeometry
                attach="geometry"
                ref={planeGeometryRef}
                args={[10, 10]} />
            <mesh
                position={[5, 5, 0]}
                ref={rectLightMeshRef}
                add={rectLightMeshBack}
                rotation={[0, -Math.PI, 0]}
                geometry={planeGeometry}>
                <meshBasicMaterial
                    attach="material"
                    color={colors.primaryColor}
                    side={THREE.BackSide} />
            </mesh>
            <mesh
                position={[5, 5, 0]}
                ref={rectLightMeshBackRef}
                rotation={[0, -Math.PI, 0]}
                geometry={planeGeometry}>
                <meshBasicMaterial
                    attach="material"
                    color={colors.secondaryColor} />
            </mesh>
            <mesh>
                <boxGeometry
                    attach="geometry"
                    args={[2000, 0.1, 2000]} />
                <meshStandardMaterial
                    attach="material"
                    color={colors.backgroundColor}
                    roughness={0}
                    metalness={0} />
            </mesh>
            <mesh
                receiveShadow={true}
                castShadow={true}
                position={[2.5, 2.5, 20]}
                scale={[0.5, 0.5, 0.5]}>
                <sphereGeometry
                    attach="geometry"
                    args={[5, 20, 20]} />
                <meshStandardMaterial
                    attach="material"
                    color={colors.primaryColor}
                    roughness={0}
                    metalness={0} />
            </mesh>
        </>
    )
}