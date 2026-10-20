import { faKeyboard } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import get from 'lodash/get';
import * as React from 'react';
import { getApplicationKeyMap } from 'react-hotkeys';
import { useTranslation } from 'react-i18next';

import { Drawer } from 'Components/Drawer';
import { useDimension } from 'Hooks/UseDimension';
import './styles.scss';

const drawerVariants = {
  initial: {
    opacity: 0,
    y: -16,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.2,
      ease: [0.23, 1, 0.32, 1],
    },
  },
  exit: {
    y: -16,
    opacity: 0,
    transition: {
      duration: 0.15,
    },
  },
};

export const HotKeysHelp = ({ colors, theme }: any) => {
  const { t } = useTranslation();
  const keyMap = getApplicationKeyMap();
  const { width } = useDimension();
  const isWidthGreaterThan767 = width > 767;

  const memoPreparedTable = React.useMemo(() => {
    const listOfKeys = Object.keys(keyMap);

    const groupByObject =
      Array.isArray(listOfKeys) && listOfKeys.length > 0
        ? listOfKeys.reduce((groupObj: any, item: string) => {
            const group = get(keyMap[item], 'group', '');
            return {
              ...groupObj,
              [group]: [
                ...(groupObj[group] ? groupObj[group] : []),
                keyMap[item],
              ],
            };
          }, {})
        : {};

    const preparedTable =
      Array.isArray(listOfKeys) && listOfKeys.length > 0 ? (
        <React.Fragment>
          <table>
            <thead>
              <tr>
                <th className={`text-left`}>{t(`NAME`)}</th>
                <th className={`text-right`}>{t(`SHORTCUTS`)}</th>
              </tr>
            </thead>
            {Object.keys(groupByObject).map((groupItem, groupIndex) => {
              return (
                <React.Fragment key={groupIndex}>
                  <tbody className={`group-item`}>
                    <tr>
                      <td colSpan={2} className={`group-header-item`}>
                        {t(groupItem)}
                      </td>
                    </tr>
                    {groupByObject[groupItem].map(
                      (item: any, index: number) => {
                        const name = get(item, 'name', '');
                        const { sequence } = get(item, 'sequences', [])[0];
                        return (
                          <React.Fragment key={index}>
                            <tr>
                              <td className={`text-left`}>{t(name)}</td>
                              <td className={`text-right`}>
                                <kbd>{sequence}</kbd>
                              </td>
                            </tr>
                          </React.Fragment>
                        );
                      },
                    )}
                  </tbody>
                </React.Fragment>
              );
            })}
          </table>
        </React.Fragment>
      ) : (
        <React.Fragment></React.Fragment>
      );

    return preparedTable;
  }, [keyMap]);

  return isWidthGreaterThan767 ? (
    <React.Fragment>
      <div className="hot-keys-help-container">
        <Drawer
          colors={colors}
          theme={theme}
          drawerVariants={drawerVariants}
          direction={`top`}
          buttonShape={`round`}
          hotKeyHandler={`TOGGLE_HELP`}
          openButtonTitle={t(`OPEN_KEYBOARD_SHORTCUT_DRAWER`)}
          closeButtonTitle={t(`CLOSE_KEYBOARD_SHORTCUT_DRAWER`)}
          buttonDisplay={<FontAwesomeIcon icon={faKeyboard} />}>
          {({ toggleDrawer }: any) => {
            return (
              <div className={`hot-keys-help-section`}>
                <div>
                  <h2 className={`hud-rail`}>{t(`SHORTCUTS`)}</h2>
                  {memoPreparedTable}
                </div>
              </div>
            );
          }}
        </Drawer>
      </div>
    </React.Fragment>
  ) : (
    <React.Fragment></React.Fragment>
  );
};
