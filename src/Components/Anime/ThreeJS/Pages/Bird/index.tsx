import * as React from 'react'
import * as THREE from 'three'
import { Canvas } from 'react-three-fiber'
import { useTranslation } from 'react-i18next'

import { SettingsContext } from '../../../../../SettingsContext'
import { MusicContext } from '../../../../../MusicContext'
import { OrbitControl } from '../../OrbitControl'
import { Bird } from '../../Bird'
import { Portal } from '../../Portal'
import { Ocean } from '../../Ocean'
import { StarField } from '../../StarField'
import { useDimension } from '../../../../../Hooks/UseDimension'
import * as Routes from '../../../../../Constants/Routes'
import { useMedia } from '../../../../../Hooks/UseMedia'

export const AnimeThreeJSBird = ({
    colors,
    theme,
    history,
}: any) => {
    const { t, i18n } = useTranslation()
    const { rotationX, rotationY, rotationZ, acceleration }: any = React.useContext(SettingsContext)
    const { frequency }: any = React.useContext(MusicContext)
    const { width, height } = useDimension()
    const isMediaGreaterThan771px = useMedia({ query: `(min-width: 771px)` })

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
    }

    return (
        <div style={{ width, height }}>
            <Canvas
                camera={{
                    fov: 75,
                    near: 1,
                    far: 5000,
                    position: [100, 40, 120]
                }}
                pixelRatio={window.devicePixelRatio || 1}>
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
                <Bird colors={COLORS} />
                <Ocean colors={COLORS} />
                <StarField
                    position={{ x: 0, y: 50, z: -50 }}
                    colors={COLORS} />
                <Portal
                    colors={COLORS}
                    frequency={frequency}
                    position={{x: 100, y: 80, z: -50 }}/>
            </Canvas>
        </div>
    )
}