import * as React from 'react'
import * as THREE from 'three'
import { Canvas } from 'react-three-fiber'

import { SettingsContext } from '../../../../../SettingsContext'
import { Stars } from '../../Stars'
import { OrbitControl } from '../../OrbitControl'
import { useDimension } from '../../../../../Hooks/UseDimension'

export const AnimeThreeJSError = ({
    colors,
    theme,
    history,
}: any) => {
    const { acceleration }: any = React.useContext(SettingsContext)
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

    const memoLights = React.useMemo(() => {
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

    const memoStars = React.useMemo(() => {
        return (
            <>
                <Stars
                    acceleration={acceleration}
                    colors={COLORS}
                    history={history} />
            </>
        )
    }, [acceleration, theme, history])

    return (
        <div style={{ width, height }}>
            <Canvas
                camera={{
                    fov: 75,
                    near: 1,
                    far: 1000
                }}
                pixelRatio={window.devicePixelRatio || 1}>
                <OrbitControl />
                { memoLights }
                { memoStars }
            </Canvas>
        </div>
    )
}