import * as React from 'react'

import { Colors } from '../../Constants/Colors'

export const useColors = ({ theme }: any) => {
    const root = React.useRef(document.documentElement).current

    React.useEffect(() => {
        // @ts-ignore
        root.style.setProperty('--background-color', Colors[theme].backgroundColor)
        // @ts-ignore
        root.style.setProperty('--primary-color', Colors[theme].primaryColor)
        // @ts-ignore
        root.style.setProperty('--secondary-color', Colors[theme].secondaryColor)
        // @ts-ignore
        root.style.setProperty('--info-color', Colors[theme].infoColor)
        // @ts-ignore
        root.style.setProperty('--warning-color', Colors[theme].warningColor)
        // @ts-ignore
        root.style.setProperty('--success-color', Colors[theme].successColor)
        // @ts-ignore
        root.style.setProperty('--danger-color', Colors[theme].dangerColor)
        // @ts-ignore
        root.style.setProperty('--fog-color', Colors[theme].fogColor)
    }, [theme])

    return
}