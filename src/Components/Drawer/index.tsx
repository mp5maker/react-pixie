import * as React from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import * as ReactDOM from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSortUp, faTimes } from '@fortawesome/free-solid-svg-icons'
import { GlobalHotKeys } from 'react-hotkeys';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

import { SettingsContext } from '../../SettingsContext'
import { ButtonRadial } from '../Button/Radial'
import { ButtonSquare } from '../Button/Square'

import './styles.scss'

const BUTTON_SHAPE_SQUARE = 'square'
const BUTTON_SHAPE_ROUND = 'round'

export const Drawer = ({
    colors,
    theme,
    drawerVariants,
    children,
    direction = 'top',
    buttonDisplay,
    buttonShape = BUTTON_SHAPE_ROUND,
    hotKeyHandler = '',
    allowSortUp = true
}: any) => {
    const { setSettings, ...otherSettings }: any = React.useContext(SettingsContext)
    const [show, setShow] = React.useState(false)
    const drawer: any = React.useRef(document.getElementById('drawer')).current

    const toggleDrawer = React.useCallback((status: boolean) => (event: any) => {
        if (event.type == 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) return;
        if (status) {
            document.body.style.position = 'fixed';
            document.body.style.top = `-${window.scrollY}px`;
        } else {
            document.body.style.position = '';
            document.body.style.top = ``;
        }
        setSettings({ ...otherSettings, allowSwipeNavigation: !status })
        setShow(status)
    }, [status])

    const Content = (
        <motion.div
            key={`I am open`}
            variants={drawerVariants}
            initial={`initial`}
            animate={`animate`}
            exit={`exit`}
            style={{
                color: colors[theme].primaryColor,
                backgroundColor: colors[theme].backgroundColor
            }}
            className={`${direction} drawer-container`}
            role="presentation">
            <div className="drawer-content">
                <List>
                    {
                        children ? children({
                            toggleDrawer
                        }) : children
                    }
                    {
                        allowSortUp && (
                            <ListItem
                                onClick={toggleDrawer(false)}
                                className={`d-flex justify-content-center alternate-close`}
                                button>
                                <FontAwesomeIcon icon={faSortUp} />
                            </ListItem>
                        )
                    }
                </List>
                <div className={`times-container`}>
                    <ButtonRadial
                        onClick={toggleDrawer(false)}>
                        <FontAwesomeIcon icon={faTimes} />
                    </ButtonRadial>
                </div>
            </div>
        </motion.div>
    )

    const AnimatedContent = (
        <AnimatePresence
            exitBeforeEnter
            initial={false}>
            {show && Content}
        </AnimatePresence>
    )

    const content = (
        <>
            {
                buttonShape == BUTTON_SHAPE_ROUND ? (
                    <ButtonRadial
                        style={{
                            backgroundColor: colors[theme].backgroundColor,
                            color: colors[theme].primaryColor,
                        }}
                        onClick={toggleDrawer(true)}>
                        {buttonDisplay}
                    </ButtonRadial>
                ) : (
                    <ButtonSquare
                        style={{
                            backgroundColor: colors[theme].backgroundColor,
                            color: colors[theme].primaryColor,
                        }}
                        onClick={toggleDrawer(true)}>
                        { buttonDisplay }
                    </ButtonSquare>
                )
            }
            {
                ReactDOM.createPortal(
                    AnimatedContent,
                    drawer
                )
            }
        </>
    )

    const toggleDrawerDisplay = React.useCallback(() => {
        setShow(!show)
        setSettings({ ...otherSettings, allowSwipeNavigation: show })
    }, [show])

    const handlers: any = hotKeyHandler ? {
        [hotKeyHandler]: () => toggleDrawerDisplay(),
    } : {}

    return hotKeyHandler ? (
        <GlobalHotKeys
            allowChanges={true}
            handlers={handlers}>
            { content }
        </GlobalHotKeys>
    ) : content
}