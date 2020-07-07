import * as React from 'react'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { extend, Canvas, useFrame, useThree } from 'react-three-fiber'

extend({ OrbitControls })

export const OrbitControl = () => {
    const { camera, gl } = useThree()
    const controls: any = React.useRef()

    useFrame((state) => {
        controls.current.minDistance = 0
        controls.current.maxDistance = 200
        controls.current.update()
    })

    return (
        <orbitControls
            ref={controls}
            args={[camera, gl.domElement]} />
    )
}