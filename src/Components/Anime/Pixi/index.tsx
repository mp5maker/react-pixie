import * as React from 'react'
import * as PIXI from 'pixi.js'
import get from 'lodash/get'
import head from 'lodash/head'

import zombieWalkOne from '../../../Sprites/male/walk-1.png'
import zombieWalkTwo from '../../../Sprites/male/walk-2.png'
import zombieWalkThree from '../../../Sprites/male/walk-3.png'
import zombieWalkFour from '../../../Sprites/male/walk-4.png'
import zombieWalkFive from '../../../Sprites/male/walk-5.png'
import zombieWalkSix from '../../../Sprites/male/walk-6.png'
import zombieWalkSeven from '../../../Sprites/male/walk-7.png'
import zombieWalkEight from '../../../Sprites/male/walk-8.png'
import zombieWalkNine from '../../../Sprites/male/walk-9.png'
import zombieWalkTen from '../../../Sprites/male/walk-10.png'

const zombieWalk = [
    zombieWalkOne,
    zombieWalkTwo,
    zombieWalkThree,
    zombieWalkFour,
    zombieWalkFive,
    zombieWalkSix,
    zombieWalkSeven,
    zombieWalkEight,
    zombieWalkNine,
    zombieWalkTen,
]

let spriteCounter = 0
let frameCount = 0
let requiredFPS = 3
export const AnimePixi = ({ colors, theme, onLoadingProgress }: any) => {
    const pixiApp = React.useRef(new PIXI.Application({
        width: window.innerWidth,
        height: window.innerHeight,
        transparent: true,
        antialias: true,
        resolution: window.devicePixelRatio || 1,
        autoDensity: true,
    })).current
    const pixiLoader = React.useRef(new PIXI.Loader()).current

    const animate = ({ sprite }: any) => {
        sprite.x = sprite.x > window.innerWidth + 100 ? 0 : sprite.x + 10
        sprite.y = pixiApp.renderer.screen.height / 2
        sprite.texture = pixiLoader.resources[`zombie-walk-${spriteCounter}`].texture
        if (spriteCounter == 9) spriteCounter = 0
        else spriteCounter += 1
    }

    const setup = () => {
        const texture = PIXI.Texture.from(zombieWalk[spriteCounter]);
        let sprite = new PIXI.Sprite(texture)
        sprite.anchor.x = 0.5;
        sprite.anchor.y = 0.5;
        sprite.x = pixiApp.screen.width / 2
        sprite.y = pixiApp.screen.height / 2
        pixiApp.stage.addChild(sprite)
        pixiApp.ticker.add(() => {
            if (frameCount == requiredFPS) {
                frameCount = 0
                animate({ sprite })
            }
            frameCount++
        })
    }

    const onResize = () => {
        pixiApp.renderer.resize(window.innerWidth, window.innerHeight)
    }

    const loadingOnProgress = ({ loading, progress }: any) => {
        console.log(progress)
    }

    React.useEffect(() => {
        zombieWalk.forEach((item, index) => {
            pixiLoader.add(`zombie-walk-${index}`, zombieWalk[index])
        })
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
