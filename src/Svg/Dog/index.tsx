import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'

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

const pathVariants = {
    initial: {
        pathLength: 0
    },
    animate: {
        pathLength: 1,
        transition: {
            duration: 2,
            ease: `easeInOut`
        }
    },
    exit: {
        opacity: 0
    }
}

const tailVariants = {
    initial: {
        pathLength: 0,
        y: 0,
        x: 0,
    },
    animate: {
        pathLength: 1,
        x: [-5, -4, -3, -2, -1, 0, -1, -2, -3, -4],
        y: [10, 8, 6, 4, 2, 0, 2, 4, 6, 8],
        transition: {
            y: {
                duration: 1,
                loop: Infinity,
                repeatDelay: 1
            },
            x: {
                duration: 1,
                loop: Infinity,
                repeatDelay: 1
            },
            pathLength: {
                duration: 2,
                ease: `easeInOut`
            }
        }
    },
    exit: {
        opacity: 0
    }
}

const eyeVariants = {
    initial: {
        pathLength: 0,
    },
    animate: {
        pathLength: 1,
        scale: [1, 0.1, 1],
        transition: {
            pathLength: {
                duration: 2,
                ease: `easeInOut`
            },
            scale: {
                duration: 0.25,
                loop: Infinity,
                repeatDelay: 4
            }
        }
    },
    exit: {
        opacity: 0
    }
}

export const Dog = ({ colors, theme, width = 450, height = 420, strokeWidth = 10, svgKey = '' }: any) => {
    return (
        <AnimatePresence
            initial={true}
            exitBeforeEnter>
            <motion.svg
                key={`dog-svg-${svgKey}`}
                variants={svgVariants}
                initial={`initial`}
                animate={`animate`}
                exit={`exit`}
                width={width}
                height={height}
                viewBox="0 0 450 420"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <motion.path
                    key={`dog-path-1`}
                    variants={pathVariants}
                    d="M153.5 309.5L164 280.5L192 289L223.5 299L241.5 309.5L255 317V329L233 338.5L223.5 354.5V377.5L233 392L226 398L215 410H233H316.5L354 329V309.5V299L343 289L324 271L291 243L255 209.5L206.5 169.5L223.5 161L192 146.5L182.5 136.5L191 132.5"
                    strokeWidth={strokeWidth}
                    stroke={colors[theme].primaryColor} />
                <motion.path
                    key={`dog-path-2`}
                    variants={pathVariants}
                    d="M26 81H42L49 94.5L65 101.5L85.5 109H97.5L116 101.5L129 94.5L137.5 81L145 94.5L159.5 101.5L176.5 113.5L159.5 116L166.5 121L176.5 124.5L189.5 132H182.5H166.5L143.5 146.5L129 162L123 180L116 199.5V226L123 238.5L134 251.5L137.5 267.5L145 296.5L153.5 311L145 329L143.5 346L145 369L143.5 388.5V410L137.5 411.5H123H102.5L112 404L123 398L129 388.5V375V357V337.5V320.5L123 311L116 296.5V280.5L109.5 267.5H102.5L93 257.5L90.5 244.5L93 226L85.5 232L74.5 238.5V226V213V199.5H65V186.5V173L74.5 162L65 156V146.5V132L57.5 121H42H26L10.5 113.5L1 101.5V81H26Z"
                    strokeWidth={strokeWidth}
                    stroke={colors[theme].primaryColor} />
                <motion.path
                    key={`dog-path-3`}
                    variants={pathVariants}
                    strokeWidth={strokeWidth}
                    d="M40.5 80L53 70L62.5 59H76L84.5 46V31.5V11V1L101 11L109.5 31.5L119.5 59L125.5 72.5L137.5 80"
                    stroke={colors[theme].primaryColor} />
                <motion.path
                    key={`dog-path-tail`}
                    variants={tailVariants}
                    d="M354.5 381L344.5 355H341.5L354 328.5L359 331L362 336.5L371 345L379.5 355L389 365.5L402 372.5H409.5H415H433.5L448 371L449 375.5L444.5 388.5L438 401.5L427 413.5L409.5 419L389 413.5L371 401.5L354.5 381Z"
                    strokeWidth={strokeWidth}
                    stroke={colors[theme].primaryColor} />
                <motion.path
                    key={`dog-path-5`}
                    variants={pathVariants}
                    d="M77 56.5L76.5 40L73.5 39L68.5 42L65.5 43L64.5 40.5L65.5 38.5L67 35.5L69 32L71 29L73 26.5L74 23.5L75 21L78 19.5H83L84.5 21"
                    strokeWidth={strokeWidth}
                    stroke={colors[theme].primaryColor} />
                <motion.path
                    key={`dog-path-6`}
                    variants={pathVariants}
                    d="M143.5 410H155.5V335L158 322L159 318.5L164.5 300L168.5 291L169.5 282"
                    strokeWidth={strokeWidth}
                    stroke={colors[theme].primaryColor} />
                <motion.path
                    key={`dog-path-7`}
                    variants={pathVariants}
                    d="M1.5 95H8.5L11 93L13.5 91.5L15.5 89.5L16.5 88V85V83.5V81"
                    strokeWidth={strokeWidth}
                    stroke={colors[theme].primaryColor} />
                <motion.path
                    key={`dog-path-eyes`}
                    variants={eyeVariants}
                    d="M60.5 79.5L61.5 78.5H62.5H63H64L64.5 79.5L65.5 80.5V81.5L64.5 82.5L64 83.5H63H62.5H61.5L60.5 83L59.5 82.5V81.5V80.5L60.5 79.5Z"
                    strokeWidth={strokeWidth}
                    stroke={colors[theme].primaryColor} />
                <motion.path
                    key={`dog-path-9`}
                    variants={pathVariants}
                    d="M249.5 314.5L235 326L219.5 338.5L215 351L214 360L215 372L217 380.5L219.5 386L221.5 391.5L217 393L212.5 396L208 399L205 404.5L204 409V410H215"
                    strokeWidth={strokeWidth}
                    stroke={colors[theme].primaryColor} />
            </motion.svg>
        </AnimatePresence>
    )
}


