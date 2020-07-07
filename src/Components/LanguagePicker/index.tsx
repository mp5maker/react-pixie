import * as React from 'react'
import { useTranslation } from 'react-i18next'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome } from '@fortawesome/free-solid-svg-icons'

import { AppContext } from '../../AppContext'
import { Colors } from '../../Constants/Colors'
import { LANGUAGE, EN, BN } from '../../Constants/Settings'
import { StorageSet } from '../../Utilities/Storage'
import * as Routes from '../../Constants/Routes'

import "./styles.scss"

export const LanguagePicker = ({ history }: any) => {
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
                    <button
                        style={{
                            // @ts-ignore
                            backgroundColor: Colors[theme].backgroundColor,
                            // @ts-ignore
                            border: `1px solid ${Colors[theme].backgroundColor}`,
                            // @ts-ignore
                            color: Colors[theme].primaryColor,
                        }}
                        onClick={() => history.push(Routes.ROOT)}>
                        <FontAwesomeIcon icon={faHome} />
                    </button>
                </div>
            </div>
        </>
    )
}