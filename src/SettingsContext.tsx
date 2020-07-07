import * as React from 'react'

interface SettingsContextInterface {
    rotationX: any,
    rotationY: any,
    rotationZ: any,
    acceleration: any,
    frequency: any,
    isPlaying: boolean,
    setSettings: (params: any) => any,
}

export const SettingsContext = React.createContext<Partial<SettingsContextInterface>>({})