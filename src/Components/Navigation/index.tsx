import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import get from 'lodash/get';
import { GlobalHotKeys } from 'react-hotkeys';
import { Howl } from 'howler';

import { useCursor } from 'Hooks/UseCursor';
import { useSwipe } from 'Hooks/UseSwipe';
import { useMedia } from 'Hooks/UseMedia';
import * as Routes from 'Constants/Routes';
import { Colors } from 'Constants/Colors';
import { AppContext } from 'AppContext';
import { SettingsContext } from 'SettingsContext';
import { Dog } from 'Svg/Dog';
import { Book } from 'Svg/Book';
import { Rain } from 'Svg/Rain';
import { Bird } from 'Svg/Bird';
import { Cursor } from 'Svg/Cursor';

import './styles.scss';

const soundHover = new Howl({
  src: ['/Audio/button-hover.mp3'],
  preload: true,
  volume: 1,
});

const soundClick = new Howl({
  src: ['/Audio/button-click.mp3'],
  preload: true,
  volume: 1,
});

export const Navigation = ({ history }: any) => {
  const { t, i18n } = useTranslation();
  const { theme }: any = React.useContext(AppContext);
  const { allowSwipeNavigation }: any = React.useContext(SettingsContext);
  const isOnlyTouchDevice = useMedia({ query: `(pointer: coarse)` });
  const { verticalDirection, horizontalDirection, constants } = useSwipe({
    selector: 'body',
    allow: isOnlyTouchDevice && allowSwipeNavigation,
  });
  useCursor({
    selector: '.navigation-container',
    svg: Cursor({ colors: Colors, theme: theme, width: 50, height: 50 }),
  });
  useCursor({
    selector: '.navigation-container .navigation-item',
    svg: Cursor({ colors: Colors, theme: theme, width: 50, height: 50 }),
  });

  const list = [
    {
      label: t(`ABOUT_ME`),
      route: Routes.ROOT,
      key: `about-me`,
      Svg: Dog,
    },
    {
      label: t(`EXPERIENCE`),
      route: Routes.EXPERIENCE,
      key: `experience`,
      Svg: Book,
    },
    {
      label: t(`RAIN`),
      route: Routes.RAIN,
      key: `rain`,
      Svg: Rain,
    },
    {
      label: t(`BIRD`),
      route: Routes.BIRD,
      key: `bird`,
      Svg: Bird,
    },
  ];

  const currentIndex = React.useCallback(() => {
    const currentLocation = get(history, 'location.pathname', '');
    const findIndex = list.findIndex(item => {
      return currentLocation == get(item, 'route', '');
    });
    return findIndex;
  }, [history]);

  const isValidRoute = React.useCallback(() => {
    const currentLocation = get(history, 'location.pathname', '');
    const find = list.find(item => item.route == currentLocation);
    return find ? true : false;
  }, [history]);

  const navigationUp = React.useCallback(() => {
    if (isValidRoute()) {
      const presentIndex = currentIndex();
      if (presentIndex == 0) {
        const presentRouteIndex = list[list.length - 1];
        if (presentRouteIndex) history.push(presentRouteIndex.route);
      } else {
        const presentRouteIndex = list[presentIndex - 1];
        if (presentRouteIndex) history.push(presentRouteIndex.route);
      }
    }
  }, [history]);

  const navigationDown = React.useCallback(() => {
    if (isValidRoute()) {
      const presentIndex = currentIndex();
      if (presentIndex == list.length - 1) history.push(list[0].route);
      else history.push(list[presentIndex + 1].route);
    }
  }, [history]);

  const navigationRight = React.useCallback(() => {
    const currentLocation = get(history, 'location.pathname', '');
    if (currentLocation == Routes.SKYBOX || currentLocation == Routes.PHYSICS)
      history.goBack();
    else history.push(Routes.SKYBOX);
  }, [history]);

  const navigationLeft = React.useCallback(() => {
    const currentLocation = get(history, 'location.pathname', '');
    if (currentLocation == Routes.PHYSICS || currentLocation == Routes.SKYBOX)
      history.goBack();
    else history.push(Routes.PHYSICS);
  }, [history]);

  React.useEffect(() => {
    if (verticalDirection == constants.VERTICAL_DIRECTION_UP) navigationDown();
    if (verticalDirection == constants.VERTICAL_DIRECTION_DOWN) navigationUp();
  }, [verticalDirection]);

  React.useEffect(() => {
    if (horizontalDirection == constants.HORIZONTAL_DIRECTION_LEFT)
      navigationLeft();
    if (horizontalDirection == constants.HORIZONTAL_DIRECTION_RIGHT)
      navigationRight();
  }, [horizontalDirection]);

  const handlers = {
    NAVIGATE_ROUTE_UP: () => navigationUp(),
    NAVIGATE_ROUTE_DOWN: () => navigationDown(),
    NAVIGATE_TO_PHYSICS: () => navigationLeft(),
    NAVIGATE_TO_SKYBOX: () => navigationRight(),
  };

  return (
    <React.Fragment>
      <GlobalHotKeys allowChanges={true} handlers={handlers}>
        <div className="navigation-container">
          <div className="navigation-content">
            <div className="navigation-circle"></div>
            <ul className="navigation-list">
              {list.map((item, key) => {
                const Svg = get(item, 'Svg', '');
                return (
                  <React.Fragment key={key}>
                    <li className="navigation-item">
                      <NavLink
                        onMouseEnter={() => {
                          soundHover.stop();
                          soundHover.play();
                        }}
                        onClick={() => {
                          soundClick.stop();
                          soundClick.play();
                        }}
                        className={`navigation-item`}
                        exact
                        to={item.route}
                        activeClassName={`active`}
                        style={{
                          // @ts-ignore
                          color: Colors[theme].backgroundColor,
                        }}
                        activeStyle={{
                          fontWeight: 'bold',
                          // @ts-ignore
                          color: Colors[theme].primaryColor,
                        }}>
                        <span className={`mr-2`}>{item.label}</span>
                        {Svg ? (
                          <Svg
                            svgKey={item.key}
                            width={40}
                            height={37.3}
                            colors={Colors}
                            theme={theme}
                          />
                        ) : (
                          <React.Fragment></React.Fragment>
                        )}
                      </NavLink>
                    </li>
                  </React.Fragment>
                );
              })}
            </ul>
          </div>
        </div>
      </GlobalHotKeys>
    </React.Fragment>
  );
};
