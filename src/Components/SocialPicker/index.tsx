import * as React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faLinkedin, faWeebly } from "@fortawesome/free-brands-svg-icons"
import { faTimes } from "@fortawesome/free-solid-svg-icons"

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
                        {
                            ({ toggleDrawer }: any) => {
                                return (
                                    <a
                                        style={{
                                            color: colors[theme].primaryColor
                                        }}
                                        href="https://github.com/mp5maker"
                                        target="_blank">
                                        {
                                            theme == LIGHT && (
                                                <img
                                                    style={{
                                                        width: `100%`,
                                                        maxWidth: `1900px`,
                                                    }}
                                                    src="/Socials/github-light.png" />
                                            )
                                        }
                                        {
                                            theme == DARK && (
                                                <img
                                                    style={{
                                                        width: `100%`,
                                                        maxWidth: `1900px`,
                                                    }}
                                                    src="/Socials/github-dark.png" />
                                            )
                                        }
                                        <div className={`times-container`}>
                                            <div className={`times-container`}>
                                                <button
                                                    onClick={(event) => {
                                                        event.preventDefault();
                                                        toggleDrawer(false)
                                                    }}>
                                                    <FontAwesomeIcon icon={faTimes} />
                                                </button>
                                            </div>
                                        </div>
                                    </a>
                                )
                            }
                        }
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
                        {
                            ({ toggleDrawer }: any) => {
                                return (
                                    <a
                                        style={{
                                            color: colors[theme].primaryColor
                                        }}
                                        href="https://www.linkedin.com/in/shabuktaginkhan/"
                                        target="_blank">
                                        {
                                            theme == LIGHT && (
                                                <img
                                                    style={{
                                                        width: `100%`,
                                                        maxWidth: `740px`,
                                                    }}
                                                    src="/Socials/linked-light.png" />
                                            )
                                        }
                                        {
                                            theme == DARK && (
                                                <img
                                                    style={{
                                                        width: `100%`,
                                                        maxWidth: `740px`,
                                                    }}
                                                    src="/Socials/linked-dark.png" />
                                            )
                                        }
                                        <div className={`times-container`}>
                                            <button
                                                onClick={(event) => {
                                                    event.preventDefault();
                                                    toggleDrawer(false)
                                                }}>
                                                <FontAwesomeIcon icon={faTimes} />
                                            </button>
                                        </div>
                                    </a>
                                )
                            }
                        }
                    </Drawer>
                </div>
                <div className="social-picker-content mt-3">
                    <Drawer
                        colors={colors}
                        theme={theme}
                        drawerVariants={drawerVariants}
                        direction={`bottom`}
                        buttonShape={`round`}
                        buttonDisplay={(
                            <FontAwesomeIcon icon={faWeebly} />
                        )}>
                        {
                            ({ toggleDrawer }: any) => {
                                return (
                                    <a
                                        style={{
                                            color: colors[theme].primaryColor
                                        }}
                                        href="https://photonkhan.weebly.com/"
                                        target="_blank">
                                        <iframe
                                            style={{
                                                height: `100vh`,
                                                width: `100%`
                                            }}
                                            src={`https://photonkhan.weebly.com/`} />
                                        <div className={`times-container`}>
                                            <div className={`times-container`}>
                                                <button
                                                    onClick={(event) => {
                                                        event.preventDefault();
                                                        toggleDrawer(false)
                                                    }}>
                                                    <FontAwesomeIcon icon={faTimes} />
                                                </button>
                                            </div>
                                        </div>
                                    </a>
                                )
                            }
                        }
                    </Drawer>
                </div>
            </div>
        </>
    )
}