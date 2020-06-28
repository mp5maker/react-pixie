import * as React from 'react'
import { Stage, Sprite } from '@inlet/react-pixi';

import { Colors } from '../../Constants/Colors'
import { Styles } from '../../Styles/Pages'
import { AppContext } from '../../AppContext'

export const Home = ({}: any) => {
    const { theme } = React.useContext(AppContext)

    return (
        <>
            <div
                style={{
                    ...Styles.container,
                    // @ts-ignore
                    backgroundColor: Colors[theme].backgroundColor
                }}
                className="pages-home-container">
                <div className="row">
                    <div className="col">
                        Home
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home