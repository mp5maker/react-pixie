import * as React from 'react';
import * as THREE from 'three';
import { useFrame } from 'react-three-fiber';

import { texture } from 'Components/Anime/ThreeJS/Ruins';

/* the warp field: stars speed up towards the camera and restart at rest behind the field */
export const Stars = ({ colors, acceleration, count = 6000, still }: any) => {
  const { geometry, speed } = React.useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < positions.length; i++) positions[i] = Math.random() * 600 - 300;
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return { geometry, speed: new Float32Array(count) };
  }, [count]);
  const material = React.useMemo(
    () =>
      new THREE.PointsMaterial({
        color: colors.primaryColor,
        size: 0.5,
        map: texture('Circle/circle.png'),
        transparent: true,
      }),
    [colors],
  );
  React.useEffect(() => () => geometry.dispose(), [geometry]);
  React.useEffect(() => () => material.dispose(), [material]);

  useFrame((_, delta) => {
    if (still) return;
    /* the speeds were tuned per 60 Hz frame; scaled so a 120 Hz screen warps at the same pace */
    const step = Math.min(delta, 0.1) * 60;
    const position: any = geometry.attributes.position;
    const array = position.array;
    for (let i = 0; i < count; i++) {
      speed[i] += acceleration * 0.01 * step;
      array[i * 3 + 2] += speed[i] * step;
      if (array[i * 3 + 2] > 200) {
        array[i * 3 + 2] = -200;
        speed[i] = 0;
      }
    }
    position.needsUpdate = true;
  });

  return <points geometry={geometry} material={material} />;
};
