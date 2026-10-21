import * as React from 'react';
import { useFrame, useThree } from 'react-three-fiber';
import * as THREE from 'three';

import { Glow, KINDS, MODELS, Part, solid } from 'Components/Anime/ThreeJS/Fleet';
import { blend, seeded } from 'Components/Anime/ThreeJS/Ruins';

const easeOut = (p: number) => 1 - Math.pow(1 - p, 3);
const wave = (t: number) => 0.5 + 0.5 * Math.sin(t);
const UP = new THREE.Vector3(0, 1, 0);
/* the seam every broken world is being pulled into */
export const CORE = new THREE.Vector3(0, 0, -60);

/* four cities, each its own kind of sprawl, every one split along its meridians */
const WORLDS = [
  /* needle spires, sparse and tall */
  { seed: 11, home: [-75, 22, -70], radius: 20, chunks: 4, neon: 'dangerColor', towers: 70, width: [0.6, 1.3], height: [4, 13], spin: 0.06 },
  /* one continuous hive of low blocks */
  { seed: 23, home: [72, -10, -50], radius: 17, chunks: 3, neon: 'infoColor', towers: 150, width: [1.4, 3], height: [0.8, 2.6], spin: -0.05 },
  /* a small world inside its snapped habitat ring */
  { seed: 37, home: [30, 38, -130], radius: 12, chunks: 2, neon: 'warningColor', towers: 45, width: [1, 2], height: [2, 5], spin: 0.09, ring: 24 },
  /* drowned: only the tallest towers clear the sea */
  { seed: 53, home: [-40, -34, -110], radius: 15, chunks: 3, neon: 'infoColor', towers: 60, width: [1, 2.2], height: [1, 7], spin: -0.07, sea: 1.12 },
];

/* unit tower, base on the origin, so a scale is its footprint and height */
const BLOCK = new THREE.BoxBufferGeometry(1, 1, 1).translate(0, 0.5, 0);
const BLOCK_EDGES = new THREE.EdgesGeometry(BLOCK);
const SHARD = solid(new THREE.TetrahedronBufferGeometry(1));
const SEAM = solid(new THREE.IcosahedronBufferGeometry(6, 0));
const BALL = new THREE.SphereBufferGeometry(1, 16, 12);

type Piece = { geometry: THREE.BufferGeometry; color: THREE.Color };

/* many small pieces baked into one buffer: one draw call per chunk for its fill, lines and lights */
const bake = (list: Piece[]) => {
  const position: number[] = [];
  const color: number[] = [];
  list.forEach(({ geometry, color: tint }) => {
    const flat = geometry.index ? geometry.toNonIndexed() : geometry;
    const array = flat.attributes.position.array;
    for (let index = 0; index < array.length; index += 3) {
      position.push(array[index], array[index + 1], array[index + 2]);
      color.push(tint.r, tint.g, tint.b);
    }
    geometry.dispose();
    flat.dispose();
  });
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(position, 3));
  geometry.setAttribute('color', new THREE.Float32BufferAttribute(color, 3));
  return geometry;
};

const at = (phi: number, theta: number) =>
  new THREE.Vector3(-Math.cos(phi) * Math.sin(theta), Math.cos(theta), Math.sin(phi) * Math.sin(theta));

