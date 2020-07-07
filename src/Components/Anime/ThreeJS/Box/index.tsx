import * as React from 'react'
import { useFrame } from 'react-three-fiber'

import { Glitch } from '../Glitch'

export const Box = ({ colors, history, wireframe = false, redirectURL, ...props }: any) => {
    const mesh: any = React.useRef()
    const [hovered, setHover] = React.useState(false)
    const [active, setActive] = React.useState(false)

    useFrame(() => {
        if (hovered && !active) {
            setActive(true)
        }
        if (hovered && active) {

        }
        mesh.current.rotation.x += 0.01
        mesh.current.rotation.y += 0.01
    })

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
