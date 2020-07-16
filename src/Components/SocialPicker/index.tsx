import * as React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons"

import { DARK, LIGHT } from '../../Constants/Settings'
import { Drawer } from '../Drawer'
import './styles.scss'

const drawerVariants = {
    initial: {
        opacity: 0,
        y: 9999
    },
    animate: {
        opacity: 0.9,
        y: 0,
        transition: {
            duration: 0.4
        }
    },
    exit: {
        y: 9999,
        opacity: 0
    }
}

export const SocialPicker = ({ colors, theme }: any) => {
    return (
        <>
            <div className="social-picker-container">
                <div className="social-picker-content">
                    <Drawer
                        colors={colors}
                        theme={theme}
                        drawerVariants={drawerVariants}
                        direction={`bottom`}
                        buttonShape={`round`}
                        buttonDisplay={(
                            <FontAwesomeIcon icon={faGithub} />
                        )}>
                        <a
                            style={{
                                color: colors[theme].primaryColor
                            }}
                            href="https://github.com/mp5maker"
                            target="_blank">
                            {
                                theme == LIGHT && (
                                    <img src="/Socials/github-light.png" />
                                )
                            }
                            {
                                theme == DARK && (
                                    <img src="/Socials/github-dark.png" />
                                )
                            }
                        </a>
                    </Drawer>
                    <Drawer
                        colors={colors}
                        theme={theme}
                        drawerVariants={drawerVariants}
                        direction={`bottom`}
                        buttonShape={`round`}
                        buttonDisplay={(
                            <FontAwesomeIcon icon={faLinkedin} />
                        )}>
                        <a
                            style={{
                                color: colors[theme].primaryColor
                            }}
                            href="https://www.linkedin.com/in/shabuktaginkhan/"
                            target="_blank">
                            {
                                theme == LIGHT && (
                                    <img src="/Socials/linked-light.png" />
                                )
                            }
                            {
                                theme == DARK && (
                                    <img src="/Socials/linked-dark.png" />
                                )
                            }
                        </a>
                    </Drawer>
                </div>
            </div>
        </>
    )
}