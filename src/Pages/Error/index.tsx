import * as React from 'react'
import { motion } from 'framer-motion'
import get from 'lodash/get'
import { useTranslation } from 'react-i18next'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilePdf } from "@fortawesome/free-solid-svg-icons"

import { Colors } from 'Constants/Colors'
import { PageTransition } from 'Constants/PageTransition'
import { AppContext } from 'AppContext'
import { SettingsContext } from 'SettingsContext'
import { AnimeThreeJSError } from 'Components/Anime/ThreeJS/Pages/Error'
import { ZombieGame } from 'Components/Anime/ThreeJS/ZombieGame'
import { ErrorMessage } from 'Components/ErrorMessage'
import { Cards } from 'Components/Cards'
import { Drawer } from 'Components/Drawer'
import { useDocument } from 'Hooks/UseDocument'
import { usePosts } from 'Hooks/UsePosts'
import { SPK } from 'Svg/SPK'
import { PdfViewer } from 'Components/Pdf'
import "./styles.scss"

const drawerVariants = {
    initial: {
        opacity: 0,
        y: 9999
    },
    animate: {
        opacity: 0.9,
        y: 0,
        transition: {
            duration: 0.4
        }
    },
    exit: {
        y: 9999,
        opacity: 0
    }
}

export const Error = ({ history, location, match }: any) => {
    const { theme } = React.useContext(AppContext)
    const { setSettings, ...settings }: any = React.useContext(SettingsContext)
    const { loading, data } = usePosts({ params: { _limit: 20, _page: Math.random() * 100 } })
    const { t } = useTranslation()
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
                    {
                        loading ? (
                            <React.Fragment>
                                <div className="loading-section">
                                    <SPK
                                        width={100}
                                        height={46.8}
                                        // @ts-ignore
                                        fillColor={Colors[theme].primaryColor}
                                        svgVariants={{}}
                                        pathVariantsOne={{
                                            initial: {
                                                y: 0
                                            },
                                            animate: {
                                                y: [0, 25, 50, 75, 50, 25],
                                                transition: {
                                                    y: {
                                                        duration: 2,
                                                        yoyo: Infinity
                                                    },
                                                }
                                            },
                                            exit: {}
                                        }}
                                        pathVariantsTwo={{
                                            initial: {
                                                y: 25
                                            },
                                            animate: {
                                                y: [25, 50, 75, 50, 25, 0],
                                                transition: {
                                                    y: {
                                                        duration: 2,
                                                        yoyo: Infinity
                                                    },
                                                }
                                            },
                                            exit: {}
                                        }}
                                        pathVariantsThree={{
                                            initial: {
                                                y: 50
                                            },
                                            animate: {
                                                y: [50, 75, 50, 25, 0, 25],
                                                transition: {
                                                    y: {
                                                        duration: 2,
                                                        yoyo: Infinity
                                                    },
                                                }
                                            },
                                            exit: {}
                                        }}
                                        colors={Colors}
                                        theme={theme} />
                                </div>
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
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
                                <div className={`pdf-viewer`}>
                                    <Drawer
                                        colors={Colors}
                                        theme={theme}
                                        drawerVariants={drawerVariants}
                                        // hotKeyHandler={`DOWNLOAD_FRIENDS_LIST`}
                                        direction={`bottom`}
                                        allowSortUp={false}
                                        buttonShape={`round`}
                                        buttonDisplay={(
                                            <FontAwesomeIcon icon={faFilePdf} />
                                        )}>
                                        {
                                            ({ toggleDrawer }: any) => {
                                                return (
                                                    <PdfViewer
                                                        width={`100%`}
                                                        height={`500px`}/>
                                                )
                                            }
                                        }
                                    </Drawer>
                                </div>
                            </React.Fragment>
                        )
                    }
                </div>
            </div>
            <div className="row">
                <div className="col p-0">
                    <ZombieGame
                        history={history}
                        theme={theme}
                        colors={Colors} />
                </div>
            </div>
        </motion.div>
    )
}

export default Error