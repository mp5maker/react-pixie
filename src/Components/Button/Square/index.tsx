import * as React from 'react'
import Button from '@material-ui/core/Button';

import './styles.scss'

export const ButtonSquare = ({ style = {}, onClick = () => {}, children }: any = {}) => {
    return (
        <Button
            className={`button-square-container`}
            style={style}
            onClick={onClick}>
            { children }
        </Button>
    )
}
