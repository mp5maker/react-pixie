import * as React from 'react'
import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom'
import get from 'lodash/get'

import * as Routes from '../../Constants/Routes'
import { Colors } from '../../Constants/Colors'
import { AppContext } from '../../AppContext'
import { Dog } from '../../Svg/Dog'
import { Book } from '../../Svg/Book'
import { Rain } from '../../Svg/Rain'
import { Bird } from '../../Svg/Bird'

import "./styles.scss"

export const Navigation = ({ history }: any) => {
    const { t, i18n } = useTranslation()
    const { theme }: any = React.useContext(AppContext)

    const list = [
        {
            label: t(`ABOUT_ME`),
            route: Routes.ROOT,
            key: `about-me`,
            Svg: Dog
        },
        {
            label: t(`EXPERIENCE`),
            route: Routes.EXPERIENCE,
            key: `experience`,
            Svg: Book
        },
        // {
        //     label: t(`SKYBOX`),
        //     route: Routes.SKYBOX,
        //      key: `skybox`
        // },
        {
            label: t(`RAIN`),
            route: Routes.RAIN,
            key: `rain`,
            Svg: Rain
        },
        {
            label: t(`BIRD`),
            route: Routes.BIRD,
            key: `bird`,
            Svg: Bird
        },
    ]

    return (
        <React.Fragment>
            <div className="navigation-container">
                <div className="navigation-content">
                    <ul className="navigation-list">
                        {
                            list.map((item, key) => {
                                const Svg = get(item, 'Svg', '')
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
                                            <span className={`mr-2`}>{ item.label }</span>
                                            {
                                                Svg ? (
                                                    <Svg
                                                        key={item.key}
                                                        width={40}
                                                        height={37.3}
                                                        colors={Colors}
                                                        theme={theme} />
                                                ) : <React.Fragment></React.Fragment>
                                            }
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