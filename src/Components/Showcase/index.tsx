import * as React from 'react'
import { useTranslation } from 'react-i18next'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilRuler } from '@fortawesome/free-solid-svg-icons'

import { LIGHT, DARK } from 'Constants/Settings'
import { Drawer } from 'Components/Drawer'
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
                        <img src="/Showcase/card-light.png" alt={`card-light`} />
                    )
                }
                {
                    theme == DARK && (
                        <img src="/Showcase/card-dark.png" alt={`card-dark`} />
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
                        <img src="/Showcase/comparison-light.png" alt={`comparison-light`} />
                    )
                }
                {
                    theme == DARK && (
                        <img src="/Showcase/comparison-dark.png" alt={`comparison-dark`} />
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
                        <img src="/Showcase/steppers-light.png" alt={`steppers-light`}/>
                    )
                }
                {
                    theme == DARK && (
                        <img src="/Showcase/steppers-dark.png" alt={`steppers-dark`}/>
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
                        <img src="/Showcase/date-light.png" alt={`date-light`} />
                    )
                }
                {
                    theme == DARK && (
                        <img src="/Showcase/date-dark.png" alt={`date-dark`} />
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
                        <img src="/Showcase/form-light.png" alt={`form-light`} />
                    )
                }
                {
                    theme == DARK && (
                        <img src="/Showcase/form-dark.png" alt={`form-dark`} />
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
                        <img src="/Showcase/highlight-button-light.png" alt={`highlight-button-light`}/>
                    )
                }
                {
                    theme == DARK && (
                        <img src="/Showcase/highlight-button-dark.png" alt={`highlight-button-dark`} />
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
                        <img src="/Showcase/chip-light.png" alt={`chip-light`}/>
                    )
                }
                {
                    theme == DARK && (
                        <img src="/Showcase/chip-dark.png" alt={`card-dark`}/>
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
                        <img src="/Showcase/timeline-light.png" alt={`timeline-light`}/>
                    )
                }
                {
                    theme == DARK && (
                        <img src="/Showcase/timeline-dark.png" alt={`timeline-dark`}/>
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
                        <img src="/Showcase/image-grid-light.png" alt={`image-grid-light`} />
                    )
                }
                {
                    theme == DARK && (
                        <img src="/Showcase/image-grid-dark.png" alt={`image-grid-dark`}/>
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
                buttonShape={`round`}
                direction={`left`}
                buttonDisplay={(
                    <FontAwesomeIcon icon={faPencilRuler} />
                )}>
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
                            </React.Fragment>
                        )
                    }
                }
            </Drawer>
        </div>
    )
}