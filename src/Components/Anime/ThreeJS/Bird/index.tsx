import * as React from 'react';
import { useFrame } from 'react-three-fiber';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

import { blend } from 'Components/Anime/ThreeJS/Ruins';

const random = (min: number, max: number) => min + Math.random() * (max - min);
const SPECIES = ['/AnimationModel/Flamingo.glb', '/AnimationModel/Parrot.glb'];

/* the last birds are surveillance holograms now: wireframe, flickering, looping the drowned towers */
export const Bird = ({ colors, dark, phone, still }: any) => {
  const group: any = React.useRef();
  const flock = React.useRef<any[]>([]);
  const materials = React.useMemo(
    () =>
      [colors.infoColor, colors.dangerColor].map(
        color =>
          new THREE.MeshBasicMaterial({
            color,
            wireframe: true,
            morphTargets: true,
            transparent: true,
            opacity: 0.8,
            blending: blend(dark),
            depthWrite: false,
          }),
      ),
    [colors, dark],
  );

  React.useEffect(() => {
    let live = true;
    const loader = new GLTFLoader();
    const count = phone ? 3 : 5;
    SPECIES.forEach((url, species) =>
      loader.load(url, gltf => {
        if (!live || !group.current) return;
        for (let index = species; index < count; index += SPECIES.length) {
          const model = gltf.scene.clone();
          model.traverse((child: any) => {
            if (child.isMesh) child.material = materials[species];
          });
          model.scale.setScalar(0.14);
          const mixer = new THREE.AnimationMixer(model);
          mixer.clipAction(gltf.animations[0]).setDuration(random(0.9, 1.3)).play();
          group.current.add(model);
          flock.current.push({
            model,
            mixer,
            /* each bird flies its own lazy figure-eight over the water */
            radius: random(110, 190),
            height: random(60, 130),
            speed: random(0.05, 0.08) * (index % 2 ? 1 : -1),
            phase: random(0, Math.PI * 2),
          });
        }
      }),
    );
    return () => {
      live = false;
      flock.current.forEach(({ model, mixer }) => {
        mixer.stopAllAction();
        mixer.uncacheRoot(model);
        if (group.current) group.current.remove(model);
      });
      flock.current = [];
    };
  }, [materials, phone]);

  React.useEffect(() => () => materials.forEach(material => material.dispose()), [materials]);

  useFrame(({ clock }, rawDelta) => {
    const delta = still ? 0 : Math.min(rawDelta, 0.1);
    const t = still ? 0 : clock.elapsedTime;
    /* a hologram drops out now and then */
    const glitch = !still && Math.sin(t * 3.1) + Math.sin(t * 7.7) > 1.7;
    materials.forEach(material => (material.opacity = glitch ? random(0.1, 0.5) : 0.8));
    flock.current.forEach(({ model, mixer, radius, height, speed, phase }) => {
      mixer.update(delta);
      const angle = phase + t * speed;
      const x = Math.sin(angle) * radius;
      const z = -160 + Math.sin(angle * 2) * radius * 0.45;
      const y = height + Math.sin(angle * 3) * 12;
      const dx = Math.cos(angle) * radius * speed;
      const dz = Math.cos(angle * 2) * radius * 0.9 * speed;
      model.position.set(x, y, z);
      model.rotation.set(0, Math.atan2(dx, dz), -Math.sign(speed) * Math.sin(angle * 2) * 0.35, 'YXZ');
    });
  });

  return <group ref={group} />;
};
