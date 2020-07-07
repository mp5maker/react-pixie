import * as React from 'react'
import * as THREE from 'three'
import { useFrame } from 'react-three-fiber'

export const Skybox = ({ colors, history, acceleration, ...props }: any) => {
    let materialsArray: any = React.useRef([]).current
    const [material, setMaterial] = React.useState()

    React.useEffect(() => {
        let texture_bk = new THREE.TextureLoader().load('Skybox/arid_bk.jpg')
        let texture_dn = new THREE.TextureLoader().load('Skybox/arid_dn.jpg')
        let texture_ft = new THREE.TextureLoader().load('Skybox/arid_ft.jpg')
        let texture_lf = new THREE.TextureLoader().load('Skybox/arid_lf.jpg')
        let texture_rt = new THREE.TextureLoader().load('Skybox/arid_rt.jpg')
        let texture_up = new THREE.TextureLoader().load('Skybox/arid_up.jpg')

        materialsArray = [
            new THREE.MeshBasicMaterial({ map: texture_ft }),
            new THREE.MeshBasicMaterial({ map: texture_bk }),
            new THREE.MeshBasicMaterial({ map: texture_up }),
            new THREE.MeshBasicMaterial({ map: texture_dn }),
            new THREE.MeshBasicMaterial({ map: texture_rt }),
            new THREE.MeshBasicMaterial({ map: texture_lf }),
        ]

        for (let i = 0; i < materialsArray.length; i++) {
            materialsArray[i].side = THREE.BackSide
        }

        setMaterial(materialsArray)

    }, [])

    return material ? (
        <mesh
            material={material}
            geometry={new THREE.BoxGeometry(10000, 10000, 10000)} />
    ) : <></>

}