import * as React from 'react'

let timeout: any;
export const useKeyboard = ({ allow = true, delay = 3000 }: any) => {
    const [keyCode, setKeyCode] = React.useState('')
    const [keyValue, setKeyValue] = React.useState('')

    const onWindowKeyUp = (event: any) => {
        if (allow) {
            setKeyValue(event.key)
            setKeyCode(event.keyCode)
            timeout && clearTimeout(timeout)
            timeout = setTimeout(() => {
                setKeyValue('')
                setKeyCode('')
            }, delay)
        }
    }

    React.useEffect(() => {
        if (allow) {
            window.addEventListener('keyup', onWindowKeyUp)
            return () => {
                window.removeEventListener('keyup', onWindowKeyUp)
                timeout && clearTimeout(timeout)
            }
        }
    }, [allow])

    return { keyCode, keyValue }
}