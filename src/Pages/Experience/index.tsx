import { motion } from 'framer-motion';
import * as React from 'react';

import { AppContext } from 'AppContext';
import { AnimeThreeJSExperience } from 'Components/Anime/ThreeJS/Pages/Experience';
import { MouseDetector } from 'Components/MouseDetector';
import { Colors } from 'Constants/Colors';
import { PageTransition } from 'Constants/PageTransition';
import { useDocument } from 'Hooks/UseDocument';
import { SettingsContext } from 'SettingsContext';

export const Experience = ({ history, location, match }: any) => {
  const { theme }: any = React.useContext(AppContext);
  const { setSettings, ...settings }: any = React.useContext(SettingsContext);
  useDocument({
    options: [{ selector: 'title', value: `Photon's Portfolio: Experience` }],
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
      className="pages-experience-container">
      <div className="row">
        <div className="col p-0">
          <AnimeThreeJSExperience
            history={history}
            colors={Colors}
            theme={theme}
          />
        </div>
      </div>
      <MouseDetector width={50} height={71.3} colors={Colors} theme={theme} />
    </motion.div>
  );
};

export default Experience;
