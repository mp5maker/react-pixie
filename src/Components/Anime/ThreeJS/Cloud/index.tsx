import * as React from 'react'
import * as THREE from 'three'
import { useFrame } from 'react-three-fiber'

// @ts-ignore
import { RandomRange } from '../../../../Utilities/RandomRange'

export const Cloud = ({ noOfClouds = 100, colors, frequency }: any) => {
    const loader = React.useRef(new THREE.TextureLoader()).current
    const [texture, setTexture] = React.useState()
    const [clouds, setClouds]: any = React.useState()

    useFrame(() => {

    })

    React.useEffect(() => {
        const onSuccessLoad = (mapTexture: any) => setTexture(mapTexture)
        loader.load('/Cloud/cloud.png', onSuccessLoad)
        return () => {}
    }, [])

    React.useEffect(() => {
        const preparedTexture = (
            <>
                {
                    texture ? (
                        <>
                            {
                                [...new Array(noOfClouds)].map((value, key) => {
                                    return (
                                        <mesh
                                            key={key}
                                            rotation={[
                                                0,
                                                - 3 * Math.PI / 4,
                                                0
                                            ]}
                                            position={[
                                                RandomRange({ min: - window.innerWidth, max: 0 }),
                                                RandomRange({ min: 120, max: 200 }),
                                                RandomRange({ min: -800, max: -1200 }),
                                            ]}>
                                            <planeGeometry
                                                attach={`geometry`}
                                                args={[100, 100, 100]} />
                                            <meshStandardMaterial
                                                side={THREE.DoubleSide}
                                                attach={`material`}
                                                map={texture}
                                                transparent={true} />
                                        </mesh>
                                    )
                                })
                            }
                        </>
                    ) : <></>
                }
            </>
        )
        setClouds(preparedTexture)
    }, [texture])


    return (
        <>
            <pointLight
                power={frequency !== 0 && Math.random() > 0.95 ? frequency * 0.05 : 1 }
                position={[-100, 0, -1000]}
                args={[colors.primaryColor, 1, 5000, 1.7]} />
            { clouds }
        </>
    )
}