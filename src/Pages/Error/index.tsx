import * as React from 'react'
import { motion } from 'framer-motion'
import get from 'lodash/get'
import { useTranslation } from 'react-i18next'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilePdf } from "@fortawesome/free-solid-svg-icons"
import { useQuery } from 'react-query'

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
import { useSmoothScroll } from 'Hooks/UseSmoothScroll'
import { Query } from 'Services/Query'
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
    const { isLoading, error, data: response } = useQuery([
        'posts',
        { params: { _limit: 20, _page: 3 } }
    ], Query)
    const { t } = useTranslation()
    useDocument({ options: [{ selector: 'title', value: `Photon's Portfolio: Page Do Not Exist` }] })
    useSmoothScroll({})
    const data = get(response, 'data', [])

    React.useEffect(() => {
        setSettings({
            ...settings,
            settingsList: [
                'acceleration',
            ]
        })
    }, [])

    const memoLoading = React.useMemo(() => {
        return (
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
        )
    }, [theme])

    const memoCards = React.useMemo(() => {
        return (
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
                                        {name}
                                    </h5>
                                </div>
                                <hr />
                                <div className={`space-more`}>
                                    {designation}
                                </div>
                                <div>
                                    {department}
                                </div>
                                <div>
                                    {joining_date.substring(0, 10)}
                                </div>
                            </div>
                        </React.Fragment>
                    )
                }}
                list={data} />
        )
    }, [data])

    const memoPDF = React.useMemo(() => {
        return (
            <div className={`pdf-viewer`}>
                <Drawer
                    colors={Colors}
                    theme={theme}
                    drawerVariants={drawerVariants}
                    openButtonTitle={t(`OPEN_FRIENDS_LIST_DRAWER`)}
                    closeButtonTitle={t(`CLOSE_FRIENDS_LIST_DRAWER`)}
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
                                    list={data}
                                    properties={[
                                        'name',
                                        'designation',
                                        'joining_date',
                                        'department',
                                    ]}
                                    tableWidth={{
                                        name: 125,
                                        designation: 125,
                                        joining_date: 125,
                                        department: 125
                                    }}
                                    header={{
                                        name: t(`NAME`),
                                        designation: t(`DESIGNATION`),
                                        joining_date: t(`JOINING_DATE`),
                                        department: t(`DEPARTMENT`)
                                    }}
                                    body={({ row, column }: any) => {
                                        if (column == 'name') return get(row, 'name', t(`HYPHEN`))
                                        if (column == 'designation') return get(row, 'designation', t(`HYPHEN`))
                                        if (column == 'joining_date') return get(row, 'joining_date', t(`HYPHEN`)).slice(0, 10)
                                        if (column == 'name') return get(row, 'department', t(`HYPHEN`))
                                        return row[column]
                                    }}
                                    width={`100%`}
                                    height={`500px`} />
                            )
                        }
                    }
                </Drawer>
            </div>
        )
    }, [data])

    const zombieGameMemo = React.useMemo(() => {
        return (
            <ZombieGame
                history={history}
                theme={theme}
                colors={Colors} />
        )
    }, [history, theme])

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
                        isLoading ? (
                            <React.Fragment>
                                { memoLoading }
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                { memoCards }
                                { memoPDF }
                            </React.Fragment>
                        )
                    }
                </div>
            </div>
            <div className="row">
                <div className="col p-0">
                    { zombieGameMemo }
                </div>
            </div>
        </motion.div>
    )
}

export default Error