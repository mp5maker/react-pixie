import * as React from 'react'
import { useKeyboard } from '../../Hooks/UseKeyboard'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp, faArrowDown, faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'

import './styles.scss'

export const ShowKeyCombo = ({ colors, theme }: any) => {
    const { keyValue } = useKeyboard()
    const isArrowUp = keyValue == 'ArrowUp' ? true : false
    const isArrowDown = keyValue == 'ArrowDown' ? true : false
    const isArrowLeft = keyValue == 'ArrowLeft' ? true : false
    const isArrowRight = keyValue == 'ArrowRight' ? true : false

    let currentIcon: any = isArrowUp ? faArrowUp : '';
    currentIcon = isArrowDown ? faArrowDown : currentIcon
    currentIcon = isArrowLeft ? faArrowLeft : currentIcon
    currentIcon = isArrowRight ? faArrowRight : currentIcon

    return keyValue ? (
        <div
            style={{
                color: colors[theme].primaryColor
            }}
            className="show-key-combo-container">
            {
                (isArrowUp || isArrowDown || isArrowLeft || isArrowRight) ? (
                    <React.Fragment>
                        <kbd>
                            <FontAwesomeIcon
                                icon={currentIcon} />
                        </kbd>
                    </React.Fragment>
                ) : (
                        <React.Fragment>
                            <kbd>
                                { keyValue }
                            </kbd>
                        </React.Fragment>
                    )
            }
        </div>
    ) : <></>
}