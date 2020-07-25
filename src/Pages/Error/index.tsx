import * as React from 'react'
import { motion } from 'framer-motion'
import get from 'lodash/get'

import { Colors } from 'Constants/Colors'
import { PageTransition } from 'Constants/PageTransition'
import { AppContext } from 'AppContext'
import { SettingsContext } from 'SettingsContext'
import { AnimeThreeJSError } from 'Components/Anime/ThreeJS/Pages/Error'
import { ErrorMessage } from 'Components/ErrorMessage'
import { Cards } from 'Components/Cards'
import { useDocument } from 'Hooks/UseDocument'
import { usePosts } from 'Hooks/UsePosts'

export const Error = ({ history, location, match }: any) => {
    const { theme } = React.useContext(AppContext)
    const { setSettings, ...settings }: any = React.useContext(SettingsContext)
    const { loading, data } = usePosts({ params: { _limit: 20 } })
    useDocument({ options: [{ selector: 'title', value: `Photon's Portfolio: Page Do Not Exist` }] })

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
            <div className="row">
                <div className="col p-0">
                    <Cards
                        prepareItem={({ item }: any) => {
                            const name = get(item, 'name', '')
                            const designation = get(item, 'designation', '')
                            const joining_date = get(item, 'joining_date', '')
                            const department = get(item, 'department', '')

                            return (
                                <React.Fragment>
                                    <div>
                                        <div>
                                            <h5>
                                                { name }
                                            </h5>
                                        </div>
                                        <hr/>
                                        <div className={`space-more`}>
                                            { designation }
                                        </div>
                                        <div>
                                            { department }
                                        </div>
                                        <div>
                                            { joining_date.substring(0, 10) }
                                        </div>
                                    </div>
                                </React.Fragment>
                            )
                        }}
                        list={data} />
                </div>
            </div>
        </motion.div>
    )
}

export default Error