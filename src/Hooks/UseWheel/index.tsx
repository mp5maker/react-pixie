import * as React from 'react'

const POSITIVE = 1
const NEGATIVE = -1
const ZERO = 0
export const useWheel = ({ query }: any) => {
    const [deltaY, setDeltaY] = React.useState(0)
    const [direction, setDirection] = React.useState('')

    React.useEffect(() => {
        const onWindowWheel = (event: any) => {
            setDeltaY(event.deltaY)
            if (Math.sign(event.deltaY) == POSITIVE) setDirection('down')
            if (Math.sign(event.deltaY) == NEGATIVE) setDirection('up')
        }

        let selector: any = document.querySelector(query)
        selector.addEventListener('wheel', onWindowWheel)
        return () => {
            selector.removeEventListener('wheel', onWindowWheel)
        }
    }, [])

    return { deltaY, direction }
}