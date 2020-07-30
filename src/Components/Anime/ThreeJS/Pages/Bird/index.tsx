import * as React from 'react'
import * as THREE from 'three'
import { Canvas } from 'react-three-fiber'

import { MusicContext } from 'MusicContext'
import { Bird } from 'Components/Anime/ThreeJS/Bird'
import { Portal } from 'Components/Anime/ThreeJS/Portal'
import { Ocean } from 'Components/Anime/ThreeJS/Ocean'
import { useDimension } from 'Hooks/UseDimension'
import { useMedia } from 'Hooks/UseMedia'

export const AnimeThreeJSBird = ({
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
                style={{ width, height }}
                shadowMap={true}
                camera={{
                    fov: 75,
                    near: 1,
                    far: 5000,
                    position: [100, 40, 120]
                }}
                pixelRatio={window.devicePixelRatio || 1}>
                <ambientLight
                    color={COLORS.primaryColor}
                    intensity={1}
                    position={[0, 0, 0]} />
                <pointLight
                    color={COLORS.primaryColor}
                    intensity={10}
                    position={[0, 0, 0]}
                    distance={5000}
                    decay={500} />
                <ambientLight
                    color={COLORS.primaryColor}
                    intensity={0.1}
                    position={[0, 0, 0]} />
                <Bird colors={COLORS} />
                <Ocean colors={COLORS} />
                <Portal
                    colors={COLORS}
                    frequency={frequency}
                    position={{x: 100, y: 80, z: -50 }}/>
            </Canvas>
        </div>
    )
}