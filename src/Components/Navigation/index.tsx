import * as React from 'react'
import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom'

import * as Routes from '../../Constants/Routes'
import { Colors } from '../../Constants/Colors'
import { AppContext } from '../../AppContext'

import "./styles.scss"

export const Navigation = ({ history }: any) => {
    const { t, i18n } = useTranslation()
    const { theme }: any = React.useContext(AppContext)

    const list = [
        {
            label: t(`HOME`),
            route: Routes.ROOT
        },
        {
            label: t(`EXPERIENCE`),
            route: Routes.EXPERIENCE
        },
        // {
        //     label: t(`SKYBOX`),
        //     route: Routes.SKYBOX
        // },
        {
            label: t(`RAIN`),
            route: Routes.RAIN
        },
    ]

    return (
        <React.Fragment>
            <div className="navigation-container">
                <div className="navigation-content">
                    <ul className="navigation-list">
                        {
                            list.map((item, key) => {
                                return (
                                    <React.Fragment key={key}>
                                        <NavLink
                                            className={`navigation-item`}
                                            exact
                                            to={item.route}
                                            activeClassName={`active`}
                                            style={{
                                                // @ts-ignore
                                                color: Colors[theme].secondaryColor
                                            }}
                                            activeStyle={{
                                                fontWeight: "bold",
                                                // @ts-ignore
                                                color: Colors[theme].primaryColor
                                            }}>
                                            { item.label }
                                        </NavLink>
                                    </React.Fragment>

                                )
                            })
                        }
                    </ul>
                </div>
            </div>
        </React.Fragment>
    )
}