import * as React from 'react'
import * as THREE from 'three'
import { Canvas } from 'react-three-fiber'
import { useTranslation } from 'react-i18next'

import { SettingsContext } from 'SettingsContext'
import { MusicContext } from 'MusicContext'
import { Stars } from 'Components/Anime/ThreeJS/Stars'
import { Box } from 'Components/Anime/ThreeJS/Box'
import { OrbitControl } from 'Components/Anime/ThreeJS/OrbitControl'
import { useDimension } from 'Hooks/UseDimension'
import * as Routes from 'Constants/Routes'
import { useMedia } from 'Hooks/UseMedia'

export const AnimeThreeJSHome = ({
    colors,
    theme,
    history,
}: any) => {
    const { t, i18n } = useTranslation()
    const { rotationX, rotationY, rotationZ, acceleration }: any = React.useContext(SettingsContext)
    const { frequency }: any = React.useContext(MusicContext)
    const { width, height } = useDimension()
    const isMediaGreaterThan771px = useMedia({ query: `(min-width: 771px)`})

    React.useEffect(() => {
        if (!isMediaGreaterThan771px) document.body.style.position = 'fixed'
        if (isMediaGreaterThan771px) document.body.style.position = ''
    }, [isMediaGreaterThan771px])

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

    const deviceSizeDependentMemo = React.useMemo(() => {
        return (
            <>
                {
                    isMediaGreaterThan771px && (
                        <OrbitControl
                            minDistance={0}
                            maxDistance={200} />
                    )
                }
            </>
        )
    }, [isMediaGreaterThan771px])

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

    const rotationFrequencyThemeHistoryDependentMemo = React.useMemo(() => {
        return (
            <Box
                frequency={frequency}
                rotationX={rotationX}
                rotationY={rotationY}
                rotationZ={rotationZ}
                redirectURL={Routes.EXPERIENCE}
                wireframe={false}
                colors={COLORS}
                position={[0, 0, -25]}
                history={history} />
        )
    }, [theme, frequency, history, rotationX, rotationY, rotationZ])

    const accelerationThemeHistoryDependentMemo = React.useMemo(() => {
        return (
            <Stars
                acceleration={acceleration}
                colors={COLORS}
                history={history} />
        )
    }, [theme, acceleration, history])

    return (
        <div style={{ width, height }}>
            <Canvas
                shadowMap={true}
                camera={{
                    fov: 75,
                    near: 1,
                    far: 1000
                }}
                pixelRatio={window.devicePixelRatio || 1}>
                { deviceSizeDependentMemo }
                { themeDependentMemo }
                { rotationFrequencyThemeHistoryDependentMemo }
                { accelerationThemeHistoryDependentMemo }
            </Canvas>
        </div>
    )
}