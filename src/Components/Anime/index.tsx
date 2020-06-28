import * as React from 'react'
import * as PIXI from 'pixi.js'

import image from './cat.png'

export const Anime = ({ colors, theme }: any) => {
    const pixiApp = React.useRef(new PIXI.Application({
        width: 300,
        height: 300,
        transparent: false,
        antialias: true,
        resolution: 1,
    })).current
    const pixiLoader = React.useRef(new PIXI.Loader()).current

    const setup = () => {
        const texture = PIXI.utils.TextureCache[image];
        const sprite = new PIXI.Sprite(texture)
        pixiApp.stage.addChild(sprite)
    }

    React.useEffect(() => {
        pixiLoader
            .add(image)
            .load(setup)
    }, [])

    const updatePixiContainer = (element: any) => {
        element.appendChild(pixiApp.view)
    }

    return (
        <React.Fragment>
            <div ref={updatePixiContainer}></div>
        </React.Fragment>
    )
}
