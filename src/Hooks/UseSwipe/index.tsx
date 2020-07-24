import * as React from 'react'
import get from 'lodash/get'

const VERTICAL_DIRECTION_UP = 'up'
const VERTICAL_DIRECTION_DOWN = 'down'
const HORIZONTAL_DIRECTION_LEFT = 'left'
const HORIZONTAL_DIRECTION_RIGHT = 'right'
const NONE = ''

const POSITIVE = 1
const ZERO = 0
const NEGATIVE = -1

let startX: number = 0
let startY: number = 0
let startTime: any = new Date().getTime()
let verticalTimeout: any = ''
let horizontalTimeout: any = ''

export const useSwipe = ({ selector, distance = { x: 40, y: 40 }, time = 500 }: any) => {
    const [currentEvent, setCurrentEvent]: any = React.useState('')
    const [verticalDirection, setVerticalDirection] = React.useState(NONE)
    const [horizontalDirection, setHorizontalDirection] = React.useState(NONE)

    React.useEffect(() => {
        const element = document.querySelector(selector)

        const onTouchStart = (event: any) => {
            const firstTouchObject = get(event, 'changedTouches', [])[0]
            startX = firstTouchObject.pageX
            startY = firstTouchObject.pageY
            startTime = new Date().getTime()
            setCurrentEvent(event)
        }

        const onTouchEnd = (event: any) => {
            const firstTouchObject = get(event, 'changedTouches', [])[0]

            /* Horizontal */
            const horizontalDisplacement = firstTouchObject.pageX - startX
            const horizontalDistance = Math.abs(horizontalDisplacement)
            const horizontalVectorDirection = Math.sign(horizontalDisplacement) == POSITIVE
                ? HORIZONTAL_DIRECTION_LEFT : HORIZONTAL_DIRECTION_RIGHT

            /* Vertical */
            const verticalDisplacement = firstTouchObject.pageY - startY
            const verticalDistance = Math.abs(verticalDisplacement)
            const verticalVectorDirection = Math.sign(verticalDisplacement) == POSITIVE
                ? VERTICAL_DIRECTION_DOWN : VERTICAL_DIRECTION_UP

            /* Time Range */
            const isWithinTimeRange = (new Date().getTime() - startTime) < time

            if ((verticalDistance > distance.y) && isWithinTimeRange) {
                setVerticalDirection(verticalVectorDirection)
                verticalTimeout && clearTimeout(verticalTimeout)
                verticalTimeout = setTimeout(() => {
                    setVerticalDirection(NONE)
                    setCurrentEvent('')
                }, 1000)
            }
            if ((horizontalDistance > distance.x) && isWithinTimeRange) {
                setHorizontalDirection(horizontalVectorDirection)
                horizontalTimeout && clearTimeout(horizontalTimeout)
                horizontalTimeout = setTimeout(() => {
                    setHorizontalDirection(NONE)
                    setCurrentEvent('')
                }, 1000)
            }
        }

        if (element) {
            element.addEventListener('touchstart', onTouchStart)
            element.addEventListener('touchend', onTouchEnd)

            return () => {
                element.removeEventListener('touchstart', onTouchStart)
                element.removeEventListener('touchend', onTouchEnd)
                clearTimeout(horizontalTimeout)
                clearTimeout(verticalTimeout)
            }
        }
    }, [])

    return {
        currentEvent,
        verticalDirection,
        horizontalDirection,
        constants: {
            VERTICAL_DIRECTION_DOWN,
            VERTICAL_DIRECTION_UP,
            HORIZONTAL_DIRECTION_LEFT,
            HORIZONTAL_DIRECTION_RIGHT
        }
    }
}