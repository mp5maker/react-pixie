import * as React from 'react'

interface SettingsContextInterface {
    rotationX: any,
    rotationY: any,
    rotationZ: any,
    acceleration: any,
    frequency: any,
    isPlaying: boolean,
    fire: boolean,
    setSettings: (params: any) => any,
    settingsList: Array<string>
}

export const SettingsContext = React.createContext<Partial<SettingsContextInterface>>({})