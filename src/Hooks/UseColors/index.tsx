import * as React from 'react'

import { Colors } from '../../Constants/Colors'

export const useColors = ({ theme }: any) => {
    const root = React.useRef(document.documentElement).current

    React.useEffect(() => {
        // @ts-ignore
        root.style.setProperty('--background-color', Colors[theme].backgroundColor)
        // @ts-ignore
        root.style.setProperty('--primary-color', Colors[theme].backgroundColor)
        // @ts-ignore
        root.style.setProperty('--secondary-color', Colors[theme].backgroundColor)
        // @ts-ignore
        root.style.setProperty('--info-color', Colors[theme].backgroundColor)
        // @ts-ignore
        root.style.setProperty('--warning-color', Colors[theme].backgroundColor)
        // @ts-ignore
        root.style.setProperty('--success-color', Colors[theme].backgroundColor)
        // @ts-ignore
        root.style.setProperty('--danger-color', Colors[theme].backgroundColor)
    }, [theme])

    return
}