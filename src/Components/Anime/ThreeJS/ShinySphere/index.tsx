import * as React from 'react'
import { useFrame } from 'react-three-fiber'

export const ShinySphere = ({ colors, frequency }: any) => {
    const shinySphereRef: any = React.useRef()

    const frequencyParams = frequency == 1 || frequency == 0 ? 1 : (frequency * 0.01)

    return (
        <>
            <mesh
                ref={shinySphereRef}
                castShadow={true}
                position={[2.5, 10, 15]}
                scale={[0.5, 0.5, 0.5]}>
                <sphereGeometry
                    attach="geometry"
                    args={[
                        5 * frequencyParams,
                        20 * frequencyParams,
                        20 * frequencyParams
                    ]} />
                <meshStandardMaterial
                    attach="material"
                    color={colors.primaryColor}
                    roughness={0}
                    metalness={0} />
            </mesh>
        </>
    )
}