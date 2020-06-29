import * as React from 'react'
import * as PIXI from 'pixi.js'

import maleZombieWalkOne from '../../../Sprites/male/walk-1.png'
import maleZombieWalkTwo from '../../../Sprites/male/walk-2.png'
import maleZombieWalkThree from '../../../Sprites/male/walk-3.png'
import maleZombieWalkFour from '../../../Sprites/male/walk-4.png'
import maleZombieWalkFive from '../../../Sprites/male/walk-5.png'
import maleZombieWalkSix from '../../../Sprites/male/walk-6.png'
import maleZombieWalkSeven from '../../../Sprites/male/walk-7.png'
import maleZombieWalkEight from '../../../Sprites/male/walk-8.png'
import maleZombieWalkNine from '../../../Sprites/male/walk-9.png'
import maleZombieWalkTen from '../../../Sprites/male/walk-10.png'

import femaleZombieWalkOne from '../../../Sprites/female/walk-1.png'
import femaleZombieWalkTwo from '../../../Sprites/female/walk-2.png'
import femaleZombieWalkThree from '../../../Sprites/female/walk-3.png'
import femaleZombieWalkFour from '../../../Sprites/female/walk-4.png'
import femaleZombieWalkFive from '../../../Sprites/female/walk-5.png'
import femaleZombieWalkSix from '../../../Sprites/female/walk-6.png'
import femaleZombieWalkSeven from '../../../Sprites/female/walk-7.png'
import femaleZombieWalkEight from '../../../Sprites/female/walk-8.png'
import femaleZombieWalkNine from '../../../Sprites/female/walk-9.png'
import femaleZombieWalkTen from '../../../Sprites/female/walk-10.png'

import backgroundImage from '../../../Sprites/graveyard/png/background.png'

const maleZombieWalk = [
    maleZombieWalkOne,
    maleZombieWalkTwo,
    maleZombieWalkThree,
    maleZombieWalkFour,
    maleZombieWalkFive,
    maleZombieWalkSix,
    maleZombieWalkSeven,
    maleZombieWalkEight,
    maleZombieWalkNine,
    maleZombieWalkTen,
]

const femaleZombieWalk = [
    femaleZombieWalkOne,
    femaleZombieWalkTwo,
    femaleZombieWalkThree,
    femaleZombieWalkFour,
    femaleZombieWalkFive,
    femaleZombieWalkSix,
    femaleZombieWalkSeven,
    femaleZombieWalkEight,
    femaleZombieWalkNine,
    femaleZombieWalkTen,
]

let spriteCounter = 0
let frameCount = 0
let requiredFPS = 3
let delta = 0
let radius = 50
export const AnimePixi = ({ colors, theme, onLoadingProgress }: any) => {
    const pixiApp = React.useRef(new PIXI.Application({
        width: window.innerWidth + 50,
        height: window.innerHeight,
        transparent: true,
        antialias: true,
        resolution: window.devicePixelRatio || 1,
        autoDensity: true,
    })).current
    const pixiLoader = React.useRef(new PIXI.Loader()).current
    const pixiContainer = React.useRef(new PIXI.Container()).current
    const pixiGraphics = React.useRef(new PIXI.Graphics()).current

    const animate = ({ maleSprite, femaleSprite, backgroundSprite, pixiGraphics }: any) => {
        delta += 0.1

        /* Male Animation Logic */
        maleSprite.x = maleSprite.x > window.innerWidth + 100 ? 0 : maleSprite.x + 10
        maleSprite.y = pixiApp.renderer.screen.height / 4
        // maleSprite.alpha = Math.sin(delta)
        maleSprite.texture = pixiLoader.resources[`male-zombie-walk-${spriteCounter}`].texture

        /* Female Animation Logic */
        femaleSprite.x = femaleSprite.x > window.innerWidth + 100 ? 0 : femaleSprite.x + 10
        femaleSprite.y = pixiApp.renderer.screen.height / 2
        // femaleSprite.alpha = Math.sin(delta)
        femaleSprite.texture = pixiLoader.resources[`female-zombie-walk-${spriteCounter}`].texture

        /* Bounce Cirlc Logic */
        radius = 50 + Math.sin(delta) * 25
        pixiGraphics.clear()
        pixiGraphics.beginFill(0xff0000)
        pixiGraphics.arc(0, 0, radius, 0, 2 * Math.PI)
        pixiGraphics.endFill()

        if (spriteCounter == 9) spriteCounter = 0
        else spriteCounter += 1
    }

    const setMaleSprite = () => {
        const maleTexture = PIXI.Texture.from(maleZombieWalk[spriteCounter]);
        let maleSprite = new PIXI.Sprite(maleTexture)
        maleSprite.anchor.x = 0.5;
        maleSprite.anchor.y = 0.5;
        maleSprite.x = pixiApp.screen.width / 2
        maleSprite.y = pixiApp.screen.height / 4
        maleSprite.scale = new PIXI.Point(0.5, 0.5)
        // maleSprite.blendMode = PIXI.BLEND_MODES.MULTIPLY
        maleSprite.interactive = true
        maleSprite.buttonMode = true
        pixiContainer.addChild(maleSprite)
        return maleSprite
    }

    const setFemaleSprite = () => {
        const femaleTexture = PIXI.Texture.from(femaleZombieWalk[spriteCounter]);
        let femaleSprite = new PIXI.Sprite(femaleTexture)
        femaleSprite.anchor.x = 0.5;
        femaleSprite.anchor.y = 0.5;
        femaleSprite.x = pixiApp.screen.width / 2
        femaleSprite.y = pixiApp.screen.height / 2
        femaleSprite.scale = new PIXI.Point(0.5, 0.5)
        // femaleSprite.blendMode = PIXI.BLEND_MODES.MULTIPLY
        femaleSprite.interactive = true
        femaleSprite.buttonMode = true
        pixiContainer.addChild(femaleSprite)
        return femaleSprite
    }

    const setBackgroundSprite = () => {
        const backgroundTexture = PIXI.Texture.from(backgroundImage)
        let backgroundSprite = new PIXI.Sprite(backgroundTexture)
        backgroundSprite.x = 0
        backgroundSprite.y = 0
        backgroundSprite.filters = [new PIXI.filters.BlurFilter()]
        pixiContainer.addChild(backgroundSprite)
        return backgroundSprite
    }

    const setCircle = () => {
        pixiGraphics.x = window.innerWidth
        pixiGraphics.y = 50
        pixiContainer.addChild(pixiGraphics)

        // @ts-ignore
        pixiGraphics.beginFill(0xff0000)
        pixiGraphics.arc(0, 0, radius, 0, 2 * Math.PI)
        pixiGraphics.endFill()

        return pixiGraphics
    }

    const setup = () => {
        pixiApp.stage.addChild(pixiContainer)
        const backgroundSprite = setBackgroundSprite()
        const maleSprite = setMaleSprite()
        const femaleSprite = setFemaleSprite()
        const pixiGraphics = setCircle()

        pixiApp.ticker.add(() => {
            if (frameCount == requiredFPS) {
                frameCount = 0
                animate({ maleSprite, femaleSprite, backgroundSprite, pixiGraphics })
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
        maleZombieWalk.forEach((item, index) => {
            pixiLoader.add(`male-zombie-walk-${index}`, maleZombieWalk[index])
        })
        femaleZombieWalk.forEach((item, index) => {
            pixiLoader.add(`female-zombie-walk-${index}`, femaleZombieWalk[index])
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
