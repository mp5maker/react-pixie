import * as React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons'
import { GlobalHotKeys } from 'react-hotkeys'

import { AppContext } from 'AppContext'
import { Colors } from 'Constants/Colors'
import { LIGHT, DARK, THEME } from 'Constants/Settings'
import { StorageSet } from 'Utilities/Storage'
import { ButtonRadial } from 'Components/Button/Radial'

import "./styles.scss"

export const ThemePicker = () => {
    const { theme, setTheme }: any = React.useContext(AppContext)

    const LightButton = (
        <ButtonRadial
            style={{
                // @ts-ignore
                backgroundColor: Colors[theme].backgroundColor,
                // @ts-ignore
                color: Colors[theme].secondaryColor,
                ...(theme == LIGHT ? {
                    // @ts-ignore
                    border: `1px solid ${Colors[theme].primaryColor}`
                } : {
                        border: `1px solid transparent`
                    })
            }}
            onClick={() => {
                setTheme(LIGHT)
                StorageSet({ key: THEME, value: LIGHT })
            }}>
            <FontAwesomeIcon icon={faSun} />
        </ButtonRadial>
    )

    const DarkButton = (
        <ButtonRadial
            style={{
                // @ts-ignore
                backgroundColor: Colors[theme].backgroundColor,
                // @ts-ignore
                color: Colors[theme].secondaryColor,
                ...(theme == DARK ? {
                    // @ts-ignore
                    border: `1px solid ${Colors[theme].primaryColor}`
                } : {
                        border: `1px solid transparent`
                    })
            }}
            onClick={() => {
                setTheme(DARK)
                StorageSet({ key: THEME, value: DARK })
            }}>
            <FontAwesomeIcon icon={faMoon} />
        </ButtonRadial>
    )

    const handlers = {
        THEME_LIGHT_SETTINGS: () => {
            setTheme(LIGHT)
            StorageSet({ key: THEME, value: LIGHT })
        },
        THEME_DARK_SETTINGS: () => {
            setTheme(DARK)
            StorageSet({ key: THEME, value: DARK })
        }
    }

    return (
        <>
            <GlobalHotKeys handlers={handlers}>
                <div className="theme-picker-container">
                    <div className="theme-picker-content">
                        { LightButton }
                        { DarkButton }
                    </div>
                </div>
            </GlobalHotKeys>
        </>
    )
}