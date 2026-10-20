import * as React from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeadphones } from '@fortawesome/free-solid-svg-icons';

import './styles.scss';

const musicCreditVariants = {
  initial: {
    opacity: 0,
    y: 16,
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
    opacity: 0,
    y: 16,
  },
};

export const MusicCredit = ({ isPlaying }: any) => {
  const [show, setShow] = React.useState(isPlaying);

  React.useEffect(() => {
    if (isPlaying !== show) setShow(isPlaying);
  }, [isPlaying]);

  const content = React.useMemo(() => {
    return show ? (
      <motion.div
        variants={musicCreditVariants}
        initial={`initial`}
        animate={`animate`}
        exit={`exit`}
        key={`music-credit`}
        className={`music-credit-container hud-panel`}>
        <motion.div>
          <span className={`mr-1`}>
            <FontAwesomeIcon size={`sm`} icon={faHeadphones} />
          </span>
          <span>
            <a target="_blank" rel="noopener noreferrer" href="https://youtu.be/YnmOmNqBWtM">
              Spektrum & Sara Skinner - Keep You
            </a>
          </span>
        </motion.div>
        <motion.div>Music provided by NoCopyrightSounds.</motion.div>
        <motion.div>
          <a target="_blank" rel="noopener noreferrer" href="https://youtu.be/YnmOmNqBWtM">
            https://youtu.be/YnmOmNqBWtM
          </a>
        </motion.div>
        <motion.div>
          <a target="_blank" rel="noopener noreferrer" href="http://ncs.io/KeepYou">
            http://ncs.io/KeepYou
          </a>
        </motion.div>
      </motion.div>
    ) : (
      <React.Fragment key={`none`}></React.Fragment>
    );
  }, [show]);

  return <>{content}</>;
};
