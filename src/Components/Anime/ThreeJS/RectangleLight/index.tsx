import * as React from 'react';
import * as THREE from 'three';
import { useResource } from 'react-three-fiber';
import { RectAreaLightUniformsLib } from 'three/examples/jsm/lights/RectAreaLightUniformsLib.js';

RectAreaLightUniformsLib.init();

export const RectangleLight = ({ colors }: any) => {
  const [planeGeometryRef, planeGeometry]: any = useResource();

  const memoRectangleLight = React.useMemo(() => {
    return (
      <>
        <group position={[5, 10, 0]} rotation={[0, -Math.PI, 0]}>
          <planeGeometry
            attach="geometry"
            ref={planeGeometryRef}
            args={[10, 10]}
          />
          <rectAreaLight args={[colors.primaryColor, 1, 10, 10]} />
          <mesh geometry={planeGeometry}>
            <meshBasicMaterial attach="material" side={THREE.BackSide} />
          </mesh>
          <mesh geometry={planeGeometry}>
            <meshBasicMaterial
              attach="material"
              color={colors.secondaryColor}
            />
          </mesh>
        </group>
      </>
    );
  }, [planeGeometry, colors]);

  return memoRectangleLight;
};
