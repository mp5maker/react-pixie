import * as React from 'react'
import * as THREE from 'react'
import { Canvas, useFrame, useThree, extend } from 'react-three-fiber'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'

import { AnimeThreeJSRain } from '../../Components/Anime/ThreeJS/Pages/Rain'
import { Styles } from '../../Styles/Pages'
import { Colors } from '../../Constants/Colors'
import { PageTransition } from '../../Constants/PageTransition'
import { AppContext } from '../../AppContext'
import { SettingsContext } from '../../SettingsContext'

export const Rain = ({ history, location, match }: any) => {
    const { theme } = React.useContext(AppContext)
    const { setSettings, isPlaying, ...settings }: any = React.useContext(SettingsContext)

    React.useEffect(() => {
        if (!isPlaying) {
            setSettings({
                ...settings,
                settingsList: [
                    'acceleration',
                    'fire'
                ]
            })
        }
    }, [isPlaying])

    return (
        <motion.div
            variants={PageTransition}
            initial="initial"
            animate="animate"
            exit="exit"
            style={{
                ...Styles.container,
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