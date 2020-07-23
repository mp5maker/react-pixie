import * as React from 'react'

import { EncodeSVG } from '../../Utilities/EncodeSVG'

export const useSVG = ({ selector, svg }: any) => {
    const [base64SVG, setBase64SVG ] = React.useState("")

    React.useEffect(() => {
        const base64 = EncodeSVG(svg)
        setBase64SVG(base64)
        if (selector) {
            const elements = document.querySelectorAll(selector)
            elements.forEach((element) => {
                element.style.setProperty('cursor', `url(${base64}), auto`);
            })
        }
    }, [selector, svg])

    return { svg, selector, base64SVG}
}