import * as React from 'react';
import { useFrame } from 'react-three-fiber';
import * as THREE from 'three';
import { useBox } from 'use-cannon';

import { MODELS, Part, solid } from 'Components/Anime/ThreeJS/Fleet';
import { blend } from 'Components/Anime/ThreeJS/Ruins';

const random = (min: number, max: number) => min + Math.random() * (max - min);
const spin = (speed: number) => [random(-speed, speed), random(-speed, speed), random(-speed, speed)];
const easeOut = (p: number) => 1 - Math.pow(1 - p, 3);

/* one unit cube scaled to each collider, so what you see is what collides */
const CUBE = solid(new THREE.BoxBufferGeometry(1, 1, 1));
const PANEL = new THREE.PlaneBufferGeometry(1, 1);
const RING = new THREE.RingBufferGeometry(0.85, 1, 32).rotateX(-Math.PI / 2);

/* the two drowned towers and the floors torn off them: debris lands on the upper deck,
   slides off its broken lip onto the lower floor, then off that into the flood */
const TOWERS = [
  { size: [16, 96, 18], position: [-46, 30, -8], sign: 'dangerColor' },
  { size: [14, 60, 16], position: [28, 12, -6], sign: 'infoColor' },
];
const LEDGES = [
  { size: [34, 2.5, 24], position: [-22, 60, -6], rotation: [0, 0, -0.28] },
  { size: [34, 2, 22], position: [4, 32, -4], rotation: [0, 0, 0.32] },
];
const STUMPS = [
  { size: [6, 10, 6], position: [-16, 2, 8], rotation: [0.1, 0.4, 0.12] },
  { size: [8, 6, 5], position: [10, 0, 14], rotation: [0, -0.3, -0.2] },
  { size: [5, 14, 5], position: [-30, 3, 16], rotation: [-0.15, 0.2, 0.1] },
];

/* every fifth piece is a craft that went down with the city; the rest is the city itself */
const SHAPES: any = {
  slab: () => [random(5, 9), random(0.8, 1.4), random(3, 6)],
  girder: () => [random(8, 14), 0.6, 0.6],
  sign: () => [random(4, 7), random(1.8, 3), 0.3],
  rubble: () => [random(1.5, 3), random(1.5, 3), random(1.5, 3)],
};
const ORDER = Object.keys(SHAPES);
const SHIPS = ['fighter', 'shuttle', 'starship', 'saucer'];
/* each craft's bounding box at scale 1, nose on +z */
const HULLS: any = {
  fighter: [3.8, 1, 3.6],
  shuttle: [3.8, 1.8, 4.6],
  starship: [3, 1.2, 6],
  saucer: [4.4, 1.1, 4.4],
};
const CRAFT = 2;
const NEON = ['infoColor', 'dangerColor', 'warningColor'];
/* seconds before a piece stuck on a ledge is sent round again */
const LIFE = 16;
const SPLASH = 0.9;

const pieces = (count: number) =>
  Array.from({ length: count }, (_, index) => {
    const neon = NEON[index % NEON.length];
    if (index % 5 === 4) {
      const model = SHIPS[Math.floor(index / 5) % SHIPS.length];
      return { kind: 'ship', model, size: HULLS[model].map((v: number) => v * CRAFT), sky: true, neon };
    }
    const kind = ORDER[index % ORDER.length];
    return { kind, size: SHAPES[kind](), sky: index % 3 === 0, neon };
  });

/* deck pieces drop onto the torn floor; the rest, and every craft, fall past the towers from above.
   The first drop is staggered higher so the pieces arrive one after another */
const launch = (piece: any, first: boolean) => {
  const lift = first ? random(0, 160) : 0;
  return piece.sky
    ? {
        position: [random(-34, 22), random(100, 125) + lift, random(-12, 12)],
        velocity: [random(-5, 5), random(-15, -5), random(-2, 2)],
      }
    : {
        position: [random(-34, -18), random(70, 82) + lift, random(-10, 4)],
        velocity: [random(1, 4), 0, 0],
      };
};

