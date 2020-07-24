import * as React from 'react'
import * as THREE from 'three'
import { useThree } from 'react-three-fiber'

export const Moon = ({ colors }: any) => {
    const { scene } = useThree()

    React.useEffect(() => {
        scene.fog = new THREE.FogExp2(colors.fogColor, 0.0009)
        return () => { scene.fog = null }
    }, [colors])

    const memoMoon = React.useMemo(() => {
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
                        side={THREE.DoubleSide}
                        color={colors.primaryColor}
                        attach="material" />
                </mesh>
            </>
        )
    }, [colors])

    return memoMoon
}