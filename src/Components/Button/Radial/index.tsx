import * as React from 'react'

import './styles.scss'

export const ButtonRadial = ({ style = {}, onClick = () => {}, children }: any = {}) => {
    return (
        <button
            className={`button-radial-container`}
            style={style}
            onClick={onClick}>
            { children }
        </button>
    )
}
