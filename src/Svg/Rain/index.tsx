import * as React from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const svgVariants = {
    initial: {
        opacity: 0
    },
    animate: {
        opacity: 1,
        transition: {
            duration: 1
        }
    },
    exit: {
        opacity: 0
    }
}

const rainVariants = {
    initial: {
        pathLength: 0
    },
    animate: {
        y: [0, -5, -10, -15, -20, -15, -10, -5],
        x: [0, -5, -10, -15, -20, -15, -10, -5],
        pathLength: 1,
        transition: {
            pathLength: {
                duration: 2,
                ease: `easeInOut`
            },
            y: {
                duration: 1,
                loop: Infinity,
            },
            x: {
                duration: 1,
                loop: Infinity,
            }
        }
    },
    exit: {
        opacity: 0
    }
}

export const Rain = ({ colors, theme, width = 353, height = 426, strokeWidth = 10, svgKey = ''}: any) => {
    return (
        <AnimatePresence initial={true} exitBeforeEnter>
            <motion.svg
                key={`rain-svg-${svgKey}`}
                variants={svgVariants}
                initial={`initial`}
                animate={`animate`}
                exit={`exit`}
                width={width}
                height={height}
                viewBox="0 0 353 426"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <motion.path
                    variants={rainVariants}
                    strokeWidth={strokeWidth}
                    d="M103.5 46L129 11L140 32.5L145 65.5V107.5L135.5 153L114 201L83.5 223.5L37.5 221L12.5 197L1.5 163.5L12.5 124.5L45.5 91L103.5 46Z"
                    stroke={colors[theme].primaryColor} />
                <motion.path
                    variants={rainVariants}
                    strokeWidth={strokeWidth}
                    d="M317 29.5L334.5 1.5L348.5 36.5L352 79L345.5 127L334.5 159.5L311 195L273 210L233.5 200.5L208.5 169.5V137L216 108L253 71.5L281 56L317 29.5Z"
                    stroke={colors[theme].primaryColor} />
                <motion.path
                    variants={rainVariants}
                    strokeWidth={strokeWidth}
                    d="M147.5 249L172 221.5L190 294L186 341L172 379.5L147.5 415.5L107.5 425L69.5 417L46.5 388L42 356L65 312L107.5 279L147.5 249Z"
                    stroke={colors[theme].primaryColor} />
            </motion.svg>
        </AnimatePresence>

    )
}