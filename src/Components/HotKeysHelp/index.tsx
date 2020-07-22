import * as React from 'react'
import { getApplicationKeyMap } from 'react-hotkeys'
import { useTranslation } from 'react-i18next'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faKeyboard, faTimes } from '@fortawesome/free-solid-svg-icons'
import get from 'lodash/get'

import { Drawer } from '../Drawer'
import { useDimension } from '../../Hooks/UseDimension'
import "./styles.scss"

const drawerVariants = {
    initial: {
        opacity: 0,
        y: -9999
    },
    animate: {
        opacity: 0.9,
        y: 0,
        transition: {
            duration: 0.4
        }
    },
    exit: {
        y: -9999,
        opacity: 0
    }
}

export const HotKeysHelp = ({ colors, theme }: any) => {
    const { t, i18n } = useTranslation()
    const keyMap = getApplicationKeyMap()
    const { width } = useDimension()
    const isWidthGreaterThan767 = width > 767
    const listOfKeys = Object.keys(keyMap)

    const groupByObject = Array.isArray(listOfKeys) && listOfKeys.length > 0 ? listOfKeys.reduce((groupObj: any, item: string) => {
        const group = get(keyMap[item], 'group', '')
        return {
            ...groupObj,
            [group]: [
                ...(groupObj[group] ? groupObj[group] : []),
                keyMap[item]
            ]
        }
    }, {}) : {}

    const preparedTable = Array.isArray(listOfKeys) && listOfKeys.length > 0 ? (
        <React.Fragment>
            <table>
                <thead>
                    <tr>
                        <th className={`text-left`}>
                            {t(`NAME`)}
                        </th>
                        <th className={`text-right`}>
                            {t(`SHORTCUTS`)}
                        </th>
                    </tr>
                </thead>
                {
                    Object.keys(groupByObject).map((groupItem, groupIndex) => {
                        return (
                            <React.Fragment key={groupIndex}>
                                <tbody className={`group-item`}>
                                    <tr>
                                        <td colSpan={2} className={`group-header-item`}>
                                            { t(groupItem) }
                                        </td>
                                    </tr>
                                    {
                                        groupByObject[groupItem].map((item: any, index: number) => {
                                            const name = get(item, 'name', '')
                                            const { sequence } = get(item, 'sequences', [])[0]
                                            return (
                                                <React.Fragment key={index}>
                                                    <tr>
                                                        <td className={`text-left`}>
                                                            { t(name) }
                                                        </td>
                                                        <td className={`text-right`}>
                                                            <kbd>
                                                                { sequence }
                                                            </kbd>
                                                        </td>
                                                    </tr>
                                                </React.Fragment>
                                            )
                                        })
                                    }
                                </tbody>
                            </React.Fragment>
                        )
                    })
                }
            </table>
        </React.Fragment>
    ) : <React.Fragment></React.Fragment>

    return isWidthGreaterThan767 ? (
        <React.Fragment>
            <div className="hot-keys-help-container">
                <Drawer
                    colors={colors}
                    theme={theme}
                    drawerVariants={drawerVariants}
                    direction={`top`}
                    buttonShape={`round`}
                    hotKeyHandler={`OPEN_HELP`}
                    buttonDisplay={(
                        <FontAwesomeIcon icon={faKeyboard} />
                    )}>
                    {
                        ({ toggleDrawer }: any) => {
                            return (
                                <div className={`hot-keys-help-section`}>
                                    <div>
                                        <header>
                                            <h6>
                                                {t(`LIST_OF_KEYBOARD_SHORTCUTS`) }
                                            </h6>
                                        </header>
                                        { preparedTable }
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
                                </div>
                            )
                        }
                    }
                </Drawer>
            </div>
        </React.Fragment>
    ) : <React.Fragment></React.Fragment>
}