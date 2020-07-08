import * as React from 'react'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { extend, useFrame, useThree } from 'react-three-fiber'

extend({ OrbitControls })

export const OrbitControl = ({ minDistance = 0, maxDistance = 200}: any) => {
    const { camera, gl } = useThree()
    const controls: any = React.useRef()

    useFrame((state) => {
        controls.current.minDistance = minDistance
        controls.current.maxDistance = maxDistance
        controls.current.update()
    })

    return (
        <orbitControls
            ref={controls}
            args={[camera, gl.domElement]} />
    )
}