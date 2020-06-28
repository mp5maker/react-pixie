import * as React from 'react'

import { Colors } from '../../Constants/Colors'
import { Styles } from '../../Styles/Pages'
import { AppContext } from '../../AppContext'
import { Anime } from '../../Components/Anime'

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
                        <Anime
                            theme={theme}
                            colors={Colors}/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home