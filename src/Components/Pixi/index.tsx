import * as React from 'react'
import { Stage, Sprite } from '@inlet/react-pixi';
import BunnyImage from './bunny.jpeg'

export const Pixi = () => {
    return (
        <Stage>
            <Sprite image={BunnyImage} x={100} y={100} />
        </Stage>
    )
}