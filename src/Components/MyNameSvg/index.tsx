import * as React from 'react'
import { useTranslation } from 'react-i18next'

import { EN, BN } from 'Constants/Settings'
import { MyNameSvgBengali } from 'Components/MyNameSvg/Bengali'
import { MyNameSvgEnglish } from 'Components/MyNameSvg/English'
import { useMedia } from 'Hooks/UseMedia'

import "./styles.scss"
import { AnimatePresence, motion } from 'framer-motion'

const myNameSvgIntroVariants = {
    initial: {
        y: -1000,
        opacity: 0,
    },
    animate: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 1
        }
    },
    exit: {
        y: -1000,
        opacity: 0,
        transition: {
            duration: 1
        }
    }
}

const myNameSvgDescriptionMainVariants = {
    initial: {
        x: -10,
        opacity: 0,
    },
    animate: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 1
        }
    },
    exit: {
        opacity: 0,
    }
}

const myNameSvgDescriptionVariants = {
    initial: {
        x: -10,
        opacity: 0,
    },
    animate: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 1
        }
    },
    exit: {
        x: 10,
        opacity: 0,
        transition: {
            duration: 1
        }
    }
}

export const MyNameSvg = ({ colors, theme }: any) => {
    const { t, i18n } = useTranslation()
    const isWidthGreaterThan991 = useMedia({ query: "(min-width: 991px)" })

    const isEnglish = i18n.language == EN
    const isBengali = i18n.language == BN

    React.useEffect(() => {
        const body: any = document.querySelector('body')
        body.style.overflow = 'hidden'
        return () => {
            body.style.overflow = ''
        }
    })

    return (
        <>
            {
                isWidthGreaterThan991 && (
                    <div className={`my-name-svg-container`}>
                        <div className={`svg-section`}>
                            <div>
                                <AnimatePresence exitBeforeEnter initial={true}>
                                    <motion.div
                                        className={`d-inline-block mr-2`}
                                        key={i18n.language}
                                        variants={myNameSvgIntroVariants}
                                        initial={`initial`}
                                        animate={`animate`}
                                        exit={`exit`}>
                                        {t(`HI_I_AM`)}
                                    </motion.div>
                                </AnimatePresence>
                                <span>
                                    <AnimatePresence exitBeforeEnter initial={true}>
                                        {
                                            isEnglish && (
                                                <MyNameSvgEnglish colors={colors} theme={theme} />
                                            )
                                        }
                                        {
                                            isBengali && (
                                                <MyNameSvgBengali colors={colors} theme={theme} />
                                            )
                                        }
                                    </AnimatePresence>
                                </span>
                            </div>
                        </div>
                        <AnimatePresence exitBeforeEnter initial={false}>
                            <motion.div
                                key={`${i18n.language}-main`}
                                variants={myNameSvgDescriptionMainVariants}
                                initial={`initial`}
                                animate={`animate`}
                                exit={`exit`}
                                className={`details-section`}>
                                <motion.div>
                                    <img src="/ok.png" width={140} height={222} />
                                </motion.div>
                                <motion.div>
                                    <AnimatePresence initial={false}>
                                        <motion.div
                                            key={`${i18n.language}-1`}
                                            variants={myNameSvgDescriptionVariants}
                                            initial={`initial`}
                                            animate={`animate`}
                                            exit={`exit`}>
                                            {t(`I_AM_A`)} <strong>{ t(`SENIOR_SOFTWARE_ENGINEER`)}</strong>
                                        </motion.div>
                                        <motion.div
                                            key={`${i18n.language}-2`}
                                            variants={myNameSvgDescriptionVariants}
                                            initial={`initial`}
                                            animate={`animate`}
                                            exit={`exit`}>
                                            {t(`I_HAVE_PASSION_FOR_UI_UX_ANIMATIONS_AND_LOVE_TO_CREATE`) }
                                        </motion.div>
                                        <motion.div
                                            key={`${i18n.language}-3`}
                                            variants={myNameSvgDescriptionVariants}
                                            initial={`initial`}
                                            animate={`animate`}
                                            exit={`exit`}>
                                            {t(`WEBSITES_TO_RUN_ACROSS_MULTIPLE_DEVICES_WITH`) }
                                        </motion.div>
                                        <motion.div
                                            key={`${i18n.language}-4`}
                                            variants={myNameSvgDescriptionVariants}
                                            initial={`initial`}
                                            animate={`animate`}
                                            exit={`exit`}>
                                            <strong>
                                                { t(`DYNAMIC_USER_EXPERIENCES`) }
                                            </strong>
                                        </motion.div>
                                    </AnimatePresence>
                                </motion.div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                )
            }
        </>
    )
}