const Glass = ({ color, dark, ...props }: any) => (
  <mesh geometry={PANEL} {...props}>
    <meshBasicMaterial
      attach="material"
      color={color}
      transparent={true}
      opacity={0.35}
      blending={blend(dark)}
      depthWrite={false}
      side={THREE.DoubleSide}
    />
  </mesh>
);

const Block = ({ size, position, rotation, fill, line }: any) => {
  const [ref] = useBox(() => ({ mass: 0, args: size, position, rotation }));
  return (
    <group ref={ref}>
      <Part shape={CUBE} fill={fill} line={line} scale={size} />
    </group>
  );
};

/* floor lines every few metres, so a tower reads as a building and not a box */
const floors = ([width, height, depth]: number[]) => {
  const points: THREE.Vector3[] = [];
  const x = width / 2;
  const z = depth / 2;
  for (let y = -height / 2 + 4; y < height / 2; y += 4) {
    points.push(
      new THREE.Vector3(-x, y, z), new THREE.Vector3(x, y, z),
      new THREE.Vector3(x, y, z), new THREE.Vector3(x, y, -z),
      new THREE.Vector3(-x, y, z), new THREE.Vector3(-x, y, -z),
    );
  }
  return new THREE.BufferGeometry().setFromPoints(points);
};

const Tower = ({ size, position, sign, colors, dark }: any) => {
  const lines = React.useMemo(() => floors(size), [size]);
  React.useEffect(() => () => lines.dispose(), [lines]);
  return (
    <>
      <Block size={size} position={position} fill={colors.backgroundColor} line={colors.secondaryColor} />
      <group position={position}>
        <lineSegments geometry={lines}>
          <lineBasicMaterial
            attach="material"
            color={colors.secondaryColor.clone().lerp(colors.backgroundColor, dark ? 0.45 : 0.2)}
          />
        </lineSegments>
        {/* a vertical sign still lit on the face */}
        <Glass
          color={colors[sign]}
          dark={dark}
          position={[size[0] * 0.18, size[1] * 0.18, size[2] / 2 + 0.1]}
          scale={[size[0] * 0.3, size[1] * 0.3, 1]}
        />
      </group>
    </>
  );
};

const Piece = ({ piece, colors, dark, still, splash }: any) => {
  const at = React.useRef([0, 100, 0]).current;
  const life = React.useRef({ born: 0, under: false }).current;
  const [ref, api] = useBox(() => {
    const { position, velocity } = launch(piece, true);
    /* reduced motion: one frozen frame of the fall, every piece hung where it was */
    return still
      ? { type: 'Static', mass: 0, args: piece.size, position: [random(-40, 30), random(6, 72), random(-8, 16)], rotation: spin(Math.PI) }
      : {
          mass: piece.kind === 'ship' ? 4 : 1,
          args: piece.size,
          position,
          velocity,
          rotation: spin(Math.PI),
          angularVelocity: spin(piece.kind === 'ship' ? 3 : 2),
          linearDamping: 0.05,
          angularDamping: 0.1,
          allowSleep: false,
        };
  });

  React.useEffect(
    () =>
      api.position.subscribe(([x, y, z]: number[]) => {
        at[0] = x;
        at[1] = y;
        at[2] = z;
      }),
    [],
  );

  useFrame(({ clock }) => {
    if (still) return;
    const now = clock.elapsedTime;
    /* hitting the flood: a ring on the surface, then a slow sink */
    if (!life.under && at[1] < 0) {
      life.under = true;
      api.linearDamping.set(0.98);
      api.angularDamping.set(0.9);
      splash(at[0], at[2], Math.max(piece.size[0], piece.size[2]) * 0.5, now);
    }
    if (at[1] > -30 && now - life.born < LIFE) return;
    const { position, velocity } = launch(piece, false);
    api.position.set(position[0], position[1], position[2]);
    api.velocity.set(velocity[0], velocity[1], velocity[2]);
    const [ax, ay, az] = spin(piece.kind === 'ship' ? 3 : 2);
    api.angularVelocity.set(ax, ay, az);
    api.linearDamping.set(0.05);
    api.angularDamping.set(0.1);
    /* the worker reports the new position next step; don't respawn twice meanwhile */
    at[1] = position[1];
    life.born = now;
    life.under = false;
  });

  const Model = MODELS[piece.model];
  return (
    <group ref={ref}>
      {Model ? (
        <group scale={[CRAFT, CRAFT, CRAFT]}>
          <Model colors={colors} line={colors[piece.neon]} glow={colors.dangerColor} />
        </group>
      ) : (
        <group scale={piece.size}>
          <Part
            shape={CUBE}
            fill={colors.backgroundColor}
            line={piece.kind === 'sign' ? colors[piece.neon] : colors.secondaryColor}
          />
          {piece.kind === 'sign' && (
            <Glass color={colors[piece.neon]} dark={dark} position={[0, 0, 0.52]} scale={[0.86, 0.7, 1]} />
          )}
        </group>
      )}
    </group>
  );
};

