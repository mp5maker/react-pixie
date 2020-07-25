import * as React from 'react'
import PropTypes from 'prop-types'
import { motion } from 'framer-motion'

import './styles.scss'

interface ButtonRadialPropsInterface {
    style?: any,
    onClick?: ((params: any) => any) | ((params: any) => void),
    children: React.ReactNode,
    variants?: any,
    initial?: string,
    animate?: string,
    exit?: string,
}

export const ButtonRadial: React.FC<ButtonRadialPropsInterface> = ({ style = {}, onClick = () => {}, children, ...otherProps }: any = {}) => {
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


ButtonRadial.propTypes = {
    style: PropTypes.shape({}),
    onClick: PropTypes.func,
    children: PropTypes.node,
    variants: PropTypes.shape({}),
    initial: PropTypes.string,
    animate: PropTypes.string,
    exit: PropTypes.string,
}