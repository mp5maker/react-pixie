import * as React from 'react'

interface SettingsContextInterface {
    rotationX: any,
    rotationY: any,
    rotationZ: any,
    acceleration: any,
    fire: boolean,
    setSettings: (params: any) => any,
    settingsList: Array<string>,
    allowSwipeNavigation: boolean,
    bloom: boolean,
}

export const SettingsContext = React.createContext<Partial<SettingsContextInterface>>({})