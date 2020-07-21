import * as React from 'react'

export const InteriorGround = ({ colors }: any) => {
    const memoInteriorGround = React.useMemo(() => {
        return (
            <>
                <mesh>
                    <boxGeometry
                        attach="geometry"
                        args={[2000, 0.1, 2000]} />
                    <meshStandardMaterial
                        attach="material"
                        color={colors.backgroundColor}
                        roughness={0}
                        metalness={0} />
                </mesh>
            </>
        )
    }, [colors])

    return memoInteriorGround
}