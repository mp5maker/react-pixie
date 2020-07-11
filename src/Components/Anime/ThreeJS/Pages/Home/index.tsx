import * as React from 'react'
import * as THREE from 'three'
import { Canvas } from 'react-three-fiber'
import { useTranslation } from 'react-i18next'

import { SettingsContext } from '../../../../../SettingsContext'
import { MusicContext } from '../../../../../MusicContext'
import { Stars } from '../../Stars'
import { Box } from '../../Box'
import { OrbitControl } from '../../OrbitControl'
import { useDimension } from '../../../../../Hooks/UseDimension'
import * as Routes from '../../../../../Constants/Routes'

export const AnimeThreeJSHome = ({
    colors,
    theme,
    history,
}: any) => {
    const { t, i18n } = useTranslation()
    const { rotationX, rotationY, rotationZ, acceleration }: any = React.useContext(SettingsContext)
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
                camera={{
                    fov: 75,
                    near: 1,
                    far: 1000
                }}
                pixelRatio={window.devicePixelRatio || 1}>
                <OrbitControl
                    minDistance={0}
                    maxDistance={200}/>
                <ambientLight
                    color={COLORS.primaryColor}
                    intensity={1}
                    position={[0, 0, 0]} />
                <pointLight
                    color={COLORS.primaryColor}
                    intensity={10}
                    position={[0, 0, 0]}
                    distance={5000}
                    decay={500}/>
                <ambientLight
                    color={COLORS.primaryColor}
                    intensity={0.1}
                    position={[0, 0, 0]} />
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
                <Stars
                    acceleration={acceleration}
                    colors={COLORS}
                    history={history} />
                {/* <axesHelper args={[5]} />
                <gridHelper args={[10, 20]} /> */}
            </Canvas>
        </div>
    )
}