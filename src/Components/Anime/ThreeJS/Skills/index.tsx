import * as React from 'react';
import * as THREE from 'three';
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader.js';
import { useThree } from 'react-three-fiber';

const FLIP = { x: Math.PI, y: 0, z: 0 };
const NONE = { x: 0, y: 0, z: 0 };
const scale = (value: number) => ({ x: value, y: value, z: value });

/* now: current solutions work, drawn in cyan; the rest is the full stack years */
const LOGOS = [
  {
    name: 'react',
    position: { x: -80, y: 100, z: -400 },
    scale: scale(3),
    rotation: NONE,
  },
  {
    name: 'slack',
    position: { x: 200, y: 50, z: -200 },
    scale: scale(1),
    rotation: NONE,
  },
  {
    name: 'github',
    position: { x: 0, y: -50, z: -150 },
    scale: scale(0.5),
    rotation: { x: 0, y: 0, z: -Math.PI },
  },
  {
    name: 'webpack',
    position: { x: -200, y: -50, z: -175 },
    scale: scale(0.5),
    rotation: NONE,
  },
  {
    name: 'npm',
    position: { x: -150, y: -50, z: -175 },
    scale: scale(0.5),
    rotation: { x: 0, y: -Math.PI, z: -Math.PI },
  },
  {
    name: 'sass',
    position: { x: -125, y: 100, z: -225 },
    scale: scale(1.5),
    rotation: { x: 0, y: -Math.PI, z: -Math.PI },
  },
  {
    name: 'angular',
    position: { x: 125, y: 100, z: -250 },
    scale: scale(1),
    rotation: { x: -Math.PI, y: 0, z: 0 },
  },
  {
    name: 'trello',
    position: { x: 200, y: 0, z: -300 },
    scale: scale(1),
    rotation: NONE,
  },
  {
    name: 'django',
    position: { x: 200, y: -100, z: -400 },
    scale: scale(1),
    rotation: { x: -Math.PI, y: 0, z: 0 },
  },
  {
    name: 'bootstrap',
    position: { x: 400, y: -100, z: -400 },
    scale: scale(3),
    rotation: NONE,
  },
  {
    name: 'jquery',
    position: { x: -400, y: 75, z: -350 },
    scale: scale(1),
    rotation: NONE,
  },
  {
    name: 'python',
    position: { x: -150, y: -20, z: -300 },
    scale: scale(0.5),
    rotation: NONE,
  },
  {
    name: 'php',
    position: { x: 150, y: -20, z: -300 },
    scale: scale(0.5),
    rotation: { x: -Math.PI, y: 0, z: 0 },
  },
  {
    name: 'docker',
    now: true,
    /* font awesome winds this one the other way */
    clockwise: true,
    position: { x: 62, y: 186, z: -300 },
    scale: scale(0.12),
    rotation: FLIP,
  },
  {
    name: 'aws',
    now: true,
    position: { x: -239, y: 44, z: -300 },
    scale: scale(0.1),
    rotation: FLIP,
  },
  {
    name: 'linux',
    now: true,
    position: { x: 62, y: -44, z: -300 },
    scale: scale(0.12),
    rotation: FLIP,
  },
  {
    name: 'redhat',
    now: true,
    position: { x: 177, y: -133, z: -300 },
    scale: scale(0.12),
    rotation: FLIP,
  },
];

export const Skills = ({ colors }: any) => {
  const loader = React.useRef(new SVGLoader()).current;
  const { scene } = useThree();

  const onSuccessLoad = ({
    data,
    color,
    position,
    scale,
    rotation,
    clockwise = false,
  }: any) => {
    let group: any;
    let paths = data.paths;
    group = new THREE.Group();

    for (let i = 0; i < paths.length; i++) {
      let path = paths[i];
      let material = new THREE.MeshStandardMaterial({
        color,
        side: THREE.DoubleSide,
        depthWrite: false,
        metalness: 0,
        roughness: 0,
      });

      let shapes = path.toShapes(!clockwise);
      for (let j = 0; j < shapes.length; j++) {
        let shape = shapes[j];
        let geometry = new THREE.ShapeBufferGeometry(shape);
        let mesh = new THREE.Mesh(geometry, material);
        group.add(mesh);
      }
      group.scale.set(scale.x, scale.y, scale.z);
      group.rotation.set(rotation.x, rotation.y, rotation.z);
      group.position.set(position.x, position.y, position.z);
      scene.add(group);
    }

    return group;
  };

  React.useEffect(() => {
    const groups: any[] = [];
    let unmounted = false;
    LOGOS.forEach(({ name, now, ...placement }) =>
      loader.load(`/Skills/${name}.svg`, data => {
        /* a slow load can land after the scene is gone */
        if (unmounted) return;
        groups.push(
          onSuccessLoad({
            data,
            color: now ? colors.infoColor : colors.secondaryColor,
            ...placement,
          }),
        );
      }),
    );

    return () => {
      unmounted = true;
      groups.forEach(group => scene.remove(group));
    };
  }, []);

  return <></>;
};
