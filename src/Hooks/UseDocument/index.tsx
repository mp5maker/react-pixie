import * as React from 'react'
import get from 'lodash/get'

export const useDocument = ({ options = [] }: any = {}) => {
    React.useEffect(() => {
        options.forEach((item: any) => {
            const selector = get(item, 'selector', '')
            const value = get(item, 'value', '')
            if (selector) {
                const element = document.querySelector(selector)
                element.innerText = value
            }
        })
    }, [options])

    return
}