import * as React from 'react'

interface MusicContextInterface {
    frequency: any,
    isPlaying: boolean,
    setMusicSettings: (params: any) => any,
}

export const MusicContext = React.createContext<Partial<MusicContextInterface>>({})