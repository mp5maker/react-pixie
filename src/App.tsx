/* Third Party */
import React from 'react';
import {
  Router,
  Route,
  Switch,
  Redirect
} from 'react-router'
import { createBrowserHistory } from 'history'
import { AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { GlobalHotKeys } from 'react-hotkeys'

import { AppContext } from 'AppContext'
import { SettingsContext } from 'SettingsContext'
import { MusicContext } from 'MusicContext'
import { DARK, LIGHT, THEME, LANGUAGE, EN, BN } from 'Constants/Settings'
import * as Pages from 'Pages'
import { Footer } from 'Components/Footer'
import { ThemePicker } from 'Components/ThemePicker'
import { LanguagePicker } from 'Components/LanguagePicker'
import { Navigation } from 'Components/Navigation'
import { SettingsSlider } from 'Components/SettingsSlider'
import { MusicCredit } from 'Components/MusicCredit'
import { SocialPicker } from 'Components/SocialPicker'
import { Colors } from 'Constants/Colors'
import { AudioPlayer } from 'Components/Anime/ThreeJS/AudioPlayer'
import * as Routes from 'Constants/Routes'
import { HotKeyMap } from 'Constants/HotKeyMap'
import { StorageGet, StorageSet } from 'Utilities/Storage'
import { useColors } from 'Hooks/UseColors'
import { HotKeysHelp } from 'Components/HotKeysHelp'
import { ShowKeyCombo } from 'Components/ShowKeyCombo'
import { Loader } from 'Components/Loader'
import { ScreenCapture } from 'Components/ScreenCapture'

/* CSS */
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';


export const history = createBrowserHistory()

const listenToRouteChange = ({ hash, key, pathname, search, state }: any) => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'auto'
  })
}

export const App = () => {
  const [theme, setTheme] = React.useState(DARK)
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
  })
  const [musicSettings, setMusicSettings] = React.useState({ isPlaying: false, frequency: 1 })
  const [isLoading, setLoading] = React.useState(true)
  const { t, i18n } = useTranslation()
  useColors({ theme })

  React.useEffect(() => {
    const onSuccess = ([currentTheme, currentLanguage]: any) => {
      /* Theme Set */
      if (currentTheme == LIGHT || currentTheme == DARK) setTheme(currentTheme)
      else StorageSet({ key: THEME, value: theme })

      /* Language Set */
      if (currentLanguage == EN || currentLanguage == BN) i18n.changeLanguage(currentLanguage)
      else StorageSet({ key: LANGUAGE, value: EN })

      /* Set Loading */
      setLoading(false)
    }

    Promise.all([
      StorageGet({ key: THEME }),
      StorageGet({ key: LANGUAGE }),
    ]).then(onSuccess)
  }, [])

  React.useEffect(() => {
    const unlistenHistory = history.listen(listenToRouteChange)
    return () => unlistenHistory()
  }, [])

  const themePickerMemo = React.useMemo(() => {
    return (
      <ThemePicker />
    )
  }, [])

  const audioPlayerMemo = React.useMemo(() => {
    return (
      <AudioPlayer />
    )
  }, [])

  const themeDependentMemo = React.useMemo(() => {
    return (
      <>
        <SocialPicker
          colors={Colors}
          theme={theme} />
        <ShowKeyCombo
          colors={Colors}
          theme={theme} />
        <Footer
          colors={Colors}
          theme={theme} />
      </>
    )
  }, [theme])

  const musicCreditMemo = React.useMemo(() => {
    return (
      <>
        <MusicCredit
          isPlaying={musicSettings.isPlaying}
          theme={theme}
          colors={Colors} />
      </>
    )
  }, [musicSettings.isPlaying, theme])

  const settingsSliderMemo = React.useMemo(() => {
    return (
      <>
        <SettingsSlider
          list={settings.settingsList} />
      </>
    )
  }, [settings.settingsList])

  const languagePickerMemo = React.useMemo(() => {
    return (
      <>
        <LanguagePicker />
      </>
    )
  }, [])

  const loaderMemo = React.useMemo(() => {
    return (
      <>
        <Loader
          colors={Colors}
          theme={theme}
          strokeWidth={15}
          height={23.5}
          width={50} />
      </>
    )
  }, [isLoading, theme])

  return (
    <AppContext.Provider
      value={{ theme, setTheme }}>
      <SettingsContext.Provider
        value={{ setSettings, ...settings }}>
        <MusicContext.Provider
          value={{ setMusicSettings, ...musicSettings }}>
          {/* // @ts-ignore */}
          <GlobalHotKeys
            allowChanges={true}
            keyMap={HotKeyMap}>
            <div
              style={{
                // @ts-ignore
                backgroundColor: Colors[theme].backgroundColor,
                // @ts-ignore
                color: Colors[theme].primaryColor
              }}
              className="container-fluid">
              <Router history={history}>
                <Route
                  render={({ location }) => {
                    return (
                      <AnimatePresence exitBeforeEnter initial={false}>
                        <Switch location={location}  key={location.pathname}>
                          <Route exact path={Routes.ROOT} component={Pages.Home} />
                          <Route exact path={Routes.HOME} component={Pages.Home} />
                          <Route exact path={Routes.EXPERIENCE} component={Pages.Experience} />
                          <Route exact path={Routes.SKYBOX} component={Pages.Skybox} />
                          <Route exact path={Routes.RAIN} component={Pages.Rain} />
                          <Route exact path={Routes.BIRD} component={Pages.Bird} />
                          <Route exact path={Routes.PHYSICS} component={Pages.Physics} />
                          <Route path={Routes.OTHERS} component={Pages.Error} />
                        </Switch>
                      </AnimatePresence>
                    )
                  }}
                />
                <Navigation history={history} />
              </Router>
            </div>
            { themePickerMemo }
            { languagePickerMemo }
            { settingsSliderMemo }
            { audioPlayerMemo }
            { musicCreditMemo }
            { themeDependentMemo }
            { loaderMemo }
            <ScreenCapture />
            <HotKeysHelp
              colors={Colors}
              theme={theme} />
          </GlobalHotKeys>
        </MusicContext.Provider>
      </SettingsContext.Provider>
    </AppContext.Provider>
  );
}

export default App;
