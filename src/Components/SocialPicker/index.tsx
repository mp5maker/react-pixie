import * as React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons"

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
                        <iframe
                            style={{
                                width: `100%`,
                                height: `500px`
                            }}
                            name="github"
                            src="https://github.com/mp5maker"
                            title="Github Link" />
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
                        <iframe
                            style={{
                                width: `100%`,
                                height: `500px`
                            }}
                            name="linkedin"
                            src="https://www.linkedin.com/in/shabuktaginkhan/"
                            title="Linkedin Link" />
                    </Drawer>
                </div>
            </div>
        </>
    )
}