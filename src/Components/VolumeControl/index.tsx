import * as React from 'react';
import { Howler } from 'howler';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeUp, faVolumeMute } from '@fortawesome/free-solid-svg-icons';

import { ButtonRadial } from 'Components/Button/Radial';
import { EVENT_NAME } from 'Services/CustomEvents';
import { useCustomEvent } from 'Hooks/UseCustomEvent';

import './styles.scss';

export const VolumeControl = ({ t }: any) => {
  const [mute, triggerEvent] = useCustomEvent(EVENT_NAME.HOWLER_MUTE, true);

  const toggleMute = () => {
    const nextMute = !mute;
    triggerEvent(nextMute);
    Howler.mute(nextMute);
  };

  React.useEffect(() => {
    Howler.mute(mute);
  }, [mute]);

  return (
    <React.Fragment>
      <div className="volume-control-container">
        <ButtonRadial
          title={mute ? t(`INTERFACE_SOUND_ON`) : t(`INTERFACE_SOUND_OFF`)}
          onClick={toggleMute}>
          {mute ? (
            <FontAwesomeIcon icon={faVolumeMute} />
          ) : (
            <FontAwesomeIcon icon={faVolumeUp} />
          )}
        </ButtonRadial>
      </div>
      <div className="sound-attributon-container">
        Sound from &nbsp;
        <a target="_blank" href="https://www.zapsplat.com">
          Zapsplat.com
        </a>
      </div>
    </React.Fragment>
  );
};
