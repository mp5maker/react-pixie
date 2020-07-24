import * as React from 'react'
import * as THREE from 'three'
import { Canvas } from 'react-three-fiber'
import { useTranslation } from 'react-i18next'

import { Skybox } from '../../Skybox'
import { OrbitControl } from '../../OrbitControl'
import * as Routes from '../../../../../Constants/Routes'
import { useDimension } from '../../../../../Hooks/UseDimension'

export const AnimeThreeJSSkybox = ({
    colors,
    theme,
    history,
}: any) => {
    const { t, i18n } = useTranslation()
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
                    fov: 55,
                    near: 45,
                    far: 30000
                }}
                pixelRatio={window.devicePixelRatio || 1}>
                <OrbitControl />
                <Skybox />
            </Canvas>
        </div>
    )
}