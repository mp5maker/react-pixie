import * as React from 'react'
import * as THREE from 'three'

export const ShinySphere = ({ colors }: any) => {

    return (
        <>
            <mesh
                castShadow={true}
                position={[2.5, 10, 15]}
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