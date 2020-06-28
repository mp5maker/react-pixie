import * as React from 'react'
import * as PIXI from 'pixi.js'

import image from './cat.png'

export const Anime = ({ colors, theme }: any) => {
    const pixiApp = React.useRef(new PIXI.Application({
        width: 256,
        height: 256,
        transparent: false,
        antialias: true,
        resolution: 1,
    })).current
    const pixiLoader = React.useRef(new PIXI.Loader()).current

    const setup = () => {
        const texture = PIXI.utils.TextureCache[image];
        const sprite = new PIXI.Sprite(texture)
        // sprite.x = 90
        // sprite.y = 90
        sprite.position.set(90, 90)
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