/* one world as wedges of shell, solid cut faces and the city on top */
const planet = (world: any, colors: any, dark: boolean, phone: boolean) => {
  const random = seeded(world.seed);
  const range = (min: number, max: number) => min + random() * (max - min);
  const neon: THREE.Color = colors[world.neon];
  const fill: THREE.Color = colors.backgroundColor;
  const grid = colors.secondaryColor.clone().lerp(fill, dark ? 0.55 : 0.35);
  /* the cut faces glow faintly, like the core showing through */
  const strata = fill.clone().lerp(neon, dark ? 0.22 : 0.3);
  const lit = [neon, colors.primaryColor, neon.clone().lerp(colors.warningColor, 0.5)];
  const r = world.radius;
  const start = range(0, Math.PI * 2);
  const share = (Math.PI * 2) / world.chunks;
  const cuts = Array.from({ length: world.chunks }, (_, index) => start + share * (index + range(-0.2, 0.2)));

  return cuts.map((from, index) => {
    const to = index === cuts.length - 1 ? cuts[0] + Math.PI * 2 : cuts[index + 1];
    const length = to - from;
    const fills: Piece[] = [];
    const lines: Piece[] = [];
    const lights: number[] = [];
    const tints: number[] = [];

    const shell = new THREE.SphereBufferGeometry(r, Math.max(3, Math.round(length * 3)), phone ? 8 : 10, from, length);
    lines.push({ geometry: new THREE.EdgesGeometry(shell), color: grid });
    fills.push({ geometry: shell, color: fill });
    [from, to].forEach(phi => {
      /* half a disc on the cut plane: x maps to the meridian at phi */
      const cap = new THREE.CircleBufferGeometry(r, 10, -Math.PI / 2, Math.PI).rotateY(Math.PI - phi);
      lines.push({ geometry: new THREE.EdgesGeometry(cap), color: strata.clone().lerp(neon, 0.4) });
      fills.push({ geometry: cap, color: strata });
    });

    const matrix = new THREE.Matrix4();
    const turn = new THREE.Quaternion();
    const side = new THREE.Vector3();
    const towers = Math.round((world.towers * length) / (Math.PI * 2) * (phone ? 0.55 : 1));
    for (let tower = 0; tower < towers; tower++) {
      const dir = at(range(from + 0.1, to - 0.1), range(0.35, Math.PI - 0.35));
      const width = range(world.width[0], world.width[1]);
      const height = range(world.height[0], world.height[1]);
      turn.setFromUnitVectors(UP, dir);
      matrix.compose(dir.clone().multiplyScalar(r - 0.2), turn, new THREE.Vector3(width, height, width));
      fills.push({ geometry: BLOCK.clone().applyMatrix4(matrix), color: fill });
      lines.push({ geometry: BLOCK_EDGES.clone().applyMatrix4(matrix), color: neon });
      /* a few lit windows on one face */
      side.set(random() < 0.5 ? 1 : -1, 0, 0).applyQuaternion(turn).multiplyScalar(width * 0.5 + 0.05);
      const windows = Math.max(1, Math.round(height / 2));
      for (let window = 0; window < windows; window++) {
        const point = dir.clone().multiplyScalar(r + height * range(0.15, 0.95)).add(side);
        const tint = lit[Math.floor(random() * lit.length)];
        lights.push(point.x, point.y, point.z);
        tints.push(tint.r, tint.g, tint.b);
      }
    }

    const lamps = new THREE.BufferGeometry();
    lamps.setAttribute('position', new THREE.Float32BufferAttribute(lights, 3));
    lamps.setAttribute('color', new THREE.Float32BufferAttribute(tints, 3));
    const middle = from + length / 2;
    return {
      fill: bake(fills),
      lines: bake(lines),
      lamps,
      sea: world.sea ? new THREE.SphereBufferGeometry(r * world.sea, 12, 8, from, length) : null,
      /* which way this wedge drifts off, and how far it gets before the seam pulls it back */
      dir: new THREE.Vector3(-Math.cos(middle), range(-0.25, 0.25), Math.sin(middle)).normalize(),
      gap: r * range(0.3, 0.5),
      phase: range(0, Math.PI * 2),
    };
  });
};

/* the snapped habitat ring: a few arcs, each drifting off its own way */
const arcs = (world: any) => {
  const random = seeded(world.seed + 1);
  return Array.from({ length: 3 }, (_, index) => ({
    shape: solid(new THREE.TorusBufferGeometry(world.ring, 0.8, 4, 20, (Math.PI * 2) / 3 - 0.5).rotateZ(index * ((Math.PI * 2) / 3))),
    phase: random() * Math.PI * 2,
  }));
};

const STAR = new THREE.Vector3();
const stars = (count: number) => {
  const random = seeded(7);
  const position: number[] = [];
  for (let index = 0; index < count; index++) {
    STAR.set(random() - 0.5, random() - 0.5, random() - 0.5).setLength(800 + random() * 400);
    position.push(STAR.x, STAR.y, STAR.z);
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(position, 3));
  return geometry;
};

/* scrap from every world, circling the seam in one disc */
const disc = (count: number) => {
  const random = seeded(91);
  const fills: Piece[] = [];
  const lines: Piece[] = [];
  const matrix = new THREE.Matrix4();
  const white = new THREE.Color(1, 1, 1);
  for (let index = 0; index < count; index++) {
    const angle = random() * Math.PI * 2;
    const reach = 14 + Math.pow(random(), 0.7) * 50;
    const size = 0.4 + random() * 1.6;
    matrix.compose(
      new THREE.Vector3(Math.cos(angle) * reach, (random() - 0.5) * 6, Math.sin(angle) * reach),
      new THREE.Quaternion().setFromEuler(new THREE.Euler(random() * 6, random() * 6, random() * 6)),
      new THREE.Vector3(size, size, size),
    );
    fills.push({ geometry: SHARD.geometry.clone().applyMatrix4(matrix), color: white });
    lines.push({ geometry: SHARD.edges.clone().applyMatrix4(matrix), color: white });
  }
  return { fill: bake(fills), lines: bake(lines) };
};

const HERE = new THREE.Vector3();
const AHEAD = new THREE.Vector3();
const SPOT = new THREE.Vector3();

