import * as React from 'react'
import { motion } from 'framer-motion'

import { Colors } from '../../Constants/Colors'
import { PageTransition } from '../../Constants/PageTransition'
import { AppContext } from '../../AppContext'
import { SettingsContext } from '../../SettingsContext'
import { AnimeThreeJSPhysics } from '../../Components/Anime/ThreeJS/Pages/Physics'
import { useDocument } from '../../Hooks/UseDocument'

export const Physics = ({ history, location, match }: any) => {
    const { theme } = React.useContext(AppContext)
    const { setSettings, ...settings }: any = React.useContext(SettingsContext)
    useDocument({ options: [{ selector: 'title', value: `Photon's Portfolio: Physics` }] })

    React.useEffect(() => {
        setSettings({
            ...settings,
            settingsList: []
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
            className="pages-phsyics-container">
            <div className="row">
                <div className="col p-0">
                    <AnimeThreeJSPhysics
                        history={history}
                        theme={theme}
                        colors={Colors} />
                </div>
            </div>
        </motion.div>
    )
}

export default Physics