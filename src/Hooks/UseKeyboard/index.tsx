import * as React from 'react'

let timeout: any;
export const useKeyboard = () => {
    const [keyCode, setKeyCode] = React.useState('')
    const [keyValue, setKeyValue] = React.useState('')

    const onWindowKeyUp = (event: any) => {
        setKeyValue(event.key)
        setKeyCode(event.keyCode)
        timeout && clearTimeout(timeout)
        timeout = setTimeout(() => {
            setKeyValue('')
            setKeyCode('')
        }, 3000)
    }

    React.useEffect(() => {
        window.addEventListener('keyup', onWindowKeyUp)
        return () => {
            window.removeEventListener('keyup', onWindowKeyUp)
            timeout && clearTimeout(timeout)
        }
    }, [])

    return { keyCode, keyValue }
}