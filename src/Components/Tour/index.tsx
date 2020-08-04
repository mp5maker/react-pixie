import * as React from 'react'
import Joyride, { STATUS, ACTIONS } from 'react-joyride'
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

export const Tour = ({ t, getHelpers = () => {} }: any) => {
    const [ tour, setTour ] = React.useState(false)
    const isMediaGreaterThan767 = useMedia({ query: "(min-width: 767px)" })

    const joyRideCallback = React.useCallback(({
        action,
        controlled,
        index,
        lifecycle,
        size,
        status,
        step,
        type
    }: any) => {
        if (action == ACTIONS.CLOSE) setTour(false)
        if (status == STATUS.FINISHED) setTour(false)
    }, [tour])

    const navigationStep = {
        target: '.navigation-container',
        content: (
            <React.Fragment>
                <div className={`text-left`}>
                    <div>
                        <span>
                            { t(`NAVIGATE_USING`) } &nbsp;
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
                                {t(`INSTEAD_YOU_CAN_USE_KEYBOARD`) } &nbsp;
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
                            {t(`OR_SWIPE_FOR_TOUCH_DEVICES`) }
                        </div>
                    </div>
                    <div className={`mt-3`}>
                        <span className={`help-block`}>
                            <small>
                                { t(`LET_ME_TELL_YOU_A_SECRET`) } &nbsp;
                            </small>
                            <small>
                                <strong>{t(`3`)}</strong>
                            </small>
                            <small>
                                {t(`MORE_ROUTES_TO_EXPLORE`) }
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
                            {t(`CHANGE_LANGUAGE`) }! &nbsp;
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
                        {t(`GO_TO_MY_SOCIAL_WEBSITES`)}
                    </div>
                    <div>
                        <span>
                            {t(`DONT_FORGET_TO_COME_BACK`)}! &nbsp;
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
                            { t(`TOGGLES_NAVIGATION_SOUND_ONLY`) } ! &nbsp;
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
                            {t(`SHOWS_ALL_THE_KEYBOARD_SHORTCUTS`)} &nbsp;
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
                            { t(`PLAY_THE_AUDIO`) } &nbsp;
                        </span>
                        <span>
                            <Emoji emoji={`🎶`} />
                        </span>
                    </div>
                    <div>
                        { t(`ENVIRONMENT_REACTS_TO_IT`) }
                    </div>
                    <div>
                        <span>
                            { t(`IF_YOU_LOOK_CLOSELY_INTO_IT`)} &nbsp;
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
                            {t(`CHOOSE_YOUR_THEME`)} &nbsp;
                        </span>
                        <span>
                            <Emoji emoji={`☀️`} /> &nbsp;
                        </span>
                        <span>
                            {t(`OR`)} &nbsp;
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
                            onClick={() => {
                                if (!tour) setTour(true)
                            }}>
                            <FontAwesomeIcon icon={faBus} />
                        </ButtonRadial>
                        <Joyride
                            spotlightClicks={true}
                            disableCloseOnEsc={true}
                            callback={joyRideCallback}
                            getHelpers={getHelpers}
                            run={tour}
                            locale={{
                                back: t(`BACK`),
                                close: t(`CLOSE`),
                                last: t(`LAST`),
                                next: t(`NEXT`),
                                skip: t(`SKIP`),
                            }}
                            // showSkipButton={true}
                            showProgress={true}
                            continuous={true}
                            disableScrolling={true}
                            steps={steps} />
                    </div>
                )
            }
        </React.Fragment>
    )
}