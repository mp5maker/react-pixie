import * as React from 'react';

export const ShinySphere = ({ colors, frequency }: any) => {
  const shinySphereRef: any = React.useRef();
  const frequencyParams =
    frequency == 1 || frequency == 0 ? 1 : frequency * 0.01;

  const memoShinySphere = React.useMemo(() => {
    return (
      <>
        <mesh
          ref={shinySphereRef}
          castShadow={true}
          position={[5, 10, 20]}
          scale={[0.5, 0.5, 0.5]}>
          <sphereGeometry
            attach="geometry"
            args={[
              5 * frequencyParams,
              20 * frequencyParams,
              20 * frequencyParams,
            ]}
          />
          <meshStandardMaterial
            attach="material"
            color={colors.primaryColor}
            roughness={0}
            metalness={0}
          />
        </mesh>
      </>
    );
  }, [colors, frequency]);

  return memoShinySphere;
};
