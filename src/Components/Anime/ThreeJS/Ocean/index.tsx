import * as React from 'react'
import * as THREE from 'three'
import { Water } from 'three/examples/jsm/objects/Water'
import { useResource, useThree, useFrame } from 'react-three-fiber'

let water: any;
export const Ocean = ({ colors }: any) => {
    const { scene } = useThree()
    const [meshRef, mesh]: any = useResource()

    useFrame((state, delta) => {
        water.material.uniforms['time'].value += 1.0 / 60.0;
        if (mesh) {
            mesh.rotation.x += delta * 0.5;
            mesh.rotation.z += delta * 0.51;
        }
    })

    React.useEffect(() => {
        let waterGeometry = new THREE.PlaneBufferGeometry(10000, 10000)
        water = new Water(waterGeometry, {
            textureWidth: 512,
            textureHeight: 512,
            waterNormals: new THREE.TextureLoader().load('Ocean/waternormals.jpg', (texture) => {
                texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
            }),
            alpha: 1.0,
            sunDirection: new THREE.Vector3(),
            waterColor: 0x001e0f,
            distortionScale: 3.7,
            fog: true
        })
        water.rotation.x = - Math.PI / 2;
        scene.add(water);
    }, [])

    const memoOcean = React.useMemo(() => {
        return (
            <>
                <mesh
                    // @ts-ignore
                    ref={meshRef}
                    position={[10, 10, 10]}>
                    <boxBufferGeometry
                        attach={`geometry`}
                        args={[30, 30, 30]} />
                    <meshStandardMaterial
                        attach={`material`}
                        color={colors.primaryColor}
                        roughness={0}
                        metalness={0} />
                </mesh>
            </>
        )
    }, [colors])

    return memoOcean
}