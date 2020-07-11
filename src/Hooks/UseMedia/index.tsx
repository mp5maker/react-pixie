import * as React from 'react'

export const useMedia = ({ query }: any) => {
    const [ matches, setMatches] = React.useState(window.matchMedia(query).matches)

    React.useEffect(() => {
        const media = window.matchMedia(query)
        if (media.matches !== matches) setMatches(matches)
        const listener = () => setMatches(media.matches)
        media.addListener(listener)
        return () => media.removeListener(listener)
    }, [query])

    return matches
}