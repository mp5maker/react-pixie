import * as React from 'react';
import { useFrame } from 'react-three-fiber';
import * as THREE from 'three';
import { Water } from 'three/examples/jsm/objects/Water';

import { texture } from 'Components/Anime/ThreeJS/Ruins';

const easeInOut = (p: number) => (p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2);

/* the flood: a reflecting sea at y 0 that rises out of the streets when you arrive from /rain */
export const Ocean = ({ colors, dark, entry, phone, still }: any) => {
  const water: any = React.useMemo(() => {
    const normals = texture('Ocean/waternormals.jpg');
    normals.wrapS = normals.wrapT = THREE.RepeatWrapping;
    const size = phone ? 256 : 512;
    const mesh: any = new Water(new THREE.PlaneBufferGeometry(6000, 6000), {
      textureWidth: size,
      textureHeight: size,
      waterNormals: normals,
      sunDirection: new THREE.Vector3(-0.3, 0.6, -1).normalize(),
      sunColor: colors.infoColor.getHex(),
      waterColor: dark ? 0x031520 : 0x6f86a8,
      distortionScale: 3.7,
      fog: true,
    });
    mesh.rotation.x = -Math.PI / 2;
    return mesh;
  }, [colors, dark, phone]);

  React.useEffect(
    () => () => {
      water.geometry.dispose();
      water.material.uniforms.mirrorSampler.value.dispose();
      water.material.dispose();
    },
    [water],
  );

  useFrame((_, delta) => {
    if (!still) water.material.uniforms.time.value += Math.min(delta, 0.1) * 0.6;
    water.position.y = entry.kind === 'flood' && !still ? -90 + 90 * easeInOut(entry.p) : 0;
  });

  return <primitive object={water} />;
};
