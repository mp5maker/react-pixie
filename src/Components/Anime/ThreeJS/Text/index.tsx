import * as React from 'react'
import * as THREE from 'three'
import { FontLoader } from 'three'

import { useMedia } from '../../../../Hooks/UseMedia'

export const Text = ({
    position = { x: -800, y: 0, z: -200 },
    rotation = { x: 0, y: Math.PI / 6, z: 0 },
    meshColor,
    text
}: any) => {
    const loader = React.useRef(new FontLoader()).current
    const [font, setFont]: any = React.useState(null)
    const mediaGreaterThan1024 = useMedia({ query: "(min-width: 1024px)"})

    React.useEffect(() => {
        const onSuccessLoad = (font: any) => setFont(font)
        loader.load('/Font/FiraSans.json', onSuccessLoad)
    }, [])

    const memoMyName = React.useMemo(() => {
        return font && mediaGreaterThan1024 ? (
            <>
                <mesh
                    rotation={[rotation.x, rotation.y, rotation.z]}
                    position={[position.x, position.y, position.z]}
                    geometry={new THREE.TextGeometry(text, {
                        font,
                        size: 60,
                        height: 3,
                        curveSegments: 12,
                        bevelEnabled: true,
                        bevelThickness: 1,
                        bevelSize: 8,
                        bevelOffset: 0,
                        bevelSegments: 10
                    })}>
                    <meshStandardMaterial
                        attach="material"
                        roughness={0}
                        metalness={0}
                        color={meshColor}
                        side={THREE.DoubleSide} />
                </mesh>
            </>
        ) : <></>

    }, [font, mediaGreaterThan1024, meshColor])

    return memoMyName
}