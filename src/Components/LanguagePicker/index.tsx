import * as React from 'react'
import { useTranslation } from 'react-i18next'

import { AppContext } from '../../AppContext'
import { Colors } from '../../Constants/Colors'
import { LANGUAGE, EN, BN } from '../../Constants/Settings'
import { StorageSet } from '../../Utilities/Storage'

import "./styles.scss"

export const LanguagePicker = () => {
    const { theme, setTheme }: any = React.useContext(AppContext)
    const { t, i18n } = useTranslation()

    return (
        <>
            <div className="language-picker-container">
                <div className="language-picker-content">
                    <button
                        style={{
                            // @ts-ignore
                            backgroundColor: Colors[theme].backgroundColor,
                            // @ts-ignore
                            color: Colors[theme].secondaryColor,
                            ...(i18n.language == EN ? {
                                // @ts-ignore
                                border: `1px solid ${Colors[theme].primaryColor}`
                            } : {
                                    border: `1px solid transparent`
                                })
                        }}
                        onClick={() => {
                            i18n.changeLanguage(EN)
                            StorageSet({ key: LANGUAGE, value: EN })
                        }}>
                        { t(`EN`) }
                    </button>
                    <button
                        style={{
                            // @ts-ignore
                            backgroundColor: Colors[theme].backgroundColor,
                            // @ts-ignore
                            color: Colors[theme].secondaryColor,
                            ...(i18n.language == BN ? {
                                // @ts-ignore
                                border: `1px solid ${Colors[theme].primaryColor}`
                            } : {
                                    border: `1px solid transparent`
                                })
                        }}
                        onClick={() => {
                            i18n.changeLanguage(BN)
                            StorageSet({ key: LANGUAGE, value: BN })
                        }}>
                        { t(`BN`) }
                    </button>
                </div>
            </div>
        </>
    )
}