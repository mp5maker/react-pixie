import * as React from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'

import { Colors } from '../../Constants/Colors'
import { AppContext } from '../../AppContext'
import { SettingsContext } from '../../SettingsContext'

import "./styles.scss"

const settingsSliderVariant = {
    initial: {
        x: 200,
    },
    animate: {
        x: 0,
        transition: {
            duration: 0.1
        }
    },
    exit: {
        x: 200,
        duration: 0.1
    }
}

export const SettingsSlider = ({ onChange }: any) => {
    const [show, setShow] = React.useState(false)
    const { theme }: any  = React.useContext(AppContext)
    const { rotationX, rotationY, rotationZ, acceleration, setSettings, isPlaying, ...otherSettings }: any  = React.useContext(SettingsContext)

    const onSettingsChange = (event: any) => {
        const params = {
            ...otherSettings,
            rotationX,
            rotationY,
            rotationZ,
            acceleration,
            [event.target.name]: parseInt(event.target.value)
        }
        setSettings(params)
        if (onChange) onChange(params)
    }

    const sliderStyle = {
        // @ts-ignore
        background: Colors[theme].primaryColor,
        '::WebkitSliderThumb': {
            // @ts-ignore
            backgroundColor: Colors[theme].backgroundColor
        },
        '::MozRangeThumb': {
            // @ts-ignore
            backgroundColor: Colors[theme].backgroundColor
        },
    }

    return !isPlaying ? (
        <>
            <div className={`settings-slider-container ${show ? `active` : ``}`}>
                <AnimatePresence initial={false} exitBeforeEnter>
                    {
                        !show ? (
                            <motion.button
                                variants={settingsSliderVariant}
                                initial="initial"
                                animate="animate"
                                exit="exit"
                                className={`settings-slider-open-button`}
                                onClick={() => setShow(true)}
                                whileHover={{ scale: 0.98 }}
                                whileTap={{ scale: 0.98 }}
                                style={{
                                    // @ts-ignore
                                    border: `1px solid ${Colors[theme].backgroundColor}`,
                                    // @ts-ignore
                                    backgroundColor: Colors[theme].primaryColor,
                                    // @ts-ignore
                                    color: Colors[theme].backgroundColor
                                }}
                                key={`click-me`}>
                                <FontAwesomeIcon icon={faAngleLeft} />
                            </motion.button>

                        ) : (
                            <motion.div
                                className={`slider-container`}
                                variants={settingsSliderVariant}
                                initial="initial"
                                animate="animate"
                                exit="exit"
                                key={`i-am-open`}>
                                <motion.div>
                                    <input
                                        style={sliderStyle}
                                        name="rotationX"
                                        type="range"
                                        min={1}
                                        max={100}
                                        onChange={onSettingsChange}
                                        value={rotationX}
                                        className={`slider`} />
                                </motion.div>
                                <motion.div>
                                    <input
                                        style={sliderStyle}
                                        name="rotationY"
                                        type="range"
                                        min={1}
                                        max={100}
                                        onChange={onSettingsChange}
                                        value={rotationY}
                                        className={`slider`} />
                                </motion.div>
                                <motion.div>
                                    <input
                                        style={sliderStyle}
                                        name="rotationZ"
                                        type="range"
                                        min={1}
                                        max={100}
                                        onChange={onSettingsChange}
                                        value={rotationZ}
                                        className={`slider`} />
                                </motion.div>
                                <motion.div>
                                    <input
                                        style={sliderStyle}
                                        name="acceleration"
                                        type="range"
                                        min={1}
                                        max={100}
                                        onChange={onSettingsChange}
                                        value={acceleration}
                                        className={`slider`} />
                                </motion.div>
                                <motion.div
                                    className={`button-container`}>
                                    <motion.button
                                        onClick={() => setShow(false)}
                                        className={`button`}
                                        style={{
                                            // @ts-ignore
                                            border: `1px solid ${Colors[theme].backgroundColor}`,
                                            // @ts-ignore
                                            backgroundColor: Colors[theme].primaryColor,
                                            // @ts-ignore
                                            color: Colors[theme].backgroundColor
                                        }}>
                                        <FontAwesomeIcon icon={faAngleRight} />
                                    </motion.button>
                                </motion.div>
                            </motion.div>
                        )
                    }
                </AnimatePresence>

            </div>
        </>
    ) : <></>
}