import * as React from 'react'

export const useDimension = () => {
    const [width, setWidth] = React.useState(window.innerWidth)
    const [height, setHeight] = React.useState(window.innerHeight)

    const onWindowChange = () => {
        setWidth(window.innerWidth)
        setHeight(window.innerHeight)
    }

    React.useEffect(() => {
        window.addEventListener('resize', onWindowChange)
        return () => {
            window.removeEventListener('resize', onWindowChange)
        }
    }, [])

    return {
        width,
        height
    }
}