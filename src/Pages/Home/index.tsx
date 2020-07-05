import * as React from 'react'
import { motion } from 'framer-motion'

import { Colors } from '../../Constants/Colors'
import { PageTransition } from '../../Constants/PageTransition'
import { Styles } from '../../Styles/Pages'
import { AppContext } from '../../AppContext'
import { AnimeThreeJS } from '../../Components/Anime/ThreeJS/space'
import "./Styles.scss"

export const Home = ({ navigation }: any) => {
    const { theme } = React.useContext(AppContext)

    return (
        <motion.div
            variants={PageTransition}
            initial="initial"
            animate="animate"
            exit="exit"
            style={{
                ...Styles.container,
                // @ts-ignore
                backgroundColor: Colors[theme].backgroundColor
            }}
            className="pages-home-container">
            <div className="row">
                <div className="col p-0">
                    <AnimeThreeJS
                        theme={theme}
                        colors={Colors}/>
                </div>
            </div>
        </motion.div>
    )
}

export default Home