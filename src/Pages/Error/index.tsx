import * as React from 'react';
import { motion } from 'framer-motion';

import { Colors } from 'Constants/Colors';
import { PageTransition } from 'Constants/PageTransition';
import { AppContext } from 'AppContext';
import { SettingsContext } from 'SettingsContext';
import { AnimeThreeJSError } from 'Components/Anime/ThreeJS/Pages/Error';
import { ZombieGame } from 'Components/Anime/ThreeJS/ZombieGame';
import { ErrorMessage } from 'Components/ErrorMessage';
import { useDocument } from 'Hooks/UseDocument';
import { useSmoothScroll } from 'Hooks/UseSmoothScroll';

export const Error = ({ history, location, match }: any) => {
  const { theme } = React.useContext(AppContext);
  const { setSettings, ...settings }: any = React.useContext(SettingsContext);
  useDocument({
    options: [
      { selector: 'title', value: `Photon's Portfolio: Page Do Not Exist` },
    ],
  });
  useSmoothScroll({});
  React.useEffect(() => {
    setSettings({
      ...settings,
      settingsList: ['acceleration'],
    });
  }, []);

  const zombieGameMemo = React.useMemo(() => {
    return <ZombieGame history={history} theme={theme} colors={Colors} />;
  }, [history, theme]);

  return (
    <motion.div
      variants={PageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
      style={{
        height: `100%`,
        // @ts-ignore
        backgroundColor: Colors[theme].backgroundColor,
      }}
      className="pages-error-container">
      <div className="row">
        <div className="col p-0">
          <AnimeThreeJSError history={history} theme={theme} colors={Colors} />
          <ErrorMessage />
        </div>
      </div>
      <div className="row">
        <div className="col p-0">{zombieGameMemo}</div>
      </div>
    </motion.div>
  );
};

export default Error;
