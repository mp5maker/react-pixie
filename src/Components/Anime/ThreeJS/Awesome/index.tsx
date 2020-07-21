import * as React from 'react'
import * as THREE from 'three'
import { useThree, useFrame } from 'react-three-fiber'
import { useMedia } from '../../../../Hooks/UseMedia'

export const Awesome = ({
    colors,
    position = { x: -250, y: 0, z: -500},
    rotation = { x: 0, y: Math.PI / 6, z: 0}
}: any) => {
    const loader = React.useRef(new THREE.FontLoader()).current
    const [font, setFont]: any = React.useState(null)
    const mediaGreaterThan1024 = useMedia({ query: "(min-width: 1024px)" })

    React.useEffect(() => {
        const onSuccessLoad = (font: any) => setFont(font)
        loader.load('/Font/FiraSans.json', onSuccessLoad)
    }, [])

    return (
        <>
            {
                font && mediaGreaterThan1024 && (
                    <mesh
                        geometry={new THREE.TextGeometry(`Awesome!`, {
                            font,
                            size: 60,
                            height: 3,
                            curveSegments: 12,
                            bevelEnabled: true,
                            bevelThickness: 1,
                            bevelSize: 8,
                            bevelOffset: 0,
                            bevelSegments: 10
                        })}
                        rotation={[rotation.x, rotation.y, rotation.z]}
                        position={[position.x, position.y, position.z]}>
                        <meshStandardMaterial
                            attach={`material`}
                            color={colors.primaryColor}
                            roughness={0}
                            metalness={0}
                            side={THREE.DoubleSide} />
                    </mesh>
                )
            }
        </>
    )
}