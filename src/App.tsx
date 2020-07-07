/* Third Party */
import React from 'react';
import {
  Router,
  Route,
  Switch,
  Redirect
} from 'react-router'
import { createBrowserHistory } from 'history'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'

import { AppContext } from './AppContext'
import { SettingsContext } from './SettingsContext'
import { DARK, LIGHT, THEME, LANGUAGE, EN } from './Constants/Settings'
import * as Pages from './Pages'
import { Footer } from './Components/Footer'
import { ThemePicker } from './Components/ThemePicker'
import { LanguagePicker } from './Components/LanguagePicker'
import { Navigation } from './Components/Navigation'
import { SettingsSlider } from './Components/SettingsSlider'
import { Colors } from './Constants/Colors'
import { AudioPlayer } from './Components/Anime/ThreeJS/AudioPlayer'
import * as Routes from './Constants/Routes'
import { StorageGet, StorageSet } from './Utilities/Storage'

/* CSS */
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';


export const history = createBrowserHistory()

export const App = () => {
  const [theme, setTheme] = React.useState(DARK)
  const [settings, setSettings] = React.useState({
    rotationX: 30,
    rotationY: 30,
    rotationZ: 0,
    acceleration: 1,
    frequency: 1,
    isPlaying: false
  })
  const [isLoading, setLoading] = React.useState(true)
  const { t, i18n } = useTranslation()

  React.useEffect(() => {
    const onSuccess = ([currentTheme, currentLanguage]: any) => {
      /* Theme Set */
      if (currentTheme) setTheme(currentTheme)
      else StorageSet({ key: THEME, value: theme })

      /* Language Set */
      if (currentLanguage) i18n.changeLanguage(currentLanguage)
      else StorageSet({ key: LANGUAGE, value: EN })

      /* Set Loading */
      setLoading(false)
    }

    Promise.all([
      StorageGet({ key: THEME }),
      StorageGet({ key: LANGUAGE }),
    ]).then(onSuccess)
  }, [])

  return (
    <AppContext.Provider
      value={{ theme, setTheme }}>
      <SettingsContext.Provider
        value={{ setSettings, ...settings }}>
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
                      <Route exact path={Routes.RESUME} component={Pages.Resume} />
                      <Route exact path={Routes.SKYBOX} component={Pages.Skybox} />
                      <Route path={Routes.OTHERS} component={Pages.Error} />
                    </Switch>
                  </AnimatePresence>
                )
              }}
            />
            <Navigation history={history} />
          </Router>
        </div>
        <Footer
          colors={Colors}
          theme={theme} />
        <ThemePicker />
        <LanguagePicker history={history} />
        <SettingsSlider />
        <AudioPlayer />
      </SettingsContext.Provider>
    </AppContext.Provider>
  );
}

export default App;
