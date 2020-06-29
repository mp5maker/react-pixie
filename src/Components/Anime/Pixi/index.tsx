import * as React from 'react'
import * as PIXI from 'pixi.js'

import image from './cat.png'

export const AnimePixi = ({ colors, theme, onLoadingProgress }: any) => {
    const pixiApp = React.useRef(new PIXI.Application({
        width: window.innerWidth,
        height: window.innerHeight,
        transparent: true,
        antialias: true,
        resolution: window.devicePixelRatio,
        autoDensity: true,
    })).current
    const pixiLoader = React.useRef(new PIXI.Loader()).current

    const animate = ({ sprite }: any) => {
        sprite.x = pixiApp.renderer.screen.width / 2
        sprite.y = pixiApp.renderer.screen.height / 2
        sprite.rotation += 0.005
    }

    const setup = () => {
        const texture = PIXI.Texture.from(image);
        let sprite = new PIXI.Sprite(texture)
        sprite.anchor.x = 0.5;
        sprite.anchor.y = 0.5;
        sprite.x = pixiApp.screen.width / 2
        sprite.y = pixiApp.screen.height / 2
        pixiApp.stage.addChild(sprite)
        pixiApp.ticker.add(() => animate({ sprite }))
    }

    const onResize = () => {
        pixiApp.renderer.resize(window.innerWidth, window.innerHeight)
    }

    const loadingOnProgress = ({ loading, progress }: any) => {
        console.log(progress)
    }

    React.useEffect(() => {
        pixiLoader.add(image)
        pixiLoader.onProgress.add(loadingOnProgress)
        pixiLoader.load(setup)
        window.addEventListener('resize', onResize)

        return () => window.removeEventListener('resize', onResize)
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