const Splashes = ({ pool, colors, dark }: any) => {
  const rings = React.useRef<any[]>([]);
  const materials = React.useMemo(
    () =>
      pool.items.map(
        () =>
          new THREE.MeshBasicMaterial({
            color: colors.infoColor,
            transparent: true,
            opacity: 0,
            blending: blend(dark),
            depthWrite: false,
          }),
      ),
    [colors, dark],
  );
  React.useEffect(() => () => materials.forEach((material: THREE.Material) => material.dispose()), [materials]);

  useFrame(({ clock }) => {
    pool.items.forEach(({ x, z, size, at }: any, index: number) => {
      const ring = rings.current[index];
      if (!ring) return;
      const age = (clock.elapsedTime - at) / SPLASH;
      ring.visible = age >= 0 && age < 1;
      if (!ring.visible) return;
      const reach = size * (1 + easeOut(age) * 3);
      ring.position.set(x, 0.2, z);
      ring.scale.set(reach, 1, reach);
      materials[index].opacity = 1 - age;
    });
  });

  return pool.items.map((_: any, index: number) => (
    <mesh
      key={index}
      ref={(mesh: any) => (rings.current[index] = mesh)}
      geometry={RING}
      material={materials[index]}
      visible={false}
    />
  ));
};

/* the flood the city is sinking into */
const Flood = ({ colors, dark }: any) => {
  const grid = colors.infoColor.clone().lerp(colors.backgroundColor, dark ? 0.7 : 0.55);
  return (
    <group position={[0, 0, -400]}>
      <mesh rotation-x={-Math.PI / 2}>
        <planeBufferGeometry attach="geometry" args={[3000, 3000]} />
        <meshBasicMaterial
          attach="material"
          color={colors.backgroundColor.clone().lerp(colors.infoColor, 0.12)}
          transparent={true}
          opacity={0.9}
        />
      </mesh>
      <gridHelper args={[3000, 120, grid, grid]} position={[0, 0.05, 0]} />
    </group>
  );
};

/* what falls out of the drowned city: torn floors, girders, signs and the craft that went down with it */
export const Debris = ({ colors, dark, phone, still }: any) => {
  const list = React.useMemo(() => pieces(phone ? 14 : 30), [phone]);
  const pool = React.useRef({
    next: 0,
    items: Array.from({ length: 12 }, () => ({ x: 0, z: 0, size: 1, at: -10 })),
  }).current;
  const splash = React.useCallback((x: number, z: number, size: number, at: number) => {
    Object.assign(pool.items[pool.next], { x, z, size, at });
    pool.next = (pool.next + 1) % pool.items.length;
  }, []);
  const ledge = colors.infoColor.clone().lerp(colors.backgroundColor, dark ? 0.2 : 0);

  return (
    <>
      <Flood colors={colors} dark={dark} />
      {TOWERS.map((tower, index) => (
        <Tower key={index} {...tower} colors={colors} dark={dark} />
      ))}
      {LEDGES.map((block, index) => (
        <Block key={index} {...block} fill={colors.backgroundColor} line={ledge} />
      ))}
      {STUMPS.map((block, index) => (
        <Block key={index} {...block} fill={colors.backgroundColor} line={colors.secondaryColor} />
      ))}
      {list.map((piece, index) => (
        <Piece key={index} piece={piece} colors={colors} dark={dark} still={still} splash={splash} />
      ))}
      {!still && <Splashes pool={pool} colors={colors} dark={dark} />}
    </>
  );
};