/* broken planets, the craft towing their pieces, and the seam pulling it all together */
export const Planets = ({ colors: scene, dark, phone, entry, still }: any) => {
  /* volt washes out on the light sky: the ring world's lines take a darker shade of it */
  const colors = React.useMemo(
    () => (dark ? scene : { ...scene, warningColor: scene.warningColor.clone().lerp(scene.primaryColor, 0.45) }),
    [scene, dark],
  );
  const { size }: any = useThree();
  const portrait = size.width < size.height;
  const worlds = React.useMemo(
    () =>
      WORLDS.map(world => ({
        ...world,
        chunks: planet(world, colors, dark, phone),
        arcs: world.ring ? arcs(world) : null,
      })),
    [colors, dark, phone],
  );
  const sky = React.useMemo(() => stars(phone ? 700 : 1600), [phone]);
  const scrap = React.useMemo(() => disc(phone ? 60 : 140), [phone]);
  const ships = React.useMemo(
    () =>
      Array.from({ length: phone ? 3 : 6 }, (_, index) => ({
        kind: KINDS[index % KINDS.length],
        world: index % WORLDS.length,
        chunk: index,
        neon: WORLDS[index % WORLDS.length].neon,
        phase: index * 1.9,
        speed: 0.25 + (index % 3) * 0.08,
      })),
    [phone],
  );
  /* one buffer for every tether: chunk to seam, ship to the piece it tows */
  const tethers = React.useMemo(() => {
    const count = worlds.reduce((total, world) => total + world.chunks.length, 0) + ships.length;
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(count * 6), 3));
    return geometry;
  }, [worlds, ships]);

  const materials = React.useMemo(
    () => ({
      fill: new THREE.MeshBasicMaterial({
        vertexColors: true,
        side: THREE.DoubleSide,
        polygonOffset: true,
        polygonOffsetFactor: 1,
        polygonOffsetUnits: 1,
      }),
      lines: new THREE.LineBasicMaterial({ vertexColors: true }),
      lamps: new THREE.PointsMaterial({ vertexColors: true, size: phone ? 0.7 : 0.55 }),
      sea: new THREE.MeshBasicMaterial({
        color: colors.infoColor,
        transparent: true,
        opacity: dark ? 0.16 : 0.22,
        blending: blend(dark),
        depthWrite: false,
        side: THREE.DoubleSide,
      }),
      stars: new THREE.PointsMaterial({ color: colors.primaryColor, size: 1.5, sizeAttenuation: false, fog: false }),
      scrap: new THREE.MeshBasicMaterial({
        color: colors.backgroundColor,
        polygonOffset: true,
        polygonOffsetFactor: 1,
        polygonOffsetUnits: 1,
      }),
      scrapLines: new THREE.LineBasicMaterial({ color: colors.secondaryColor }),
      tethers: new THREE.LineBasicMaterial({
        color: colors.infoColor,
        transparent: true,
        opacity: dark ? 0.35 : 0.5,
        blending: blend(dark),
        depthWrite: false,
      }),
    }),
    [colors, dark, phone],
  );

  React.useEffect(
    () => () => {
      worlds.forEach(world =>
        world.chunks.forEach(chunk => {
          chunk.fill.dispose();
          chunk.lines.dispose();
          chunk.lamps.dispose();
          if (chunk.sea) chunk.sea.dispose();
        }),
      );
    },
    [worlds],
  );
  React.useEffect(() => () => sky.dispose(), [sky]);
  React.useEffect(() => () => [scrap.fill, scrap.lines].forEach(geometry => geometry.dispose()), [scrap]);
  React.useEffect(() => () => tethers.dispose(), [tethers]);
  React.useEffect(() => () => Object.values(materials).forEach((material: any) => material.dispose()), [materials]);

  const planets = React.useRef<any[]>([]);
  const pieces = React.useRef<any[]>([]);
  const rings = React.useRef<any[]>([]);
  const craft = React.useRef<any[]>([]);
  const seam: any = React.useRef();
  const swirl: any = React.useRef();

  useFrame(({ clock }) => {
    /* reduced motion: every frame is the same frame */
    const t = still ? 0 : clock.elapsedTime;
    /* on arrival the pieces come in from far apart */
    const scatter = 1 + 5 * (1 - easeOut(entry.p));
    const lines = tethers.attributes.position as THREE.BufferAttribute;
    let line = 0;
    const tie = (from: THREE.Vector3, to: THREE.Vector3) => {
      lines.setXYZ(line++, from.x, from.y, from.z);
      lines.setXYZ(line++, to.x, to.y, to.z);
    };

    worlds.forEach((world, index) => {
      const group = planets.current[index];
      if (!group) return;
      /* each world leans in toward the seam, then gets thrown back out */
      const pull = 0.18 * wave(t * 0.16 + world.seed);
      group.position
        .set(world.home[0] * (portrait ? 0.42 : 1), world.home[1] * (portrait ? 1.5 : 1), world.home[2])
        .lerp(CORE, pull);
      group.rotation.y = t * world.spin;
      world.chunks.forEach((chunk, part) => {
        const piece = pieces.current[index * 8 + part];
        if (!piece) return;
        const reach = chunk.gap * scatter * (0.2 + 0.8 * wave(t * 0.35 + chunk.phase));
        piece.position.copy(chunk.dir).multiplyScalar(reach);
        piece.rotation.set(Math.sin(t * 0.3 + chunk.phase) * 0.1, 0, Math.cos(t * 0.25 + chunk.phase) * 0.1);
        SPOT.copy(piece.position).applyAxisAngle(UP, group.rotation.y).add(group.position);
        tie(SPOT, CORE);
      });
      if (world.arcs)
        world.arcs.forEach((arc, part) => {
          const ring = rings.current[part];
          if (!ring) return;
          ring.position.set(0, Math.sin(t * 0.4 + arc.phase) * 2, 0).addScaledVector(UP, (scatter - 1) * 4 * (part - 1));
          ring.rotation.set(1.1 + Math.sin(t * 0.2 + arc.phase) * 0.06, 0, t * 0.05 + (scatter - 1) * 0.3 * (part + 1));
        });
    });

    ships.forEach((ship, index) => {
      const model = craft.current[index];
      const group = planets.current[ship.world];
      if (!model || !group) return;
      const world = worlds[ship.world];
      const chunk = world.chunks[ship.chunk % world.chunks.length];
      /* each craft circles a point that swings between its world and the seam */
      const place = (time: number, out: THREE.Vector3) => {
        const angle = time * ship.speed + ship.phase;
        const orbit = world.radius * 1.7;
        return out
          .copy(group.position)
          .lerp(CORE, 0.25 + 0.3 * wave(time * 0.2 + ship.phase))
          .add(SPOT.set(Math.cos(angle) * orbit, Math.sin(angle * 0.7) * orbit * 0.35, Math.sin(angle) * orbit));
      };
      place(t, HERE);
      place(t + 0.1, AHEAD);
      model.position.copy(HERE);
      model.lookAt(AHEAD);
      SPOT.copy(chunk.dir)
        .multiplyScalar(world.radius * 0.6)
        .applyAxisAngle(UP, group.rotation.y)
        .add(group.position);
      tie(HERE, SPOT);
    });
    lines.needsUpdate = true;

    if (seam.current) {
      seam.current.rotation.set(t * 0.2, t * 0.3, 0);
      const beat = 1 + 0.08 * Math.sin(t * 2.2);
      seam.current.scale.set(beat, beat, beat);
    }
    if (swirl.current) swirl.current.rotation.y = t * 0.05;
  });

  return (
    <>
      <points geometry={sky} material={materials.stars} />
      {worlds.map((world, index) => (
        <group key={world.seed} ref={(group: any) => (planets.current[index] = group)} position={world.home as any}>
          <Glow shape={BALL} color={colors[world.neon]} scale={[world.radius * 0.32, world.radius * 0.32, world.radius * 0.32]} />
          {world.chunks.map((chunk, part) => (
            <group key={part} ref={(group: any) => (pieces.current[index * 8 + part] = group)}>
              <mesh geometry={chunk.fill} material={materials.fill} />
              <lineSegments geometry={chunk.lines} material={materials.lines} />
              <points geometry={chunk.lamps} material={materials.lamps} />
              {chunk.sea && <mesh geometry={chunk.sea} material={materials.sea} />}
            </group>
          ))}
          {world.arcs &&
            world.arcs.map((arc, part) => (
              <group key={part} ref={(group: any) => (rings.current[part] = group)}>
                <Part shape={arc.shape} fill={colors.backgroundColor} line={colors[world.neon]} />
              </group>
            ))}
        </group>
      ))}
      <group position={CORE as any}>
        <group ref={seam}>
          <Part shape={SEAM} fill={colors.backgroundColor} line={colors.infoColor} />
          <Glow shape={BALL} color={colors.infoColor} scale={[2.4, 2.4, 2.4]} />
        </group>
        <group ref={swirl} rotation={[0.35, 0, 0.12]}>
          <mesh geometry={scrap.fill} material={materials.scrap} />
          <lineSegments geometry={scrap.lines} material={materials.scrapLines} />
        </group>
      </group>
      <lineSegments geometry={tethers} material={materials.tethers} frustumCulled={false} />
      {ships.map((ship, index) => {
        const Model = MODELS[ship.kind];
        return (
          <group key={index} ref={(group: any) => (craft.current[index] = group)} scale={[2.2, 2.2, 2.2]}>
            <Model colors={colors} line={colors[ship.neon]} glow={colors.dangerColor} />
          </group>
        );
      })}
    </>
  );
};
