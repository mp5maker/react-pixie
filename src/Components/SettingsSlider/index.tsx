import * as React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';
import { GlobalHotKeys } from 'react-hotkeys';

import Slider from '@material-ui/core/Slider';
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { Colors } from 'Constants/Colors';
import { AppContext } from 'AppContext';
import { SettingsContext } from 'SettingsContext';
import { MusicContext } from 'MusicContext';
import { useMedia } from 'Hooks/UseMedia';

import './styles.scss';

const settingsSliderVariant = {
  initial: {
    x: 500,
  },
  animate: {
    x: 0,
    transition: {
      duration: 0.1,
    },
  },
  exit: {
    x: 500,
    duration: 0.1,
  },
};

export const SettingsSlider = ({
  onChange,
  list = [
    'rotationX',
    'rotationY',
    'rotationZ',
    'acceleration',
    'fire',
    'bloom',
  ],
}: any) => {
  const [show, setShow] = React.useState(false);
  const { theme }: any = React.useContext(AppContext);
  const { t, i18n } = useTranslation();
  const {
    rotationX,
    rotationY,
    rotationZ,
    acceleration,
    setSettings,
    fire,
    bloom,
    ...otherSettings
  }: any = React.useContext(SettingsContext);
  const { isPlaying }: any = React.useContext(MusicContext);
  const isWidthGreaterThan771px = useMedia({ query: '(min-width: 771px)' });

  const onSettingsChange = ({ newValue, name }: any) => {
    const params = {
      ...otherSettings,
      rotationX,
      rotationY,
      rotationZ,
      acceleration,
      fire,
      bloom,
      [name]: newValue,
    };
    setSettings(params);
    if (onChange) onChange(params);
  };

  const handlers = {
    OPEN_SETTINGS: () => setShow(true),
    CLOSE_SETTINGS: () => setShow(false),
  };

  const sliderStyle = {
    // @ts-ignore
    color: Colors[theme].primaryColor,
  };

  const content = (
    <div className={`settings-slider-container ${!isPlaying ? `active` : ``}`}>
      <AnimatePresence initial={false} exitBeforeEnter>
        {!show ? (
          <motion.button
            variants={settingsSliderVariant}
            initial="initial"
            animate="animate"
            exit="exit"
            aria-label={`Slider Open`}
            className={`settings-slider-open-button`}
            onClick={() => setShow(true)}
            whileHover={{ scale: 0.98 }}
            whileTap={{ scale: 0.98 }}
            title={t(`OPEN_SETTINGS_SLIDER`)}
            key={`click-me`}>
            <FontAwesomeIcon icon={faAngleLeft} />
          </motion.button>
        ) : (
          <motion.div
            className={`slider-container`}
            variants={settingsSliderVariant}
            initial="initial"
            animate="animate"
            exit="exit"
            key={`i-am-open`}>
            {list.includes('rotationX') && (
              <motion.div>
                <Grid container spacing={2} alignItems="center">
                  <Grid item style={sliderStyle} className={`width-150`}>
                    {t(`ROTATION_X`)}
                  </Grid>
                  <Grid item xs>
                    <Slider
                      step={1}
                      min={1}
                      max={100}
                      style={sliderStyle}
                      onChange={(event, newValue) =>
                        onSettingsChange({ newValue, name: `rotationX` })
                      }
                      value={rotationX}
                    />
                  </Grid>
                </Grid>
              </motion.div>
            )}
            {list.includes('rotationY') && (
              <motion.div>
                <Grid container spacing={2} alignItems="center">
                  <Grid item style={sliderStyle} className={`width-150`}>
                    {t(`ROTATION_Y`)}
                  </Grid>
                  <Grid item xs>
                    <Slider
                      step={1}
                      min={1}
                      max={100}
                      style={sliderStyle}
                      onChange={(event, newValue) =>
                        onSettingsChange({ newValue, name: `rotationY` })
                      }
                      value={rotationY}
                    />
                  </Grid>
                </Grid>
              </motion.div>
            )}
            {list.includes('rotationZ') && (
              <motion.div>
                <Grid container spacing={2} alignItems="center">
                  <Grid item style={sliderStyle} className={`width-150`}>
                    {t(`ROTATION_Z`)}
                  </Grid>
                  <Grid item xs>
                    <Slider
                      step={1}
                      min={1}
                      max={100}
                      style={sliderStyle}
                      onChange={(event, newValue) =>
                        onSettingsChange({ newValue, name: `rotationZ` })
                      }
                      value={rotationZ}
                    />
                  </Grid>
                </Grid>
              </motion.div>
            )}
            {list.includes('acceleration') && (
              <motion.div>
                <Grid container spacing={2} alignItems="center">
                  <Grid item style={sliderStyle} className={`width-150`}>
                    {t(`ACCELERATION`)}
                  </Grid>
                  <Grid item xs>
                    <Slider
                      step={1}
                      min={1}
                      max={100}
                      style={sliderStyle}
                      onChange={(event, newValue) =>
                        onSettingsChange({ newValue, name: `acceleration` })
                      }
                      value={acceleration}
                    />
                  </Grid>
                </Grid>
              </motion.div>
            )}
            {list.includes('fire') && (
              <motion.div>
                <Typography component="div">
                  <Grid
                    component="label"
                    container
                    alignItems="center"
                    spacing={1}
                    className={`fire-switch`}>
                    <Grid item style={sliderStyle} className={`width-150`}>
                      <strong>{t(`FIRE`)}</strong>
                    </Grid>
                    <Grid item>
                      <Switch
                        style={{
                          // @ts-ignore
                          color: Colors[theme].primaryColor,
                        }}
                        checked={fire}
                        defaultValue={fire}
                        onChange={event =>
                          onSettingsChange({
                            newValue: event.target.checked,
                            name: event.target.name,
                          })
                        }
                        name="fire"
                        inputProps={{ 'aria-label': 'Fire On' }}
                      />
                    </Grid>
                  </Grid>
                </Typography>
              </motion.div>
            )}
            {list.includes('bloom') && (
              <motion.div>
                <Typography component="div">
                  <Grid
                    component="label"
                    container
                    alignItems="center"
                    spacing={1}
                    className={`bloom-switch`}>
                    <Grid item style={sliderStyle} className={`width-150`}>
                      <strong>{t(`BLOOM`)}</strong>
                    </Grid>
                    <Grid item>
                      <Switch
                        style={{
                          // @ts-ignore
                          color: Colors[theme].primaryColor,
                        }}
                        checked={bloom}
                        defaultValue={bloom}
                        onChange={event =>
                          onSettingsChange({
                            newValue: event.target.checked,
                            name: event.target.name,
                          })
                        }
                        name="bloom"
                        inputProps={{ 'aria-label': 'Bloom On' }}
                      />
                    </Grid>
                  </Grid>
                </Typography>
              </motion.div>
            )}
            <motion.div className={`button-container`}>
              <motion.button
                title={t(`CLOSE_SETTINGS_SLIDER`)}
                aria-label={`Button Close`}
                onClick={() => setShow(false)}
                className={`button`}>
                <FontAwesomeIcon icon={faAngleRight} />
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  return (
    <>
      <GlobalHotKeys handlers={handlers}>
        {Array.isArray(list) &&
          list.length > 0 &&
          isWidthGreaterThan771px &&
          content}
      </GlobalHotKeys>
    </>
  );
};
