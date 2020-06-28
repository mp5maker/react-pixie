import * as React from 'react'

interface AppContextInterface {
    theme: string,
    setTheme: (params: any) => any,
}

export const AppContext = React.createContext<Partial<AppContextInterface>>({})