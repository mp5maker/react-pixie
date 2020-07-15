import * as React from 'react'
import * as THREE from 'three'
import { useThree, useFrame } from 'react-three-fiber'
import { useMedia } from '../../../../Hooks/UseMedia'

export const Statistics = ({
    colors,
    position = { x: -250, y: 0, z: -500},
    rotation = { x: 0, y: Math.PI / 6, z: 0}
}: any) => {
    const [fps, setFps]: any = React.useState(60)
    const { scene }: any = useThree()
    const loader = React.useRef(new THREE.FontLoader()).current
    const [font, setFont]: any = React.useState(null)
    const [currentMesh, setCurrentMesh]: any = React.useState(null)
    const mediaGreaterThan1024 = useMedia({ query: "(min-width: 1024px)" })

    useFrame((state, delta: any) => {
        const currentFps = Number(1 / delta).toFixed(2)
        if (fps != currentFps && Math.random() > 0.99) setFps(currentFps)
    })

    const createText = () => {
        if (font && mediaGreaterThan1024) {
            const geometry = new THREE.TextGeometry(`FPS: ${fps}`, {
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
            const material = new THREE.MeshStandardMaterial({
                color: colors.primaryColor,
                roughness: 0,
                metalness: 0,
                side: THREE.DoubleSide
            })
            const mesh = new THREE.Mesh(geometry, material)
            mesh.rotation.set(rotation.x, rotation.y, rotation.z)
            mesh.position.set(position.x, position.y, position.z)
            setCurrentMesh(mesh)
            scene.add(mesh)
        }
    }

    const removeText = () => currentMesh && scene.remove(currentMesh)

    React.useEffect(() => {
        const onSuccessLoad = (font: any) => setFont(font)
        loader.load('/Font/FiraSans.json', onSuccessLoad)
    }, [])

    React.useEffect(() => {
        if (Math.random() > 0.5) {
            removeText()
            createText()
        }
    }, [fps])

    return (
        <>
        </>
    )
}