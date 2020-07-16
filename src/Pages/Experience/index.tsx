import * as React from 'react'
import { motion } from 'framer-motion'

import { Colors } from '../../Constants/Colors'
import { PageTransition } from '../../Constants/PageTransition'
import { AppContext } from '../../AppContext'
import { SettingsContext } from '../../SettingsContext'
import { WorkExperience } from '../../Components/WorkExperience'
import { AnimeThreeJSExperience } from '../../Components/Anime/ThreeJS/Pages/Experience'

export const Experience = ({ history, location, match }: any) => {
    const { theme }: any = React.useContext(AppContext)
    const { setSettings, ...settings }: any = React.useContext(SettingsContext)

    React.useEffect(() => {
        setSettings({
            ...settings,
            settingsList: [
                'rotationX',
                'rotationY',
                'rotationZ',
                'acceleration',
            ]
        })
    }, [])

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
            className="pages-resume-container">
            <div className="row">
                <div className="col p-0">
                    <AnimeThreeJSExperience
                        history={history}
                        colors={Colors}
                        theme={theme} />
                </div>
            </div>
            <WorkExperience colors={Colors} theme={theme} />
        </motion.div>
    )
}

export default Experience