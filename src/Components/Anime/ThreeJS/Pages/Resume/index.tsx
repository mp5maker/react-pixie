import * as React from 'react'
import * as THREE from 'three'
import { Canvas } from 'react-three-fiber'
import { useTranslation } from 'react-i18next'

import { SettingsContext } from '../../../../../SettingsContext'
import { Stars } from '../../Stars'
import { Box } from '../../Box'
import { OrbitControl } from '../../OrbitControl'
import * as Routes from '../../../../../Constants/Routes'

export const AnimeThreeJSResume = ({
    colors,
    theme,
    history,
}: any) => {
    const { t, i18n } = useTranslation()
    const { rotationX, rotationY, rotationZ, acceleration, frequency }: any = React.useContext(SettingsContext)
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
                camera={{
                    fov: 75,
                    near: 1,
                    far: 1000
                }}
                pixelRatio={window.devicePixelRatio || 1}>
                <OrbitControl />
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
                <Box
                    rotationX={rotationX}
                    rotationY={rotationY}
                    rotationZ={rotationZ}
                    frequency={frequency}
                    redirectURL={Routes.HOME}
                    wireframe={true}
                    colors={COLORS}
                    position={[0, 0, -25]}
                    history={history} />
                <Stars
                    acceleration={acceleration}
                    colors={COLORS}
                    history={history} />
            </Canvas>
        </div>
    )
}