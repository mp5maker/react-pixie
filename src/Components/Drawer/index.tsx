import * as React from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import * as ReactDOM from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSortUp } from '@fortawesome/free-solid-svg-icons'
import { GlobalHotKeys } from 'react-hotkeys';

import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

import './styles.scss'

export const Drawer = ({
    colors,
    theme,
    drawerVariants,
    children,
    direction = 'top',
    buttonDisplay,
    buttonsShape = '',
    hotKeyHandler = ''
}: any) => {
    const [show, setShow] = React.useState(false)
    const drawer: any = React.useRef(document.getElementById('drawer')).current

    const toggleDrawer = (status: boolean) => (event: any) => {
        if (event.type == 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) return;
        if (status) {
            document.body.style.position = 'fixed';
            document.body.style.top = `-${window.scrollY}px`;
        } else {
            document.body.style.position = '';
            document.body.style.top = ``;
        }
        setShow(status)
    }

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
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
            className={`${direction} drawer-container`}
            role="presentation">
            <div className="drawer-content">
                <List>
                    {
                        children ? children({
                            toggleDrawer
                        }) : children
                    }
                    <ListItem
                        className={`d-flex justify-content-center`}
                        button>
                        <FontAwesomeIcon icon={faSortUp} />
                    </ListItem>
                </List>
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
            <Button
                style={{
                    backgroundColor: colors[theme].backgroundColor,
                    color: colors[theme].primaryColor,
                }}
                onClick={toggleDrawer(true)}>
                { buttonDisplay }
            </Button>
            {
                ReactDOM.createPortal(
                    AnimatedContent,
                    drawer
                )
            }
        </>
    )

    const handlers: any = hotKeyHandler ? {
        [hotKeyHandler]: () => setShow(true),
    } : {}

    return hotKeyHandler ? (
        <GlobalHotKeys
            handlers={handlers}>
            { content }
        </GlobalHotKeys>
    ) : content
}