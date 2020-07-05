import * as React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons'

import { AppContext } from '../../AppContext'
import { Colors } from '../../Constants/Colors'
import { LIGHT, DARK } from '../../Constants/Settings'

import "./style.scss"

export const ThemePicker = () => {
    const { theme, setTheme }: any = React.useContext(AppContext)

    return (
        <>
            <div className="theme-picker-container">
                <div className="theme-picker-content">
                    <button
                        style={{
                            // @ts-ignore
                            backgroundColor: Colors[theme].backgroundColor,
                            // @ts-ignore
                            color: Colors[theme].secondaryColor,
                            ...(theme == LIGHT ? {
                                // @ts-ignore
                                border: `1px solid ${Colors[theme].primaryColor}`
                            }: {
                                border: `1px solid transparent`
                            })
                        }}
                        onClick={() => setTheme(LIGHT)}>
                        <FontAwesomeIcon icon={faSun} />
                    </button>
                    <button
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
                        onClick={() => setTheme(DARK)}>
                        <FontAwesomeIcon icon={faMoon} />
                    </button>
                </div>
            </div>
        </>
    )
}