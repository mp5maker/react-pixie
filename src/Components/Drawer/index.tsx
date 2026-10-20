import { faSortUp, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AnimatePresence, motion } from 'framer-motion';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { GlobalHotKeys } from 'react-hotkeys';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

import { ButtonRadial } from 'Components/Button/Radial';
import { ButtonSquare } from 'Components/Button/Square';
import { SettingsContext } from 'SettingsContext';

import './styles.scss';

const BUTTON_SHAPE_ROUND = 'round';

export const Drawer = ({
  drawerVariants,
  children,
  direction = 'top',
  buttonDisplay,
  buttonShape = BUTTON_SHAPE_ROUND,
  hotKeyHandler = '',
  allowSortUp = true,
  openButtonTitle = '',
  closeButtonTitle = '',
}: any) => {
  const { setSettings }: any = React.useContext(SettingsContext);
  const [show, setShow] = React.useState(false);
  const drawer: any = React.useRef(document.getElementById('drawer')).current;

  const toggleDrawer = React.useCallback(
    (status: boolean) => (event: any) => {
      if (
        event.type === 'keydown' &&
        (event.key === 'Tab' || event.key === 'Shift')
      )
        return;
      if (status) {
        document.body.style.position = 'fixed';
        document.body.style.top = `-${window.scrollY}px`;
      } else {
        const scrollY = -parseInt(document.body.style.top || '0', 10);
        document.body.style.position = '';
        document.body.style.top = ``;
        window.scrollTo(0, scrollY);
      }
      /* functional update: a closure copy of the settings would reset sliders */
      setSettings((settings: any) => ({
        ...settings,
        allowSwipeNavigation: !status,
      }));
      setShow(status);
    },
    [],
  );

  const Content = (
    <motion.div
      key={`I am open`}
      variants={drawerVariants}
      initial={`initial`}
      animate={`animate`}
      exit={`exit`}
      className={`${direction} drawer-container hud-panel`}
      role="presentation">
      <div className="drawer-content">
        <List>
          {children
            ? children({
                toggleDrawer,
              })
            : children}
          {allowSortUp && (
            <ListItem
              onClick={toggleDrawer(false)}
              className={`d-flex justify-content-center alternate-close`}
              button>
              <FontAwesomeIcon icon={faSortUp} />
            </ListItem>
          )}
        </List>
        <div className={`times-container`}>
          <ButtonRadial
            title={closeButtonTitle}
            ariaLabel={`Close`}
            onClick={toggleDrawer(false)}>
            <FontAwesomeIcon icon={faTimes} />
          </ButtonRadial>
        </div>
      </div>
    </motion.div>
  );

  const AnimatedContent = (
    <AnimatePresence exitBeforeEnter initial={false}>
      {show && Content}
    </AnimatePresence>
  );

  const content = (
    <>
      {buttonShape == BUTTON_SHAPE_ROUND ? (
        <ButtonRadial
          title={openButtonTitle}
          onClick={toggleDrawer(true)}>
          {buttonDisplay}
        </ButtonRadial>
      ) : (
        <ButtonSquare
          onClick={toggleDrawer(true)}>
          {buttonDisplay}
        </ButtonSquare>
      )}
      {ReactDOM.createPortal(AnimatedContent, drawer)}
    </>
  );

  const toggleDrawerDisplay = React.useCallback(
    () => toggleDrawer(!show)({ type: 'hotkey' }),
    [show],
  );

  const handlers: any = hotKeyHandler
    ? {
        [hotKeyHandler]: () => toggleDrawerDisplay(),
      }
    : {};

  return hotKeyHandler ? (
    <GlobalHotKeys allowChanges={true} handlers={handlers}>
      {content}
    </GlobalHotKeys>
  ) : (
    content
  );
};
