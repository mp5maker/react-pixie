import * as React from 'react'
import { useThree, useFrame } from 'react-three-fiber'
import Stats from 'three/examples/jsm/libs/stats.module'

import './styles.scss'

export const Statistics = ({ colors }: any) => {
    const stats = React.useRef(Stats()).current

    React.useEffect(() => {
        stats.setMode(0)
        stats.domElement.classList.add('stats-section')
        document.body.appendChild(stats.domElement)
    }, [])

    useFrame(() => stats.update())

    return <></>
}