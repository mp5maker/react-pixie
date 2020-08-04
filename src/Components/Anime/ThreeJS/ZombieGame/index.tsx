import * as React from 'react'
import * as THREE from 'three'
import { useTranslation } from 'react-i18next'
import { Canvas } from 'react-three-fiber'

import { Zombie } from 'Components/Anime/ThreeJS/Zombie'
import { useDimension } from 'Hooks/UseDimension'
import { LocaleNumber } from 'Utilities/LocaleNumber'
import { Joystick } from 'Svg/Joystick'
import './styles.scss'

export const ZombieGame = ({
    colors,
    theme,
    history,
}: any) => {
    const { width, height } = useDimension()
    const [score, setScore] = React.useState(0)
    const { t, i18n } = useTranslation()

    const getScore = (currentScore: number) => {
        if (currentScore != score) setScore(currentScore)
    }

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

    const scoreDependentMemo = React.useMemo(() => {
        return (
            <div className={`zombie-game-summary`}>
                <div>
                    {t(`YOUR_SCORE`)}: {LocaleNumber({ t, value: score })}
                </div>
                <div className={`controls`}>
                    <div>
                        <kbd>
                            s
                        </kbd>
                        &nbsp;{t(`START`)}
                    </div>
                    <div>
                        <kbd>
                            a
                        </kbd>
                        &nbsp;{t(`JUMP`)}
                    </div>
                </div>
            </div>
        )
    }, [i18n.language, score])

    const joystickMemo = React.useMemo(() => {
        return (
            <div className="zombie-game-controller">
                <Joystick
                    width="175"
                    height="175"
                    theme={theme}
                    colors={colors} />
            </div>
        )
    }, [theme])

    const zombieMemo = React.useMemo(() => {
        return (
            <Zombie
                getScore={getScore}
                width={width}
                colors={COLORS} />
        )
    }, [width, theme])

    return (
        <div style={{ width, height: 500 }}>
            <Canvas
                style={{
                    width,
                    height: 500
                }}
                shadowMap={true}
                camera={{
                    fov: 75,
                    near: 1,
                    far: 500,
                }}
                pixelRatio={window.devicePixelRatio || 1}>
                { themeDependentMemo }
                { zombieMemo }
            </Canvas>
            {scoreDependentMemo }
            {joystickMemo}
        </div>
    )
}