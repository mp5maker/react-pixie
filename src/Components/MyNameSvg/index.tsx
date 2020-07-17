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
                        </div>
                    </div>
                )
            }
        </>
    )
}