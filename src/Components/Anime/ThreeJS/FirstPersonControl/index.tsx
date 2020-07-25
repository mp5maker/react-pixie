import * as React from 'react'
import { FirstPersonControls } from 'three/examples/jsm/controls/FirstPersonControls'
import { extend, useFrame, useThree } from 'react-three-fiber'

import { useDimension } from 'Hooks/UseDimension'

extend({ FirstPersonControls })

export const FirstPersonControl = ({ movementSpeed = 150, lookSpeed = 0.1 }: any) => {
    const { camera, gl, scene } = useThree()
    const controls: any = React.useRef()
    const { width, height } = useDimension()

    useFrame((state, delta) => {
        controls.current.update(delta)
        controls.current.handleResize()
        document.body.style.position = 'fixed';
    })

    React.useEffect(() => {
        controls.current.movementSpeed = movementSpeed
        controls.current.lookSpeed = lookSpeed

        return () => {
            document.body.style.position = '';
        }
    }, [movementSpeed, lookSpeed])

    return (
        <firstPersonControls
            ref={controls}
            args={[camera, gl.domElement]} />
    )
}