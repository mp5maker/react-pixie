import * as React from 'react'
import { motion } from 'framer-motion'

import './styles.scss'

export const ButtonRadial = ({ style = {}, onClick = () => {}, children, ...otherProps }: any = {}) => {
    return (
        <motion.button
            className={`button-radial-container`}
            style={style}
            onClick={onClick}
            {...otherProps}>
            { children }
        </motion.button>
    )
}
