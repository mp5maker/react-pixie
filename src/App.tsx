/* Third Party */
import { AnimatePresence } from 'framer-motion';
import { createBrowserHistory } from 'history';
import React from 'react';
import { GlobalHotKeys } from 'react-hotkeys';
import { useTranslation } from 'react-i18next';
import { Route, Router, Switch } from 'react-router';
import { AppContext } from 'AppContext';
import { AudioPlayer } from 'Components/Anime/ThreeJS/AudioPlayer';
import { Footer } from 'Components/Footer';
import { HotKeysHelp } from 'Components/HotKeysHelp';
import { LanguagePicker } from 'Components/LanguagePicker';
import { Loader } from 'Components/Loader';
import { MusicCredit } from 'Components/MusicCredit';
import { Navigation } from 'Components/Navigation';
import { ScreenCapture } from 'Components/ScreenCapture';
import { SettingsSlider } from 'Components/SettingsSlider';
import { ShowKeyCombo } from 'Components/ShowKeyCombo';
import { SocialPicker } from 'Components/SocialPicker';
import { ThemePicker } from 'Components/ThemePicker';
import { Tour } from 'Components/Tour';
import { VolumeControl } from 'Components/VolumeControl';
import { Colors } from 'Constants/Colors';
import { HotKeyMap } from 'Constants/HotKeyMap';
import * as Routes from 'Constants/Routes';
import { BN, DARK, EN, LANGUAGE, LIGHT, THEME } from 'Constants/Settings';
import { useColors } from 'Hooks/UseColors';
import { MusicContext } from 'MusicContext';
import { SettingsContext } from 'SettingsContext';
import { SPK } from 'Svg/SPK';
import { StorageGet, StorageSet } from 'Utilities/Storage';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';

/* Performance Optimizing Imports */
const PagesHome = React.lazy(() =>
  import('Pages').then(({ Home }) => ({ default: Home })),
);
const PagesExperience = React.lazy(() =>
  import('Pages').then(({ Experience }) => ({ default: Experience })),
);
const PagesPhysics = React.lazy(() =>
  import('Pages').then(({ Physics }) => ({ default: Physics })),
);
const PagesError = React.lazy(() =>
  import('Pages').then(({ Error }) => ({ default: Error })),
);
const PagesSkybox = React.lazy(() =>
  import('Pages').then(({ Skybox }) => ({ default: Skybox })),
);
const PagesBird = React.lazy(() =>
  import('Pages').then(({ Bird }) => ({ default: Bird })),
);
const PagesRain = React.lazy(() =>
  import('Pages').then(({ Rain }) => ({ default: Rain })),
);

export const history = createBrowserHistory();

const listenToRouteChange = ({ hash, key, pathname, search, state }: any) => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'auto',
  });
};

