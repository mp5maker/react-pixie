import * as React from 'react'
import { useTranslation } from 'react-i18next'

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
                <div className="grid">
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
                </div>
            </Drawer>
        </div>
    )
}