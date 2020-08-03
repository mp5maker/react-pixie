import * as React from 'react'
import { Howler } from 'howler'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faVolumeUp, faVolumeMute } from '@fortawesome/free-solid-svg-icons'

import { ButtonRadial } from 'Components/Button/Radial'
import './styles.scss'

export const VolumeControl = ({ t }: any) => {
    const [mute, setMute] = React.useState(true)

    const toggleMute = () => {
        if (mute) Howler.mute(false)
        else Howler.mute(true)
        setMute(!mute)
    }

    React.useEffect(() => {
        Howler.mute(true)
    }, [])

    return (
        <React.Fragment>
            <div className="volume-control-container">
                <ButtonRadial
                    title={mute ? t(`INTERFACE_SOUND_ON`) : t(`INTERFACE_SOUND_OFF`)}
                    onClick={toggleMute}>
                    {
                        mute ? (
                            <FontAwesomeIcon icon={faVolumeMute} />
                        ) : (
                            <FontAwesomeIcon icon={faVolumeUp} />
                        )
                    }
                </ButtonRadial>
            </div>
            <div className="sound-attributon-container">
                Sound from
                &nbsp;
                <a
                    target="_blank"
                    href="https://www.zapsplat.com">
                    Zapsplat.com
                </a>
            </div>
        </React.Fragment>
    )
}