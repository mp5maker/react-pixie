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

export const AnimeThreeJSRain = ({
    colors,
    theme,
    history,
}: any) => {
    const { t, i18n } = useTranslation()
    const { rotationX, rotationY, rotationZ, acceleration, fire }: any = React.useContext(SettingsContext)
    const { frequency }: any = React.useContext(MusicContext)
    const [dimension, setDimension] = React.useState({ width: 0, height: 0 })

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

    const onWindowResize = () => {
        setDimension({
            width: window.innerWidth,
            height: window.innerHeight
        })
    }

    React.useEffect(() => {
        window.addEventListener('resize', onWindowResize)
        return () => {
            window.removeEventListener('resize', onWindowResize)
        }
    }, [])

    return (
        <div
            style={{
                width: dimension.width ? dimension.width : window.innerWidth,
                height: dimension.height ? dimension.height : window.innerHeight
            }}>
            <Canvas
                shadowMap={true}
                colorManagement={true}
                camera={{
                    fov: 45,
                    near: 1,
                    far: 1000,
                    position: [60, 30, 100]
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