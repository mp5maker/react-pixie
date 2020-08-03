import * as React from 'react'
import { useTranslation } from 'react-i18next'
import { GlobalHotKeys } from 'react-hotkeys'

import { AppContext } from 'AppContext'
import { Colors } from 'Constants/Colors'
import { LANGUAGE, EN, BN } from 'Constants/Settings'
import { StorageSet } from 'Utilities/Storage'
import { ButtonRadial } from 'Components/Button/Radial'
import * as Routes from 'Constants/Routes'

import "./styles.scss"

export const LanguagePicker = () => {
    const { theme, setTheme }: any = React.useContext(AppContext)
    const { t, i18n } = useTranslation()

    const EnglishButton = (
        <ButtonRadial
            title={t(`CHANGE_TO_ENGLISH_LANGUAGE`)}
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
            {t(`EN`)}
        </ButtonRadial>
    )

    const BengaliButton = (
        <ButtonRadial
            title={t(`CHANGE_TO_BENGALI_LANGUAGE`)}
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
            {t(`BN`)}
        </ButtonRadial>
    )

    const handlers = {
        ENGLISH_SETTINGS: () => {
            i18n.changeLanguage(EN)
            StorageSet({ key: LANGUAGE, value: EN })
        },
        BENGALI_SETTINGS: () => {
            i18n.changeLanguage(BN)
            StorageSet({ key: LANGUAGE, value: BN })
        }
    }

    return (
        <>
            <GlobalHotKeys handlers={handlers}>
                <div className="language-picker-container">
                    <div className="language-picker-content">
                        { EnglishButton }
                        { BengaliButton }
                    </div>
                </div>
            </GlobalHotKeys>
        </>
    )
}