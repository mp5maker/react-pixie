import * as React from 'react'
import PropTypes from 'prop-types'
import { motion } from 'framer-motion'
import { Howl } from 'howler'

import './styles.scss'

const sound = new Howl({
    src: ['/Audio/menu.mp3'],
    preload: true,
    volume: 1,
    sprite: {
        hover: [10000, 250],
        click: [10000, 1000]
    }
})

interface ButtonRadialPropsInterface {
    style?: any,
    onClick?: ((params: any) => any) | ((params: any) => void),
    children: React.ReactNode,
    variants?: any,
    initial?: string,
    animate?: string,
    exit?: string,
    ariaLabel?: string
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
                sound.stop()
                sound.fade(1, 0, 1000)
                sound.play('click')
                onClick(event)
            }}
            onMouseEnter={(event) => {
                sound.stop()
                sound.fade(1, 0, 100)
                sound.play('hover')
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
}