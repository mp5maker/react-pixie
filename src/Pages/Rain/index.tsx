import * as React from 'react'
import * as THREE from 'react'
import { Canvas, useFrame, useThree, extend } from 'react-three-fiber'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'

import { AnimeThreeJSRain } from '../../Components/Anime/ThreeJS/Pages/Rain'
import { Colors } from '../../Constants/Colors'
import { PageTransition } from '../../Constants/PageTransition'
import { AppContext } from '../../AppContext'
import { SettingsContext } from '../../SettingsContext'

export const Rain = ({ history, location, match }: any) => {
    const { theme } = React.useContext(AppContext)
    const { setSettings, ...settings }: any = React.useContext(SettingsContext)

    React.useEffect(() => {
        setSettings({
            ...settings,
            ...(settings.fire ? {
                settingsList: ['fire']
            }: {
                settingsList: ['acceleration', 'fire']
            })
        })
    }, [settings.fire])

    return (
        <motion.div
            variants={PageTransition}
            initial="initial"
            animate="animate"
            exit="exit"
            style={{
                height: `100%`,
                // @ts-ignore
                backgroundColor: Colors[theme].backgroundColor
            }}
            className="pages-rain-container">
            <div className="row">
                <div className="col p-0">
                    <AnimeThreeJSRain
                        history={history}
                        theme={theme}
                        colors={Colors} />
                </div>
            </div>
        </motion.div>
    )
}

export default Rain