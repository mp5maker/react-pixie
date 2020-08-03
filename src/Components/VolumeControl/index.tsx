import * as React from 'react'
import { Howler } from 'howler'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faVolumeUp, faVolumeMute } from '@fortawesome/free-solid-svg-icons'

import { ButtonRadial } from 'Components/Button/Radial'
import './styles.scss'

export const VolumeControl = () => {
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
        </React.Fragment>
    )
}