import * as React from 'react'
import * as THREE from 'three'
import { Canvas } from 'react-three-fiber'
import { useTranslation } from 'react-i18next'

import { SettingsContext } from '../../../../../SettingsContext'
import { MusicContext } from '../../../../../MusicContext'
import { OrbitControl } from '../../OrbitControl'
import * as Routes from '../../../../../Constants/Routes'
import { RectangleLight } from '../../RectangleLight'
import { InteriorGround } from '../../InteriorGround'
import { ShinySphere } from '../../ShinySphere'
import { Moon } from '../../Moon'
import { RainDroplets } from '../../RainDroplets'
import { BonFire } from '../../BonFire'
import { Wall } from '../../House/Wall'
import { useDimension } from '../../../../../Hooks/UseDimension'

export const AnimeThreeJSRain = ({
    colors,
    theme,
    history,
}: any) => {
    const { t, i18n } = useTranslation()
    const { rotationX, rotationY, rotationZ, acceleration, fire }: any = React.useContext(SettingsContext)
    const { frequency }: any = React.useContext(MusicContext)
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
    }

    return (
        <div style={{ width, height }}>
            <Canvas
                shadowMap={true}
                colorManagement={true}
                camera={{
                    fov: 45,
                    near: 1,
                    far: 1000,
                    position: [100, 40, 120]
                }}
                pixelRatio={window.devicePixelRatio || 1}>
                <ambientLight
                    color={COLORS.primaryColor}
                    intensity={0.1} />
                <RectangleLight
                    colors={COLORS} />
                <InteriorGround
                    colors={COLORS} />
                <ShinySphere
                    frequency={frequency}
                    colors={COLORS} />
                <Wall colors={COLORS} />
                {
                    fire ? (
                    <BonFire
                        frequency={frequency}
                        colors={COLORS} />
                    ) : (
                        <>
                            <RainDroplets
                                acceleration={acceleration}
                                colors={COLORS} />
                            <Moon
                                colors={COLORS} />
                        </>
                    )
                }
                <OrbitControl />
            </Canvas>
        </div>
    )
}