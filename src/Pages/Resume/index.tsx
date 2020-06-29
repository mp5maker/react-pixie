import * as React from 'react'

import { Colors } from '../../Constants/Colors'
import { Styles } from '../../Styles/Pages'
import { AppContext } from '../../AppContext'
import { AnimeThreeJS } from '../../Components/Anime/ThreeJS'
import "./Styles.scss"

export const Resume = ({ }: any) => {
    const { theme }: any = React.useContext(AppContext)

    return (
        <>
            <div
                style={{
                    ...Styles.container,
                    // @ts-ignore
                    backgroundColor: Colors[theme].backgroundColor
                }}
                className="pages-resume-container">
                <AnimeThreeJS />
            </div>
        </>
    )
}

export default Resume