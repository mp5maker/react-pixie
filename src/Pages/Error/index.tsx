import * as React from 'react'
import { motion } from 'framer-motion'

import { Colors } from '../../Constants/Colors'
import { PageTransition } from '../../Constants/PageTransition'
import { AppContext } from '../../AppContext'
import { SettingsContext } from '../../SettingsContext'
import { AnimeThreeJSError } from '../../Components/Anime/ThreeJS/Pages/Error'
import { ErrorMessage } from '../../Components/ErrorMessage'
import { useDocument } from '../../Hooks/UseDocument'

export const Error = ({ history, location, match }: any) => {
    const { theme } = React.useContext(AppContext)
    const { setSettings, ...settings }: any = React.useContext(SettingsContext)
    useDocument({ options: [{ selector: 'title', value: `Photon's Portfoliio: Page Do Not Exist` }] })

    React.useEffect(() => {
        setSettings({
            ...settings,
            settingsList: [
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
            className="pages-error-container">
            <div className="row">
                <div className="col p-0">
                    <AnimeThreeJSError
                        history={history}
                        theme={theme}
                        colors={Colors} />
                    <ErrorMessage />
                </div>
            </div>
        </motion.div>
    )
}

export default Error