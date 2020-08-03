import * as React from 'react'
import { motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeadphones } from '@fortawesome/free-solid-svg-icons'

import './styles.scss'

const musicCreditVariants = {
    initial: {
        opacity: 0,
        x: -1000,
    },
    animate: {
        opacity: 1,
        x: 25,
        transition: {
            duration: 0.25,
            ease: `easeInOut`
        }
    },
    exit: {
        opacity: 0,
        x: -1000
    }
}

export const MusicCredit = ({ isPlaying, colors, theme }: any) => {
    const [show, setShow] = React.useState(isPlaying)

    React.useEffect(() => {
        if (isPlaying !== show) setShow(isPlaying)
    }, [isPlaying])

    const content = React.useMemo(() => {
        return show ? (
            <motion.div
                style={{
                    backgroundColor: colors[theme].backgroundColor,
                    color: colors[theme].primaryColor,
                }}
                variants={musicCreditVariants}
                initial={`initial`}
                animate={`animate`}
                exit={`exit`}
                key={`music-credit`}
                className={`music-credit-container`}>
                <motion.div>
                    <span className={`mr-1`}>
                        <FontAwesomeIcon
                            size={`sm`}
                            icon={faHeadphones} />
                    </span>
                    <span>
                        <a
                            target="__blank"
                            href="https://youtu.be/YnmOmNqBWtM">
                            Spektrum & Sara Skinner - Keep You
                        </a>
                    </span>
                </motion.div>
                <motion.div>
                    Music provided by NoCopyrightSounds.
                </motion.div>
                <motion.div>
                    <a
                        target="__blank"
                        href="https://youtu.be/YnmOmNqBWtM">
                        https://youtu.be/YnmOmNqBWtM
                    </a>
                </motion.div>
                <motion.div>
                    <a
                        target="__blank"
                        href="http://ncs.io/KeepYou">
                        http://ncs.io/KeepYou
                    </a>
                </motion.div>
            </motion.div>
        ) : <React.Fragment key={`none`}></React.Fragment>
    }, [show, theme])

    return (
        <>
            { content }
        </>
    )
}