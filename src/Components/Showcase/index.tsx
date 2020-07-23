import * as React from 'react'
import { useTranslation } from 'react-i18next'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

import { LIGHT, DARK } from '../../Constants/Settings'
import { Drawer } from '../Drawer'
import "./styles.scss"

const drawerVariants = {
    initial: {
        opacity: 0,
        x: -9999
    },
    animate: {
        opacity: 0.9,
        x: 0,
        transition: {
            duration: 0.4
        }
    },
    exit: {
        x: -9999,
        opacity: 0
    }
}

export const Showcase = ({ colors, theme }: any) => {
    const { t, i18n } = useTranslation()

    const memoCard = React.useMemo(() => {
        return (
            <div>
                {
                    theme == LIGHT && (
                        <img src="/Showcase/card-light.png" />
                    )
                }
                {
                    theme == DARK && (
                        <img src="/Showcase/card-dark.png" />
                    )
                }
            </div>
        )
    }, [theme])

    const memoComparisonSlider = React.useMemo(() => {
        return (
            <div>
                {
                    theme == LIGHT && (
                        <img src="/Showcase/comparison-light.png" />
                    )
                }
                {
                    theme == DARK && (
                        <img src="/Showcase/comparison-dark.png" />
                    )
                }
            </div>
        )
    }, [theme])

    const memoSteppers = React.useMemo(() => {
        return (
            <div>
                {
                    theme == LIGHT && (
                        <img src="/Showcase/steppers-light.png" />
                    )
                }
                {
                    theme == DARK && (
                        <img src="/Showcase/steppers-dark.png" />
                    )
                }
            </div>
        )
    }, [theme])

    const memoDate = React.useMemo(() => {
        return (
            <div>
                {
                    theme == LIGHT && (
                        <img src="/Showcase/date-light.png" />
                    )
                }
                {
                    theme == DARK && (
                        <img src="/Showcase/date-dark.png" />
                    )
                }
            </div>
        )
    }, [theme])

    const memoForm = React.useMemo(() => {
        return (
            <div>
                {
                    theme == LIGHT && (
                        <img src="/Showcase/form-light.png" />
                    )
                }
                {
                    theme == DARK && (
                        <img src="/Showcase/form-dark.png" />
                    )
                }
            </div>
        )
    }, [theme])

    const memoHighlightButton = React.useMemo(() => {
        return (
            <div>
                {
                    theme == LIGHT && (
                        <img src="/Showcase/highlight-button-light.png" />
                    )
                }
                {
                    theme == DARK && (
                        <img src="/Showcase/highlight-button-dark.png" />
                    )
                }
            </div>
        )
    }, [theme])

    const memoChip = React.useMemo(() => {
        return (
            <div>
                {
                    theme == LIGHT && (
                        <img src="/Showcase/chip-light.png" />
                    )
                }
                {
                    theme == DARK && (
                        <img src="/Showcase/chip-dark.png" />
                    )
                }
            </div>
        )
    }, [theme])

    const memoTimeline = React.useMemo(() => {
        return (
            <div>
                {
                    theme == LIGHT && (
                        <img src="/Showcase/timeline-light.png" />
                    )
                }
                {
                    theme == DARK && (
                        <img src="/Showcase/timeline-dark.png" />
                    )
                }
            </div>
        )
    }, [theme])

    const memoImageGrid = React.useMemo(() => {
        return (
            <div>
                {
                    theme == LIGHT && (
                        <img src="/Showcase/image-grid-light.png" />
                    )
                }
                {
                    theme == DARK && (
                        <img src="/Showcase/image-grid-dark.png" />
                    )
                }
            </div>
        )
    }, [theme])

    return (
        <div
            style={{ color: colors[theme].primaryColor }}
            className="showcase-container">
            <Drawer
                colors={colors}
                theme={theme}
                drawerVariants={drawerVariants}
                direction={`left`}
                buttonDisplay={t(`SHOW_CASE`)}>
                {
                    ({ toggleDrawer }: any) => {
                        return (
                            <React.Fragment>
                                <div className="grid">
                                    { memoCard }
                                    { memoComparisonSlider }
                                    { memoSteppers }
                                    { memoDate }
                                    { memoForm }
                                    { memoHighlightButton }
                                    { memoChip }
                                    { memoTimeline }
                                    { memoImageGrid }
                                </div>
                                <div className={`times-container`}>
                                    <button
                                        onClick={(event) => {
                                            event.preventDefault();
                                            toggleDrawer(false)
                                        }}>
                                        <FontAwesomeIcon icon={faTimes} />
                                    </button>
                                </div>
                            </React.Fragment>
                        )
                    }
                }
            </Drawer>
        </div>
    )
}