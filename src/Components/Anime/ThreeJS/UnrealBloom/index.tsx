import * as React from 'react'
import * as THREE from 'three'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass'
import { useThree, useFrame, extend } from 'react-three-fiber'

extend({ EffectComposer, ShaderPass, RenderPass, UnrealBloomPass })

export const UnrealBloom = () => {
    const composer: any = React.useRef()
    const { scene, gl, camera, size } = useThree()
    const aspect = React.useMemo(() => new THREE.Vector2(512, 512), [])

    React.useEffect(() => {
        composer.current.setSize(size.width, size.height)
    }, [size])

    useFrame(() => {
        composer.current.render()
    }, 1)

    return (
        <>
            <effectComposer
                ref={composer}
                args={[gl]}>
                <renderPass
                    attachArray="passes"
                    args={[scene, camera]} />
                <unrealBloomPass
                    attachArray="passes"
                    args={[aspect, 2, 1, 0]} />
            </effectComposer>
        </>
    )
}