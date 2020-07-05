/* Third Party */
import React from 'react';
import {
  Router,
  Route,
  Switch
} from 'react-router'
import { createBrowserHistory } from 'history'
import { motion, AnimatePresence } from 'framer-motion'

import { AppContext } from './AppContext'
import { DARK, LIGHT } from './Constants/Settings'
import * as Pages from './Pages'
import { Footer } from './Components/Footer'
import { ThemePicker } from './Components/ThemePicker'
import { Colors } from './Constants/Colors'
import * as Routes from './Constants/Routes'

/* CSS */
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';


export const history = createBrowserHistory()

export const App = () => {
  const [theme, setTheme] = React.useState(DARK)


  return (
    <AppContext.Provider
      value={{ theme, setTheme }}>
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
                    <Route exact path={Routes.ROOT} component={Pages.Home} />
                    <Route exact path={Routes.RESUME} component={Pages.Resume} />
                    <Route exact path={Routes.SKYBOX} component={Pages.Skybox} />
                  </Switch>
                </AnimatePresence>
              )
            }}
          />
        </Router>
      </div>
      <Footer
        colors={Colors}
        theme={theme} />
      <ThemePicker />
    </AppContext.Provider>
  );
}

export default App;
