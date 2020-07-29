import * as React from 'react'
import * as THREE from 'three'
import { Canvas } from 'react-three-fiber'

import { Zombie } from 'Components/Anime/ThreeJS/Zombie'
import { useDimension } from 'Hooks/UseDimension'

export const ZombieGame = ({
    colors,
    theme,
    history,
}: any) => {
    const { width, height } = useDimension()

    /* Colors */
    const COLORS = {
        primaryColor: new THREE.Color(colors[theme].primaryColor),
        backgroundColor: new THREE.Color(colors[theme].backgroundColor),
        secondaryColor: new THREE.Color(colors[theme].secondaryColor),
        infoColor: new THREE.Color(colors[theme].infoColor),
        dangerColor: new THREE.Color(colors[theme].dangerColor),
        warningColor: new THREE.Color(colors[theme].warningColor),
        successColor: new THREE.Color(colors[theme].successColor),
        fogColor: new THREE.Color(colors[theme].fogColor),
    }

    const themeDependentMemo = React.useMemo(() => {
        return (
            <>
                <ambientLight
                    color={COLORS.primaryColor}
                    intensity={1}
                    position={[0, 0, 0]} />
                <pointLight
                    color={COLORS.primaryColor}
                    intensity={10}
                    position={[0, 0, 0]}
                    distance={5000}
                    decay={500} />
                <ambientLight
                    color={COLORS.primaryColor}
                    intensity={0.1}
                    position={[0, 0, 0]} />
            </>
        )
    }, [theme])

    return (
        <div style={{ width, height: 500 }}>
            <Canvas
                shadowMap={true}
                camera={{
                    fov: 75,
                    near: 1,
                    far: 500,
                }}
                pixelRatio={window.devicePixelRatio || 1}>
                {themeDependentMemo}
                <Zombie
                    width={width}
                    colors={COLORS} />
            </Canvas>
        </div>
    )
}