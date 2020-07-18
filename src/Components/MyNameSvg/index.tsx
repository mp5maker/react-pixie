import * as React from 'react'
import { useTranslation } from 'react-i18next'

import { EN, BN } from '../../Constants/Settings'
import { MyNameSvgBengali } from './Bengali'
import { MyNameSvgEnglish } from './English'
import { useMedia } from '../../Hooks/UseMedia'

import "./styles.scss"
import { AnimatePresence } from 'framer-motion'

export const MyNameSvg = ({ colors, theme }: any) => {
    const { t, i18n } = useTranslation()
    const isWidthGreaterThan991 = useMedia({ query: "(min-width: 991px)" })

    const isEnglish = i18n.language == EN
    const isBengali = i18n.language == BN

    return (
        <>
            {
                isWidthGreaterThan991 && (
                    <div className={`my-name-svg-container`}>
                        <div className={`svg-section`}>
                            <div>
                                <span className={`mr-2`}>
                                    {t(`HI_I_AM`)}
                                </span>
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
                        <div className={`details-section`}>
                            <div>
                                <img src="/ok.png" width={140} height={222} />
                            </div>
                            <div>
                                <div>
                                    {t(`I_AM_A`)} <strong>{ t(`SENIOR_SOFTWARE_ENGINEER`)}</strong>
                                </div>
                                <div>
                                    {t(`I_HAVE_PASSION_FOR_UI_UX_ANIMATIONS_AND_LOVE_TO_CREATE`) }
                                </div>
                                <div>
                                    {t(`WEBSITES_TO_RUN_ACROSS_MULTIPLE_DEVICES_WITH`) }
                                </div>
                                <div>
                                    <strong>
                                        { t(`DYNAMIC_USER_EXPERIENCES`) }
                                    </strong>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    )
}