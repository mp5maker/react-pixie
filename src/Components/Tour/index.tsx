import * as React from 'react'
import Joyride from 'react-joyride'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBus, faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons'
import { Emoji } from 'Components/Emoji'

import { ButtonRadial } from 'Components/Button/Radial'
import { useMedia } from 'Hooks/UseMedia'
import "./styles.scss"

const buttonVariants = {
    initial: {
        opacity: 0,
    },
    animate: {
        opacity: 1,
        transition: {
            duration: 0.1
        }
    },
    exit: {
        opacity: 0,
    }
}

export const Tour = ({ t }: any) => {
    const [ tour, setTour ] = React.useState(false)
    const isMediaGreaterThan767 = useMedia({ query: "(min-width: 767px)" })

    const joyRideCallback = React.useCallback(({ action, controlled, index, lifecycle, size, status, step, type }: any) => {
        if (status == 'finished') setTour(false)
    }, [tour])

    const navigationStep = {
        target: '.navigation-container',
        content: (
            <React.Fragment>
                <div className={`text-left`}>
                    <div>
                        <span>
                            Navigate using &nbsp;
                            </span>
                        <span>
                            <Emoji emoji={`🖱️`} /> ? &nbsp;
                            </span>
                        <span>
                            <Emoji
                                emoji={`😴`} />
                        </span>
                    </div>
                    <div>
                        <div>
                            <span>
                                Instead, you can use arrow keys &nbsp;
                            </span>
                            <kbd>
                                <FontAwesomeIcon icon={faArrowUp} />
                            </kbd>
                            &nbsp;
                            <kbd>
                                <FontAwesomeIcon icon={faArrowDown} />
                            </kbd>
                        </div>
                        <div>
                            or swipe for touch devices
                        </div>
                    </div>
                    <div className={`mt-3`}>
                        <span className={`help-block`}>
                            <small>
                                Let me tell you another secret, there are <strong>3</strong> more routes to explore
                                </small>
                        </span>
                    </div>
                </div>
            </React.Fragment>

        ),
    }

    const languageStep = {
        target: '.language-picker-container',
        content: (
            <React.Fragment>
                <div className={`text-left`}>
                    <div>
                        <span>
                            Change language! &nbsp;
                            </span>
                        <span>
                            <Emoji emoji={`🌐`} />
                        </span>
                    </div>
                </div>
            </React.Fragment>
        ),
    }

    const socialStep = {
        target: '.social-picker-container',
        content: (
            <React.Fragment>
                <div className={`text-left`}>
                    <div>
                        Go to my other social Sites
                        </div>
                    <div>
                        <span>
                            Don't forget to comeback! &nbsp;
                            </span>
                        <span>
                            <Emoji emoji={`😭`} />
                        </span>
                    </div>
                </div>
            </React.Fragment>
        ),
    }

    const volumeStep = {
        target: '.volume-control-container',
        content: (
            <React.Fragment>
                <div className={`text-left`}>
                    <div>
                        <span>
                            It turns on/off the overall navigation sound not the song player below! &nbsp;
                            </span>
                        <span>
                            <Emoji emoji={`🔊`} />
                        </span>

                    </div>
                </div>
            </React.Fragment>
        ),
    }

    const hotKeysStep = {
        target: '.hot-keys-help-container',
        content: (
            <React.Fragment>
                <div className={`text-left`}>
                    <div>
                        <span>
                            Shows all the keyboard shortcuts &nbsp;
                            </span>
                        <span>
                            <Emoji emoji={`⌨️`} />
                        </span>
                    </div>
                </div>
            </React.Fragment>
        ),
    }

    const audioStep = {
        target: '.audio-player-container',
        content: (
            <React.Fragment>
                <div className={`text-left`}>
                    <div>
                        <span>
                            Plays the audio &nbsp;
                                <span>
                                <Emoji emoji={`🎶`} />
                            </span>
                        </span>
                    </div>
                    <div>
                        Environment reacts to it
                        </div>
                    <div>
                        <span>
                            If you look closely into it! &nbsp;
                            </span>
                        <span>
                            <Emoji emoji={`😉`} />
                        </span>
                    </div>
                </div>
            </React.Fragment>
        ),
    }

    const themeStep = {
        target: '.theme-picker-container',
        content: (
            <React.Fragment>
                <div className={`text-left`}>
                    <div>
                        <span>
                            Choose your theme &nbsp;
                            </span>
                        <span>
                            <Emoji emoji={`☀️`} /> &nbsp;
                            </span>
                        <span>
                            or &nbsp;
                            </span>
                        <span>
                            <Emoji emoji={`🌙`} /> &nbsp;
                        </span>
                    </div>
                </div>
            </React.Fragment>
        ),
    }

    const steps = [
        navigationStep,
        languageStep,
        socialStep,
        volumeStep,
        hotKeysStep,
        audioStep,
        themeStep,
    ]

    return (
        <React.Fragment>
            {
                isMediaGreaterThan767 && (
                    <div className="tour-container">
                        <ButtonRadial
                            variants={buttonVariants}
                            initial={`initial`}
                            animate={`animate`}
                            exit={`exit`}
                            key={`resume-audio`}
                            title={t(`GUIDE_USER`)}
                            // @ts-ignore
                            locale={{
                                back: t('BACK'),
                                close: t('CLOSE'),
                                last: t('LAST'),
                                next: t('NEXT'),
                                skip: t('SKIP'),
                            }}
                            onClick={() => {
                                if (!tour) setTour(true)
                            }}>
                            <FontAwesomeIcon icon={faBus} />
                        </ButtonRadial>
                        {
                            tour && (
                                <Joyride
                                    disableCloseOnEsc={true}
                                    callback={joyRideCallback}
                                    showProgress={true}
                                    continuous={true}
                                    disableScrolling={true}
                                    steps={steps} />
                            )
                        }
                    </div>
                )
            }
        </React.Fragment>
    )
}