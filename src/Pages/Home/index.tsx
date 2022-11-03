import * as React from 'react';
import { motion } from 'framer-motion';

import { Colors } from 'Constants/Colors';
import { PageTransition } from 'Constants/PageTransition';
import { AppContext } from 'AppContext';
import { SettingsContext } from 'SettingsContext';
import { AnimeThreeJSHome } from 'Components/Anime/ThreeJS/Pages/Home';
import { MyNameSvg } from 'Components/MyNameSvg';
import { MouseDetector } from 'Components/MouseDetector';
import { useDocument } from 'Hooks/UseDocument';

export const Home = ({ history, location, match }: any) => {
  const { theme } = React.useContext(AppContext);
  const { setSettings, ...settings }: any = React.useContext(SettingsContext);
  useDocument({
    options: [{ selector: 'title', value: `Photon's Portfolio: About Me` }],
  });

  React.useEffect(() => {
    setSettings({
      ...settings,
      settingsList: ['rotationX', 'rotationY', 'rotationZ', 'acceleration'],
    });
  }, []);

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
      className="pages-home-container">
      <div className="row">
        <div className="col p-0">
          <AnimeThreeJSHome history={history} theme={theme} colors={Colors} />
        </div>
      </div>
      <MyNameSvg colors={Colors} theme={theme} />
      <MouseDetector width={50} height={71.3} colors={Colors} theme={theme} />
    </motion.div>
  );
};

export default Home;
