import * as React from 'react'
import { useFrame } from 'react-three-fiber'

import { Glitch } from '../Glitch'
// @ts-ignore
import { GUI } from 'three/examples/jsm/libs/dat.gui.module'

export const Box = ({ colors, history, wireframe = false, redirectURL, ...props }: any) => {
    const mesh: any = React.useRef()
    let rotation = React.useRef({ x: 30, y: 30, z: 0 }).current
    const [hovered, setHover] = React.useState(false)
    const [active, setActive] = React.useState(false)

    useFrame(() => {
        if (hovered && !active) {
            setActive(true)
        }
        if (hovered && active) {

        }
        mesh.current.rotation.x += rotation.x * 0.001
        mesh.current.rotation.y += rotation.y * 0.001
    })

    React.useEffect(() => {
        let gui = new GUI()
        gui.add(rotation, 'x', 0, 100).name('Rotation X')
        gui.add(rotation, 'y', 0, 100).name('Rotation Y')
        gui.add(rotation, 'z', 0, 100).name('Rotation Z')
        gui.close()
    }, [])

    return (
        <mesh
            ref={mesh}
            scale={active ? [1.5, 1.5, 1.5] : [1, 1, 1]}
            onClick={(event) => {
                setActive(!active)
                history.push(redirectURL)
            }}
            onPointerOver={(event) => setHover(true)}
            onPointerOut={(event) => setHover(false)}
            {...props}>
            {
                hovered ? (
                    <>
                        <sphereGeometry
                            attach={`geometry`}
                            args={[5, 32, 32]} />
                        <meshBasicMaterial
                            attach={'material'}
                            color={colors.primaryColor}
                            wireframe={wireframe} />
                        <Glitch />
                    </>
                ) : (
                        <>
                            <boxGeometry
                                attach={`geometry`}
                                args={[5, 5, 5]} />
                            <meshLambertMaterial
                                wireframe={wireframe}
                                attach={'material'}
                                color={colors.primaryColor} />
                        </>
                    )
            }
        </mesh>
    )
}
