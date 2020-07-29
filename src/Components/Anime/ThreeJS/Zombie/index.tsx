import * as React from 'react'
import * as THREE from 'three'
import { useThree, useResource, useFrame } from 'react-three-fiber'
import { useKeyboard } from 'Hooks/UseKeyboard'

let startTime: any;
export const Zombie = ({
    colors,
    width
}: any) => {
    const [zombieWalkMaterials, setZombieWalkMaterials]: any = React.useState([])
    const [zombieIdleMaterials, setZombieIdleMaterials]: any = React.useState([])
    const [zombieAttackMaterials, setZombieAttackMaterials]: any = React.useState([])
    const [zombieDeadMaterials, setZombieDeadMaterials]: any = React.useState([])
    const [zombieObstacleMaterials, setZombieObstacleMaterials]: any = React.useState([])
    const [zombieRef, zombie]: any = useResource()
    const [obstacleRef, obstacle]: any = useResource()
    const [lineRef, line]: any = useResource()
    const { gl, scene, camera } = useThree()
    const { keyCode }: any = useKeyboard({ allow: true, delay: 250 })

    const nextSprite = ({ object, materials }: any) => {
        const materialNameArray = object.material.name.split('-')
        const [character, type, index] = materialNameArray
        const nextIndex = parseInt(index) + 1

        if (nextIndex < (materials.length - 1)) {
            object.material = materials[nextIndex]
        } else object.material = materials[0]
    }

    const detectMotion = () => {
        const KEY_A = 65
        const KEY_S = 83
        const KEY_SHIFT = 16

        /* Walk */
        if (keyCode == KEY_A) {
            /* Zombie Walk */
            nextSprite({ object: zombie, materials: zombieWalkMaterials})
            /* Obstacle */
            if ((zombie.position.x - 3) > obstacle.position.x ) {
                nextSprite({ object: obstacle, materials: zombieObstacleMaterials })
                obstacle.position.x = width * (0.65 / 100) + 3
            }
            obstacle.position.x -= 1
            return
        }

        /* Attack */
        if (keyCode == KEY_S) {
            /* Zombie Attack */
            return nextSprite({ object: zombie, materials: zombieAttackMaterials })
        }

        /* Dead */
        if (keyCode == KEY_SHIFT) {
            /* Zombie Dead */
            return nextSprite({ object: zombie, materials: zombieDeadMaterials })
        }

        /* Idle */
        return nextSprite({ object: zombie, materials: zombieIdleMaterials })
    }

    useFrame((state, delta) => {
        if (zombieIdleMaterials.length > 0) {
            if (startTime == undefined) startTime = state.clock.elapsedTime
            if (state.clock.elapsedTime - startTime > 0.05 && zombie) {
                startTime = state.clock.elapsedTime
                detectMotion()
            }
        }
    })

    React.useEffect(() => {
        const zombieWalkSprites = [
            new THREE.TextureLoader().load('/Zombie/Male/walk-1.png'),
            new THREE.TextureLoader().load('/Zombie/Male/walk-2.png'),
            new THREE.TextureLoader().load('/Zombie/Male/walk-3.png'),
            new THREE.TextureLoader().load('/Zombie/Male/walk-4.png'),
            new THREE.TextureLoader().load('/Zombie/Male/walk-5.png'),
            new THREE.TextureLoader().load('/Zombie/Male/walk-6.png'),
            new THREE.TextureLoader().load('/Zombie/Male/walk-7.png'),
            new THREE.TextureLoader().load('/Zombie/Male/walk-8.png'),
            new THREE.TextureLoader().load('/Zombie/Male/walk-9.png'),
            new THREE.TextureLoader().load('/Zombie/Male/walk-10.png'),
        ]

        const walkMaterials = zombieWalkSprites.map((item, index) => {
            return new THREE.SpriteMaterial({
                map: item,
                color: colors.primaryColor,
                name: `zombie-walk-${index}`
            })
        })

        setZombieWalkMaterials(walkMaterials)

        const zombieIdleSprites = [
            new THREE.TextureLoader().load('/Zombie/Male/idle-1.png'),
            new THREE.TextureLoader().load('/Zombie/Male/idle-2.png'),
            new THREE.TextureLoader().load('/Zombie/Male/idle-3.png'),
            new THREE.TextureLoader().load('/Zombie/Male/idle-4.png'),
            new THREE.TextureLoader().load('/Zombie/Male/idle-5.png'),
            new THREE.TextureLoader().load('/Zombie/Male/idle-6.png'),
            new THREE.TextureLoader().load('/Zombie/Male/idle-7.png'),
            new THREE.TextureLoader().load('/Zombie/Male/idle-8.png'),
            new THREE.TextureLoader().load('/Zombie/Male/idle-9.png'),
            new THREE.TextureLoader().load('/Zombie/Male/idle-11.png'),
            new THREE.TextureLoader().load('/Zombie/Male/idle-12.png'),
            new THREE.TextureLoader().load('/Zombie/Male/idle-13.png'),
            new THREE.TextureLoader().load('/Zombie/Male/idle-14.png'),
            new THREE.TextureLoader().load('/Zombie/Male/idle-15.png'),
        ]

        const idleMaterials = zombieIdleSprites.map((item, index) => {
            return new THREE.SpriteMaterial({
                map: item,
                color: colors.primaryColor,
                name: `zombie-idle-${index}`
            })
        })

        setZombieIdleMaterials(idleMaterials)

        const zombieAttackSprites = [
            new THREE.TextureLoader().load('/Zombie/Male/attack-1.png'),
            new THREE.TextureLoader().load('/Zombie/Male/attack-2.png'),
            new THREE.TextureLoader().load('/Zombie/Male/attack-3.png'),
            new THREE.TextureLoader().load('/Zombie/Male/attack-4.png'),
            new THREE.TextureLoader().load('/Zombie/Male/attack-5.png'),
            new THREE.TextureLoader().load('/Zombie/Male/attack-6.png'),
            new THREE.TextureLoader().load('/Zombie/Male/attack-7.png'),
            new THREE.TextureLoader().load('/Zombie/Male/attack-8.png'),
        ]

        const attackMaterials = zombieAttackSprites.map((item, index) => {
            return new THREE.SpriteMaterial({
                map: item,
                color: colors.primaryColor,
                name: `zombie-attack-${index}`
            })
        })

        setZombieAttackMaterials(attackMaterials)

        const zombieDeadSprites = [
            new THREE.TextureLoader().load('/Zombie/Male/dead-1.png'),
            new THREE.TextureLoader().load('/Zombie/Male/dead-2.png'),
            new THREE.TextureLoader().load('/Zombie/Male/dead-3.png'),
            new THREE.TextureLoader().load('/Zombie/Male/dead-4.png'),
            new THREE.TextureLoader().load('/Zombie/Male/dead-5.png'),
            new THREE.TextureLoader().load('/Zombie/Male/dead-6.png'),
            new THREE.TextureLoader().load('/Zombie/Male/dead-7.png'),
            new THREE.TextureLoader().load('/Zombie/Male/dead-8.png'),
        ]

        const deadMaterials = zombieDeadSprites.map((item, index) => {
            return new THREE.SpriteMaterial({
                map: item,
                color: colors.primaryColor,
                name: `zombie-dead-${index}`
            })
        })

        setZombieDeadMaterials(deadMaterials)

        const obstacleSprites = [
            new THREE.TextureLoader().load('/Zombie/Objects/dead-bush.png'),
            new THREE.TextureLoader().load('/Zombie/Objects/tree.png'),
            new THREE.TextureLoader().load('/Zombie/Objects/bush-1.png'),
            new THREE.TextureLoader().load('/Zombie/Objects/bush-2.png'),
            new THREE.TextureLoader().load('/Zombie/Objects/arrow-sign.png'),
            new THREE.TextureLoader().load('/Zombie/Objects/crate.png'),
            new THREE.TextureLoader().load('/Zombie/Objects/skeleton.png'),
            new THREE.TextureLoader().load('/Zombie/Objects/tombstone-1.png'),
            new THREE.TextureLoader().load('/Zombie/Objects/tombstone-2.png'),
        ]

        const obstacleMaterials = obstacleSprites.map((item, index) => {
            return new THREE.SpriteMaterial({
                map: item,
                color: colors.primaryColor,
                name: `zombie-obstacles-${index}`
            })
        })

        setZombieObstacleMaterials(obstacleMaterials)

    }, [])

    React.useEffect(() => {
        if (line) {
            line.setFromPoints([
                new THREE.Vector3(-200, -0.5, 0),
                new THREE.Vector3(200, -0.5, 0),
            ])
        }
    }, [line])

    return (
        <>
            {
                zombieIdleMaterials.length > 0 && (
                    <sprite
                        // @ts-ignore
                        ref={zombieRef}
                        position={[- (width * (0.65 / 100)), 0, 0]}
                        args={[zombieIdleMaterials[0]]}>
                    </sprite>
                )
            }
            <line>
                <bufferGeometry
                    ref={lineRef}
                    attach={`geometry`} />
                <lineBasicMaterial
                    attach={`material`}
                    side={THREE.DoubleSide}
                    color={colors.primaryColor} />
            </line>
            {
                zombieObstacleMaterials.length > 0 && (
                    <sprite
                        // @ts-ignore
                        ref={obstacleRef}
                        position={[(width * (0.65 / 100) + 3), 0, 0]}
                        args={[zombieObstacleMaterials[0]]}>
                    </sprite>
                )
            }
        </>
    )
}