import * as React from 'react';
import Joyride, { STATUS, ACTIONS } from 'react-joyride';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBus,
  faArrowUp,
  faArrowDown,
} from '@fortawesome/free-solid-svg-icons';

import { ButtonRadial } from 'Components/Button/Radial';
import { useMedia } from 'Hooks/UseMedia';
import './styles.scss';

const buttonVariants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.1,
    },
  },
  exit: {
    opacity: 0,
  },
};

/* square HUD skin; tooltip fill comes from .hud-panel so the chamfer shows */
const joyrideStyles = {
  options: {
    arrowColor: 'var(--line)',
    overlayColor: 'rgba(7, 4, 15, 0.72)',
    primaryColor: 'var(--cyan)',
    spotlightShadow: 'none',
    textColor: 'var(--text)',
    zIndex: 1000,
  },
  tooltip: {
    backgroundColor: 'transparent',
    borderRadius: 0,
    fontFamily: 'var(--font-mono)',
    fontSize: 15,
    padding: 20,
  },
  tooltipContainer: { textAlign: 'left' as const },
  tooltipContent: { padding: '4px 24px 0 0' },
  buttonNext: {
    borderRadius: 0,
    color: 'var(--background-color)',
    fontFamily: 'var(--font-mono)',
    fontSize: 13,
    letterSpacing: '0.08em',
    textTransform: 'uppercase' as const,
    padding: '10px 14px',
  },
  buttonBack: {
    fontFamily: 'var(--font-mono)',
    fontSize: 13,
    letterSpacing: '0.08em',
    textTransform: 'uppercase' as const,
  },
  spotlight: { borderRadius: 0 },
  beaconInner: { borderRadius: 0 },
  beaconOuter: {
    borderRadius: 0,
    backgroundColor: 'transparent',
    border: '2px solid var(--cyan)',
  },
};

export const Tour = ({ t, getHelpers = () => {} }: any) => {
  const [tour, setTour] = React.useState(false);
  const isMediaGreaterThan767 = useMedia({ query: '(min-width: 767px)' });

  const joyRideCallback = React.useCallback(
    ({
      action,
      controlled,
      index,
      lifecycle,
      size,
      status,
      step,
      type,
    }: any) => {
      if (action == ACTIONS.CLOSE) setTour(false);
      if (status == STATUS.FINISHED) setTour(false);
    },
    [tour],
  );

  const step = (target: string, content: React.ReactNode) => ({
    target,
    content: <div className={`tour-step`}>{content}</div>,
  });

  const navigationStep = step(
    '.navigation-container',
    <>
      <div>
        {t(`NAVIGATE_USING`)}&nbsp;
        <kbd>
          <FontAwesomeIcon icon={faArrowUp} />
        </kbd>
        &nbsp;
        <kbd>
          <FontAwesomeIcon icon={faArrowDown} />
        </kbd>
      </div>
      <div>{t(`OR_SWIPE_FOR_TOUCH_DEVICES`)}</div>
      <div className={`tour-step-note`}>
        {t(`3`)} {t(`MORE_ROUTES_TO_EXPLORE`)}
      </div>
    </>,
  );
  const languageStep = step(
    '.language-picker-container',
    t(`CHANGE_LANGUAGE`),
  );
  const socialStep = step(
    '.social-picker-container',
    t(`GO_TO_MY_SOCIAL_WEBSITES`),
  );
  const volumeStep = step(
    '.volume-control-container',
    t(`TOGGLES_NAVIGATION_SOUND_ONLY`),
  );
  const hotKeysStep = step(
    '.hot-keys-help-container',
    t(`SHOWS_ALL_THE_KEYBOARD_SHORTCUTS`),
  );
  const audioStep = step(
    '.audio-player-container',
    t(`ENVIRONMENT_REACTS_TO_IT`),
  );
  const themeStep = step('.theme-picker-container', t(`CHOOSE_YOUR_THEME`));

  const steps = [
    navigationStep,
    languageStep,
    socialStep,
    volumeStep,
    hotKeysStep,
    audioStep,
    themeStep,
  ];

  return (
    <React.Fragment>
      {isMediaGreaterThan767 && (
        <div className="tour-container">
          <ButtonRadial
            variants={buttonVariants}
            initial={`initial`}
            animate={`animate`}
            exit={`exit`}
            key={`resume-audio`}
            title={t(`GUIDE_USER`)}
            onClick={() => {
              if (!tour) setTour(true);
            }}>
            <FontAwesomeIcon icon={faBus} />
          </ButtonRadial>
          <Joyride
            spotlightClicks={true}
            disableCloseOnEsc={true}
            callback={joyRideCallback}
            getHelpers={getHelpers}
            run={tour}
            locale={{
              back: t(`BACK`),
              close: t(`CLOSE`),
              last: t(`LAST`),
              next: t(`NEXT`),
              skip: t(`SKIP`),
            }}
            // showSkipButton={true}
            showProgress={true}
            continuous={true}
            disableScrolling={true}
            steps={steps}
            styles={joyrideStyles}
          />
        </div>
      )}
    </React.Fragment>
  );
};
