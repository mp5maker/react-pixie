import * as React from 'react'
import * as THREE from 'three'
import { FontLoader } from 'three'

import { useMedia } from '../../../../Hooks/UseMedia'

export const MyName = ({ colors }: any) => {
    const loader = React.useRef(new FontLoader()).current
    const [geometry, setGeometry]: any = React.useState()
    const mediaGreaterThan1024 = useMedia({ query: "(min-width: 1024px)"})

    const onSuccessload = (font: any) => {
        var geo = new THREE.TextGeometry('S. Photon Khan', {
            font,
            size: 60,
            height: 3,
            curveSegments: 12,
            bevelEnabled: true,
            bevelThickness: 1,
            bevelSize: 8,
            bevelOffset: 0,
            bevelSegments: 10
        })
        setGeometry(geo)
    }

    React.useEffect(() => {
        loader.load('/Font/FiraSans.json', onSuccessload)
    }, [])

    const memoMyName = React.useMemo(() => {
        return mediaGreaterThan1024 && geometry ? (
            <>
                <mesh
                    rotation={[0, Math.PI / 6, 0]}
                    position={[-800, 0, -200]}
                    geometry={geometry}>
                    <meshStandardMaterial
                        attach="material"
                        roughness={0}
                        metalness={0}
                        color={colors.backgroundColor}
                        side={THREE.DoubleSide} />
                </mesh>
            </>
        ) : <></>

    }, [colors, geometry, mediaGreaterThan1024])

    return memoMyName
}