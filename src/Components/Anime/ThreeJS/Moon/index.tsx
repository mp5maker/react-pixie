import * as React from 'react'
import * as THREE from 'three'

export const Moon = ({ colors }: any) => {
    return (
        <>
            <spotLight
                castShadow={true}
                position={[-300, 100, -800]}
                args={[colors.primaryColor, 0.5]} />
            <mesh
                rotation={[0, Math.PI / 5, 0]}
                position={[-300, 100, -800]}>
                <circleGeometry
                    attach="geometry"
                    args={[5, 32]} />
                <meshBasicMaterial
                    color={colors.primaryColor}
                    attach="material" />
            </mesh>
        </>
    )
}