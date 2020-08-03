import * as React from 'react'
import PropTypes from 'prop-types'
import { motion } from 'framer-motion'
import { Howl } from 'howler'

import './styles.scss'

const soundHover = new Howl({
    src: ['/Audio/button-hover-alternative.mp3'],
    preload: true,
    volume: 1,
})

const soundClick = new Howl({
    src: ['/Audio/button-click-alternative.mp3'],
    preload: true,
    volume: 1,
})

interface ButtonRadialPropsInterface {
    style?: any,
    onClick?: ((params: any) => any) | ((params: any) => void),
    children: React.ReactNode,
    variants?: any,
    initial?: string,
    animate?: string,
    exit?: string,
    ariaLabel?: string,
    title?: string,
}

export const ButtonRadial: React.FC<ButtonRadialPropsInterface> = ({
    style = {},
    onClick = () => {},
    onMouseEnter = () => {},
    children,
    ariaLabel = 'Feature Button',
    ...otherProps
}: any = {}) => {
    return (
        <motion.button
            className={`button-radial-container`}
            style={style}
            aria-label={ariaLabel}
            onClick={(event) => {
                soundClick.play()
                onClick(event)
            }}
            onMouseEnter={(event) => {
                soundHover.play()
                onMouseEnter(event)
            }}
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
    ariaLabel: PropTypes.string,
    title: PropTypes.string,
}