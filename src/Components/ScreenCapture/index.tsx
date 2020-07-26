import * as React from 'react'
import moment from 'moment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCamera } from '@fortawesome/free-solid-svg-icons'
import { ButtonRadial } from 'Components/Button/Radial'

import './styles.scss'

export const ScreenCapture = ({ fileName = 'photon-capture.png' }) => {
    const body: any = document.querySelector('body')
    const canvas: any = document.createElement('canvas')
    const link: any = document.createElement('a');

    const onClick = React.useCallback(async () => {
        try {
            // @ts-ignore
            const stream =await navigator.mediaDevices.getDisplayMedia({
                video: { mediaSource: 'screen' },
            })
            const track = stream.getVideoTracks()[0]
            // @ts-ignore
            const imageCapture = new ImageCapture(track)
            const bitmap = await imageCapture.grabFrame()
            track.stop()

            /* Canvas */
            body.appendChild(canvas)
            canvas.width = bitmap.width
            canvas.height = bitmap.height

            /* Context */
            const context = canvas.getContext('2d')
            context.drawImage(bitmap, 0, 0, bitmap.width, bitmap.height)
            const image = canvas.toDataURL("image/png")

            /* Prepare */
            link.href = image;
            link.download = fileName;
            body.appendChild(link);
            link.click();
            body.removeChild(link);
            body.removeChild(canvas)
        } catch(error) {
            console.debug(error)
        }
    }, [])

    return (
        <React.Fragment>
            <div className="screen-capture-container">
                <ButtonRadial
                    onClick={() => onClick()}>
                    <FontAwesomeIcon
                        icon={faCamera} />
                </ButtonRadial>
            </div>
        </React.Fragment>
    )
}