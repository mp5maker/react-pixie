import * as React from 'react'
import * as THREE from 'three'
import { useResource } from 'react-three-fiber'

export const Wall = ({ colors }: any) => {
    const [materialFrontRef, materialFront] = useResource()
    const [materialBackRef, materialBack] = useResource()

    return (
        <>
        <meshStandardMaterial
            // @ts-ignore
            ref={materialFrontRef}
            metalness={0}
            roughness={0}
            color={colors.primaryColor}
            side={THREE.FrontSide}
            attach={'material'} />
        <meshStandardMaterial
            // @ts-ignore
            ref={materialBackRef}
            metalness={0}
            roughness={0}
            color={colors.primaryColor}
            side={THREE.BackSide}
            attach={'material'} />
        {
            materialFront && materialBack && (
                <group>
                    <mesh
                        // @ts-ignore
                        material={materialFront}
                        receiveShadow={true}
                        castShadow={true}
                        position={[5, 0, -0.01]}>
                        <planeGeometry
                            args={[40, 40, 40]}
                            attach={`geometry`} />
                    </mesh>
                    <mesh
                        // @ts-ignore
                        material={materialBack}
                        receiveShadow={true}
                        castShadow={true}
                        rotation={[0, -Math.PI / 2, 0]}
                        position={[-15, 0, 20]}>
                        <planeGeometry
                            args={[40, 40, 40]}
                            attach={`geometry`} />
                    </mesh>
                    <mesh
                        // @ts-ignore
                        material={materialFront}
                        receiveShadow={true}
                        castShadow={true}
                        rotation={[0, -Math.PI / 2, 0]}
                        position={[25, 0, 20]}>
                        <planeGeometry
                            args={[40, 40, 40]}
                            attach={`geometry`} />
                    </mesh>
                    <mesh
                        // @ts-ignore
                        material={materialFront}
                        receiveShadow={true}
                        castShadow={true}
                        rotation={[0, Math.PI, 0]}
                        position={[5, 0, 40.1]}>
                        <planeGeometry
                            args={[40, 40, 40]}
                            attach={`geometry`} />
                    </mesh>
                </group>
            )
        }
        </>
    )
}