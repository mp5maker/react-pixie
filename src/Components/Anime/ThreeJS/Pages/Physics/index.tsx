import * as React from 'react'
import * as THREE from 'three'
import { Canvas } from 'react-three-fiber'
import { Physics, usePlane, useBox } from 'use-cannon'

import { MusicContext } from '../../../../../MusicContext'
import { useDimension } from '../../../../../Hooks/UseDimension'
import { useMedia } from '../../../../../Hooks/UseMedia'

const Plane = ({ colors, ...props}: any) => {
    const [ ref ] = usePlane(() => ({ rotation: [-Math.PI / 2, 0, 0 ], ...props }))

    return (
        <mesh ref={ref} receiveShadow>
            <planeBufferGeometry
                attach={`geometry`}
                args={[1000, 1000]} />
            <meshPhongMaterial
                attach={`material`}
                color={colors.backgroundColor} />
        </mesh>
    )
}

const Box = ({ colors, ...props }: any) => {
    const [ref] = useBox(() => ({ mass: 1, position: [0, 5, 0], rotation: [0.4, 0.2, 0.5], ...props }))
    return (
        <mesh
            receiveShadow
            castShadow
            ref={ref}>
            <boxBufferGeometry
                attach={`geometry`} />
            <meshLambertMaterial
                attach={`material`}
                color={colors.primaryColor} />
        </mesh>
    )
}

export const AnimeThreeJSPhysics = ({
    colors,
    theme,
    history,
}: any) => {
    const { frequency }: any = React.useContext(MusicContext)
    const { width, height } = useDimension()
    const isMediaGreaterThan771px = useMedia({ query: `(min-width: 771px)` })

    React.useEffect(() => {
        if (!isMediaGreaterThan771px) document.body.style.position = 'fixed'
        if (isMediaGreaterThan771px) document.body.style.position = ''
    }, [isMediaGreaterThan771px])

    /* Colors */
    const COLORS = {
        primaryColor: new THREE.Color(colors[theme].primaryColor),
        backgroundColor: new THREE.Color(colors[theme].backgroundColor),
        secondaryColor: new THREE.Color(colors[theme].secondaryColor),
        infoColor: new THREE.Color(colors[theme].infoColor),
        dangerColor: new THREE.Color(colors[theme].dangerColor),
        warningColor: new THREE.Color(colors[theme].warningColor),
        successColor: new THREE.Color(colors[theme].successColor),
        fogColor: new THREE.Color(colors[theme].fogColor),
    }

    return (
        <div style={{ width, height }}>
            <Canvas
                shadowMap={true}
                sRGB={true}
                camera={{ position: [-1, 2, 5], fov: 50 }}
                pixelRatio={window.devicePixelRatio || 1}>
                <color
                    attach="background"
                    // @ts-ignore
                    args={[colors[theme].backgroundColor]} />
                <hemisphereLight
                    color={COLORS.primaryColor}
                    intensity={0.1} />
                <spotLight
                    color={COLORS.primaryColor}
                    position={[10, 10, 10]}
                    angle={0.3}
                    penumbra={1}
                    intensity={1}
                    castShadow />
                <Physics>
                    <Plane
                        colors={COLORS} />
                    <Box
                        isKinematic={true}
                        colors={COLORS}/>
                    <Box
                        colors={COLORS}
                        position={[0, 10, -2]} />
                    <Box
                        colors={COLORS}
                        position={[0, 20, -2]} />
                </Physics>
            </Canvas>
        </div>
    )
}