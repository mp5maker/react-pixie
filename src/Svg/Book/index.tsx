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


export const Book = ({ colors, theme, width = 576, height = 733, strokeWidth = 10, svgKey= '' }: any) => {
    return (
        <AnimatePresence initial={true} exitBeforeEnter>
            <motion.svg
                key={`book-svg-${svgKey}`}
                variants={svgVariants}
                initial={`initial`}
                animate={`animate`}
                exit={`exit`}
                width={width}
                height={height}
                viewBox="0 0 576 733"
                fill="none"
                xmlns="http://www.w3.org/2000/motion.svg">
                <motion.path
                    key={`book-path-1`}
                    variants={pathVariants}
                    d="M39.5 445C41.5 442.2 15 347.833 1.5 301L213.5 390L244 395.5L279.5 390L514 330.5L525.5 333.5L510.5 413L468.5 657.5L459.5 663L418.5 682L385 695.5L313.5 726.5L290 732.5H261.5L241 726.5L86.5 658.5C70 588.5 37.5 447.8 39.5 445Z"
                    strokeWidth={strokeWidth}
                    stroke={colors[theme].primaryColor}/>
                <motion.path
                    key={`book-path-2`}
                    variants={pathVariants}
                    d="M23 309.5L48 300.5L74.5 304L119.5 316L170 340L216 367.5L244 395.5"
                    strokeWidth={strokeWidth}
                    stroke={colors[theme].primaryColor}/>
                <motion.path
                    key={`book-path-3`}
                    variants={pathVariants}
                    d="M271.5 391L280 372L322.5 347L358.5 331.5L411.5 310.5L458.5 299L471.5 301L498 315L514 324L525.5 333.5"
                    strokeWidth={strokeWidth}
                    stroke={colors[theme].primaryColor}/>
                <motion.path
                    key={`book-path-4`}
                    variants={pathVariants}
                    d="M213 390L245.5 727.5"
                    strokeWidth={strokeWidth}
                    stroke={colors[theme].primaryColor}/>
                <motion.path
                    key={`book-path-5`}
                    variants={pathVariants}
                    d="M221.5 479C243.5 479.5 287.3 479.6 286.5 476M223 497L249 502L288.5 492"
                    strokeWidth={strokeWidth}
                    stroke={colors[theme].primaryColor}/>
                <motion.path
                    key={`book-path-6`}
                    variants={pathVariants}
                    d="M225 518L247.5 522.5L290.5 512"
                    strokeWidth={strokeWidth}
                    stroke={colors[theme].primaryColor}/>
                <motion.path
                    key={`book-path-7`}
                    variants={pathVariants}
                    d="M278 390L312 727"
                    strokeWidth={strokeWidth}
                    stroke={colors[theme].primaryColor}/>
                <motion.path
                    key={`book-path-8`}
                    variants={pathVariants}
                    d="M155.5 95.5C157.5 97.9 168 98.5 173 98.5L159 109L143.5 124.5L131 141.5C127.167 148.833 119.4 163.4 119 163C118.6 162.6 114.167 180.833 112 190C111.5 192.833 110.5 199 110.5 201C110.5 203 117.833 202.5 121.5 202L157 192.5L167.5 190L205 184L213.5 183H234.5C237.167 183.333 242.6 184 243 184C243.4 184 251.167 185.333 255 186L260.5 185.5L263 184L263.5 176.5L265 172.5L266 169.5H268C268 170.167 268.2 171.4 269 171C269.8 170.6 271.333 180.5 272 185.5L315.5 183L364.5 178L386 176.5L412.5 176L456 175L463 176L470 178L477 182.5L477.5 193L484 198H492.5L493.5 200V228L529 211L529.5 188.5L532 188L542.5 193L546 191.5L549.5 188L550.5 181C550.333 179.667 550.1 176.9 550.5 176.5C550.9 176.1 547.667 160 546 152L528.5 100.5L505 81.5L486.5 70L453.5 55.5L440.5 51.5L394.5 40L385.5 39L375.5 38C375.667 36.8333 375.9 34.6 375.5 35C375.1 35.4 384 20.8333 388.5 13.5V8.5H387.5H384.5H377.5L363 10.5L357 11.5L348 13.5L326.5 20.5L303.5 34.5H302.5H301.5L294.5 28.5L277.5 17.5L237.5 2.5L234.5 1.5L233 0.5H228.5H225.5L223.5 1.5L222.5 5.5L223.5 6.5L228.5 10.5L237.5 17L247 26L253.5 34.5V36L249 35.5H245H238H228.5L220 36.5L215.5 39.5V44L221.5 49.5V52.5L207.5 55.5L181 69L150.5 89C151.333 90.1667 153.5 93.1 155.5 95.5Z"
                    strokeWidth={strokeWidth}
                    stroke={colors[theme].primaryColor}/>
                <motion.path
                    key={`book-path-9`}
                    variants={pathVariants}
                    d="M528.5 212L554 217L568.5 229L575 244V266L567 287.5L554 307.5L539 322L525.5 333.5M513 323.5L515.5 315V301L511 291L506 280.5L499.5 273L491 263M553 259.5L551.5 248.5L544 244L533.5 242.5L526.5 248.5L524.5 255L527.5 265L531.5 273L534.5 279V284.5L531 288L527.5 291"
                    strokeWidth={strokeWidth}
                    stroke={colors[theme].primaryColor}/>
                <motion.path
                    key={`book-path-10`}
                    variants={pathVariants}
                    d="M188 233.5L182 245.5V254.5L188 253.5L198.5 246.5L207.5 240L215.5 232L223.5 224L227 215.5L225 210L213 211L205 215.5L196.5 224L188 233.5Z"
                    strokeWidth={strokeWidth}
                    stroke={colors[theme].primaryColor}/>
                <motion.path
                    key={`book-path-11`}
                    variants={pathVariants}
                    d="M379 203.5H369V210.5L370 214L372 220L376 228.5L381.5 237.5L386.5 245L398 257L405.5 260L411 257L410 251.5L405.5 244L400 234.5L393 222.5L387.5 213.5L379 203.5Z"
                    strokeWidth={strokeWidth}
                    stroke={colors[theme].primaryColor}/>
                <motion.path
                    key={`book-human-right-eye`}
                    variants={eyeVariants}
                    d="M342 269L335 274L331 281L328.5 288V297L333.5 303L344 305.5L349 297L354 282.5L351.5 269H342Z"
                    strokeWidth={strokeWidth}
                    stroke={colors[theme].primaryColor}/>
                <motion.path
                    key={`book-human-left-eye`}
                    variants={eyeVariants}
                    d="M245.5 273H238L234.5 279L233 287L236 296.5L242 303L252 305L257 298L255.5 290.5L250.5 281L245.5 273Z"
                    strokeWidth={strokeWidth}
                    stroke={colors[theme].primaryColor}/>
                <motion.path
                    key={`book-path-14`}
                    variants={pathVariants}
                    d="M124.5 319L147 292M147 292V241.5L168 209.5L187.5 199L208.5 196L232.5 205L253 226L265.5 251.5L268.085 275.5M147 292L160.5 319L181 336L232.5 339L258.5 319L269 284L268.085 275.5M268.085 275.5L305 272.5M305 272.5L312 232L330.5 202L359 187.5H385L411.5 196L424 215.5L429.5 237V268L417 298L392 315L355.5 325.5L327.5 315L305 272.5Z"
                    strokeWidth={strokeWidth}
                    stroke={colors[theme].primaryColor}/>
                <motion.path
                    key={`book-path-15`}
                    variants={pathVariants}
                    d="M168.5 209.5L161.5 191.5"
                    strokeWidth={strokeWidth}
                    stroke={colors[theme].primaryColor}/>
                <motion.path
                    key={`book-path-16`}
                    variants={pathVariants}
                    d="M429.5 248L493.5 228"
                    strokeWidth={strokeWidth}
                    stroke={colors[theme].primaryColor}/>
            </motion.svg>
        </AnimatePresence>
    )
}