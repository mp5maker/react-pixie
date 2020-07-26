import * as React from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const svgVariant = {
    initial: {},
    animate: {},
    exit: {}
}

const pathVariantOne = {
    initial: {
        pathLength: 0
    },
    animate: {
        pathLength: 1,
        transition: {
            pathLength: {
                duration: 1,
                ease: `easeInOut`
            },
        }
    },
    exit: {
        // opacity: 0
    }
}

const pathVariantTwo = {
    initial: {
        pathLength: 0
    },
    animate: {
        pathLength: 1,
        transition: {
            pathLength: {
                delay: 1,
                duration: 1,
                ease: `easeInOut`
            },
        }
    },
    exit: {
        // opacity: 0
    }
}
const pathVariantThree = {
    initial: {
        pathLength: 0
    },
    animate: {
        pathLength: 1,
        transition: {
            pathLength: {
                delay: 2,
                duration: 1,
                ease: `easeInOut`
            },
        }
    },
    exit: {
        // opacity: 0
    }
}

export const SPK = ({
    colors,
    theme,
    width = 1139,
    height = 534,
    strokeWidth = 10,
    svgKey = '',
    svgVariants = svgVariant,
    pathVariantsOne = pathVariantOne,
    pathVariantsTwo = pathVariantTwo,
    pathVariantsThree = pathVariantThree,
    fillColor = 'none'
}: any) => {
    return (
        <AnimatePresence
            exitBeforeEnter
            initial={true}>
            <motion.svg
                key={`spk-svg-${svgKey}`}
                variants={svgVariants}
                initial={`initial`}
                animate={`animate`}
                exit={`exit`}
                width={width}
                height={height}
                viewBox="0 0 1139 534"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <motion.path
                    variants={pathVariantsOne}
                    strokeWidth={strokeWidth}
                    d="M168.945 128.914C132.487 128.914 105.794 137.866 88.8672 155.77C81.3802 163.908 77.6367 172.208 77.6367 180.672C77.6367 199.227 93.2617 213.549 124.512 223.641C132.975 226.245 159.668 232.43 204.59 242.195C252.441 252.286 284.342 264.819 300.293 279.793C312.012 291.186 317.871 304.695 317.871 320.32C317.871 352.547 304.362 377.938 277.344 396.492C254.232 412.117 224.284 419.93 187.5 419.93C130.534 419.93 76.6602 404.793 25.8789 374.52C22.2982 372.241 18.8802 370.125 15.625 368.172L41.0156 310.555C80.0781 335.294 122.07 350.594 166.992 356.453C177.409 357.755 187.337 358.406 196.777 358.406C223.47 358.406 240.072 350.757 246.582 335.457C247.884 331.876 248.535 328.296 248.535 324.715C248.535 317.228 233.561 309.904 203.613 302.742C198.079 301.44 189.128 299.487 176.758 296.883C120.443 284.513 81.0547 272.306 58.5938 260.262C26.0417 242.684 9.60286 220.385 9.27734 193.367C9.27734 161.141 22.7865 133.146 49.8047 109.383C81.7057 81.388 124.512 67.3906 178.223 67.3906C241.048 67.3906 301.27 82.6901 358.887 113.289C362.793 115.568 366.536 117.684 370.117 119.637L345.215 177.742C300.618 152.677 253.255 137.052 203.125 130.867C191.081 129.565 179.688 128.914 168.945 128.914Z"
                    stroke={colors[theme].primaryColor}
                    fill={fillColor}/>
                <motion.path
                    variants={pathVariantsTwo}
                    strokeWidth={strokeWidth}
                    d="M508 419.93L444.035 413.582L456.73 158.211L520.695 164.559L508 419.93ZM583.684 128.426C533.228 128.426 481.796 140.633 429.387 165.047C421.574 168.628 414.25 172.371 407.414 176.277L382.023 119.148C437.362 87.2474 496.607 69.9948 559.758 67.3906C564.641 67.0651 569.361 66.9023 573.918 66.9023C639.022 66.9023 686.874 85.457 717.473 122.566C735.702 145.027 744.816 170.418 744.816 198.738C744.816 233.895 731.633 263.842 705.266 288.582C677.271 314.624 641.138 327.645 596.867 327.645C567.57 327.319 540.389 317.391 515.324 297.859L544.133 242.195C559.758 257.169 576.848 264.656 595.402 264.656C627.629 264.656 652.206 253.751 669.133 231.941C678.573 219.897 683.293 207.039 683.293 193.367C683.293 170.255 671.249 152.84 647.16 141.121C630.233 132.658 609.074 128.426 583.684 128.426Z"
                    stroke={colors[theme].primaryColor}
                    fill={fillColor}/>
                <motion.path
                    variants={pathVariantsThree}
                    strokeWidth={strokeWidth}
                    d="M1138.63 382.82L1091.76 428.23L939.902 298.836L934.531 439.461L870.566 433.113L877.891 246.102L784.629 167L831.016 122.078L880.82 165.047L885.215 68.3672L949.18 75.2031L943.32 217.293L1138.63 382.82ZM1074.18 66.4141L1118.12 113.289L1010.21 226.082L965.781 179.207L1074.18 66.4141Z"
                    stroke={colors[theme].primaryColor}
                    fill={fillColor}/>
            </motion.svg>
        </AnimatePresence>

    )
}