export const App = () => {
  const [theme, setTheme] = React.useState(DARK);
  const [settings, setSettings] = React.useState({
    rotationX: 30,
    rotationY: 30,
    rotationZ: 0,
    acceleration: 1,
    fire: false,
    settingsList: [
      'rotationX',
      'rotationY',
      'rotationZ',
      'acceleration',
      'fire',
    ],
    allowSwipeNavigation: true,
    bloom: false,
  });
  const [musicSettings, setMusicSettings] = React.useState({
    isPlaying: false,
    frequency: 1,
  });
  const [isLoading, setLoading] = React.useState(true);
  const { t, i18n } = useTranslation();
  useColors({ theme });

  React.useEffect(() => {
    const onSuccess = ([currentTheme, currentLanguage]: any) => {
      /* Theme Set */
      if (currentTheme == LIGHT || currentTheme == DARK) setTheme(currentTheme);
      else StorageSet({ key: THEME, value: theme });

      /* Language Set */
      if (currentLanguage == EN || currentLanguage == BN)
        i18n.changeLanguage(currentLanguage);
      else StorageSet({ key: LANGUAGE, value: EN });

      /* Set Loading */
      setLoading(false);
    };

    Promise.all([
      StorageGet({ key: THEME }),
      StorageGet({ key: LANGUAGE }),
    ]).then(onSuccess);
  }, []);

  React.useEffect(() => {
    const unlistenHistory = history.listen(listenToRouteChange);
    return () => unlistenHistory();
  }, []);

  const themePickerMemo = React.useMemo(() => {
    return <ThemePicker t={t} />;
  }, []);

  const audioPlayerMemo = React.useMemo(() => {
    return <AudioPlayer />;
  }, []);

  const themeDependentMemo = React.useMemo(() => {
    return (
      <>
        <ShowKeyCombo />
        <Footer />
      </>
    );
  }, []);

  const musicCreditMemo = React.useMemo(() => {
    return (
      <>
        <MusicCredit isPlaying={musicSettings.isPlaying} />
      </>
    );
  }, [musicSettings.isPlaying]);

  const settingsSliderMemo = React.useMemo(() => {
    return (
      <>
        <SettingsSlider list={settings.settingsList} />
      </>
    );
  }, [settings.settingsList]);

  const languagePickerMemo = React.useMemo(() => {
    return (
      <>
        <LanguagePicker />
      </>
    );
  }, []);

  const loaderMemo = React.useMemo(() => {
    return (
      <>
        <Loader
          colors={Colors}
          theme={theme}
          strokeWidth={15}
          height={23.5}
          width={50}
        />
      </>
    );
  }, [isLoading, theme]);

  const fallbackMemo = React.useMemo(() => {
    return (
      <>
        <div className="suspense-loading-container">
          <div>
            <SPK
              width={100}
              height={46.8}
              // @ts-ignore
              fillColor={Colors[theme].primaryColor}
              svgVariants={{}}
              pathVariantsOne={{
                initial: {
                  y: 0,
                },
                animate: {
                  y: [0, 25, 50, 75, 50, 25],
                  transition: {
                    y: {
                      duration: 2,
                      yoyo: Infinity,
                    },
                  },
                },
                exit: {},
              }}
              pathVariantsTwo={{
                initial: {
                  y: 25,
                },
                animate: {
                  y: [25, 50, 75, 50, 25, 0],
                  transition: {
                    y: {
                      duration: 2,
                      yoyo: Infinity,
                    },
                  },
                },
                exit: {},
              }}
              pathVariantsThree={{
                initial: {
                  y: 50,
                },
                animate: {
                  y: [50, 75, 50, 25, 0, 25],
                  transition: {
                    y: {
                      duration: 2,
                      yoyo: Infinity,
                    },
                  },
                },
                exit: {},
              }}
              colors={Colors}
              theme={theme}
            />
            <div>{t(`LOADING_PLEASE_WAIT`)}</div>
          </div>
        </div>
      </>
    );
  }, [theme, i18n.language]);

  return (
    <AppContext.Provider value={{ theme, setTheme }}>
      <SettingsContext.Provider value={{ setSettings, ...settings }}>
        <MusicContext.Provider value={{ setMusicSettings, ...musicSettings }}>
          {/* // @ts-ignore */}
          <GlobalHotKeys allowChanges={true} keyMap={HotKeyMap}>
            <Router history={history}>
              <main
                style={{
                  // @ts-ignore
                  backgroundColor: Colors[theme].backgroundColor,
                  // @ts-ignore
                  color: Colors[theme].primaryColor,
                }}
                className="container-fluid">
                <React.Suspense fallback={fallbackMemo}>
                  <Route
                    render={({ location }) => {
                      return (
                        <AnimatePresence exitBeforeEnter initial={false}>
                          <Switch location={location} key={location.pathname}>
                            <Route
                              exact
                              path={Routes.ROOT}
                              component={PagesHome}
                            />
                            <Route
                              exact
                              path={Routes.HOME}
                              component={PagesHome}
                            />
                            <Route
                              exact
                              path={Routes.EXPERIENCE}
                              component={PagesExperience}
                            />
                            <Route
                              exact
                              path={Routes.SKYBOX}
                              component={PagesSkybox}
                            />
                            <Route
                              exact
                              path={Routes.RAIN}
                              component={PagesRain}
                            />
                            <Route
                              exact
                              path={Routes.BIRD}
                              component={PagesBird}
                            />
                            <Route
                              exact
                              path={Routes.PHYSICS}
                              component={PagesPhysics}
                            />
                            <Route
                              path={Routes.OTHERS}
                              component={PagesError}
                            />
                          </Switch>
                        </AnimatePresence>
                      );
                    }}
                  />
                </React.Suspense>
              </main>
              {/* outside <main>: the 404 smooth scroll transforms main, which would drag fixed children */}
              <Navigation history={history} />
            </Router>
            <aside className="hud-panel hud-dock hud-dock-top">
              {languagePickerMemo}
              <SocialPicker />
              <div className="hud-dock-row">
                <ScreenCapture t={t} />
                <Tour t={t} />
              </div>
            </aside>
            <aside className="hud-panel hud-dock hud-dock-bottom">
              {audioPlayerMemo}
              <VolumeControl t={t} />
              {themePickerMemo}
            </aside>
            {settingsSliderMemo}
            {musicCreditMemo}
            {themeDependentMemo}
            {loaderMemo}
            <HotKeysHelp colors={Colors} theme={theme} />
            <div className="hud-hazard" aria-hidden="true" />
          </GlobalHotKeys>
        </MusicContext.Provider>
      </SettingsContext.Provider>
    </AppContext.Provider>
  );
};

export default App;
