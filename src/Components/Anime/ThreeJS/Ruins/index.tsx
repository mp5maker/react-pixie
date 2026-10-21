import * as React from 'react';
import { useFrame, useThree } from 'react-three-fiber';
import * as THREE from 'three';

import { MODELS, Part, solid } from 'Components/Anime/ThreeJS/Fleet';

/* mulberry32: one seed gives one skyline, so /rain and /bird show the same city before and after the flood */
export const seeded = (seed: number) => () => {
  seed = (seed + 0x6d2b79f5) | 0;
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

export const isDark = (colors: any) =>
  colors.backgroundColor.getHSL({ h: 0, s: 0, l: 0 }).l < 0.5;

/* additive light only reads on a dark sky; the light theme needs plain alpha */
export const blend = (dark: boolean) =>
  dark ? THREE.AdditiveBlending : THREE.NormalBlending;

/* scene background and fog, put back when the world unmounts */
export const Sky = ({ color, density }: any) => {
  const { scene }: any = useThree();
  React.useEffect(() => {
    scene.background = color.clone();
    scene.fog = new THREE.FogExp2(color.getHex(), density);
    return () => {
      scene.background = null;
      scene.fog = null;
    };
  }, [color, density]);
  return null;
};

const textures: any = {};
export const texture = (url: string) =>
  textures[url] || (textures[url] = new THREE.TextureLoader().load(url));

type Bucket = { position: number[]; rise: number[]; color: number[] };
const bucket = (): Bucket => ({ position: [], rise: [], color: [] });

const add = (
  target: Bucket,
  geometry: THREE.BufferGeometry,
  matrix: THREE.Matrix4,
  rise: number,
) => {
  const flat = geometry.index ? geometry.toNonIndexed() : geometry;
  flat.applyMatrix4(matrix);
  const array = flat.attributes.position.array;
  for (let index = 0; index < array.length; index += 3) {
    target.position.push(array[index], array[index + 1], array[index + 2]);
    target.rise.push(rise);
  }
};

const corner = new THREE.Vector3();
const QUAD = [0, 1, 2, 0, 2, 3];
/* a flat rectangle drawn straight into a bucket: thousands of windows without thousands of geometries */
const quad = (
  target: Bucket,
  matrix: THREE.Matrix4,
  [u, v, halfWidth, halfHeight]: number[],
  rise: number,
  color: THREE.Color,
) => {
  const points = [
    [u - halfWidth, v - halfHeight],
    [u + halfWidth, v - halfHeight],
    [u + halfWidth, v + halfHeight],
    [u - halfWidth, v + halfHeight],
  ];
  QUAD.forEach(index => {
    corner.set(points[index][0], points[index][1], 0).applyMatrix4(matrix);
    target.position.push(corner.x, corner.y, corner.z);
    target.rise.push(rise);
    target.color.push(color.r, color.g, color.b);
  });
};

const line = (
  target: Bucket,
  matrix: THREE.Matrix4,
  [x1, y1, x2, y2]: number[],
  rise: number,
  color: THREE.Color,
) => {
  [
    [x1, y1],
    [x2, y2],
  ].forEach(([x, y]) => {
    corner.set(x, y, 0).applyMatrix4(matrix);
    target.position.push(corner.x, corner.y, corner.z);
    target.rise.push(rise);
    target.color.push(color.r, color.g, color.b);
  });
};

const pack = ({ position, rise, color }: Bucket) => {
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute(
    'position',
    new THREE.Float32BufferAttribute(position, 3),
  );
  geometry.setAttribute('rise', new THREE.Float32BufferAttribute(rise, 1));
  if (color.length)
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(color, 3));
  return geometry;
};

/* several small geometries as one, positions only */
export const merge = (list: THREE.BufferGeometry[]) => {
  const target = bucket();
  list.forEach(geometry => add(target, geometry, new THREE.Matrix4(), 0));
  return pack(target);
};

const CELL = 60;
/* landing pads sit on intact roofs: grid x, grid z, roof height above ground or water */
const PADS = [
  [-1, -2, 26],
  [2, -4, 40],
  [-3, -7, 58],
  [1, -10, 34],
];
const DAMAGE = ['snapped', 'snapped', 'toppled', 'gutted', 'gutted', 'none'];
const WRECKS = [
  ['fighter', 8, -250],
  ['shuttle', 92, -96],
  ['starship', -152, -330],
  ['saucer', 205, -470],
];

const cache: any = {};

/* the whole ruined city as data: merged buffers for the buildings plus the spots other systems use */
export const city = ({ count, sunk, colors }: any) => {
  const key = `${count}:${sunk}:${colors.backgroundColor.getHexString()}`;
  if (cache[key]) return cache[key];

  const rand = seeded(11);
  const range = (min: number, max: number) => min + rand() * (max - min);
  const pick = (list: any[]) => list[Math.floor(rand() * list.length)];
  const fill = bucket();
  const edges = bucket();
  const windows = bucket();
  const signs = bucket();
  const signLines = bucket();
  const flicker = bucket();
  const flickerLines = bucket();
  const roofs: THREE.Vector3[] = [];
  const fires: any[] = [];
  const pads: THREE.Vector3[] = [];
  const ruins: THREE.Vector3[] = [];
  const maxFires = Math.round(count / 8);

  const dim = colors.primaryColor.clone().lerp(colors.backgroundColor, 0.45);
  const neon = [colors.infoColor, colors.dangerColor, colors.warningColor];
  const glass = () => {
    const roll = rand();
    if (roll < 0.72) return dim;
    if (roll < 0.84) return colors.infoColor;
    if (roll < 0.94) return colors.dangerColor;
    return colors.warningColor;
  };

  const box = (
    size: number[],
    matrix: THREE.Matrix4,
    rise: number,
    grounded = true,
  ) => {
    const geometry = new THREE.BoxBufferGeometry(size[0], size[1], size[2]);
    if (grounded) geometry.translate(0, size[1] / 2, 0);
    add(edges, new THREE.EdgesGeometry(geometry), matrix, rise);
    add(fill, geometry, matrix, rise);
  };

  /* torn steel sticking out of a break */
  const girders = (
    width: number,
    depth: number,
    matrix: THREE.Matrix4,
    rise: number,
  ) => {
    const total = 3 + Math.floor(rand() * 4);
    for (let index = 0; index < total; index++) {
      const length = range(5, 16);
      const local = new THREE.Matrix4()
        .makeTranslation(
          range(-width / 2, width / 2),
          0,
          range(-depth / 2, depth / 2),
        )
        .multiply(
          new THREE.Matrix4().makeRotationFromEuler(
            new THREE.Euler(range(-0.6, 0.6), 0, range(-0.6, 0.6)),
          ),
        );
      box([0.8, length, 0.8], matrix.clone().multiply(local), rise);
    }
  };

  const windowsOn = (
    size: number[],
    matrix: THREE.Matrix4,
    rise: number,
    upTo: number,
  ) => {
    const [width, height, depth] = size;
    const faces = [
      [width, depth / 2, 0],
      [width, depth / 2, Math.PI],
      [depth, width / 2, Math.PI / 2],
      [depth, width / 2, -Math.PI / 2],
    ];
    faces.forEach(([span, offset, yaw]) => {
      const columns = Math.floor(span / 5);
      const rows = Math.floor((height * upTo) / 5.5);
      const face = matrix
        .clone()
        .multiply(new THREE.Matrix4().makeRotationY(yaw))
        .multiply(new THREE.Matrix4().makeTranslation(0, 0, offset + 0.25));
      for (let row = 1; row < rows; row++) {
        for (let column = 0; column < columns; column++) {
          if (rand() > 0.075) continue;
          const u = (column - (columns - 1) / 2) * 5;
          const v = row * 5.5;
          /* under the waterline nothing is lit */
          if (corner.set(u, v, 0).applyMatrix4(face).y < 1) continue;
          quad(windows, face, [u, v, 1.1, 1.5], rise, glass());
        }
      }
    });
  };

  /* neon: blades sticking out of a facade or billboards flat on it, some hanging loose */
  const sign = (size: number[], matrix: THREE.Matrix4, rise: number) => {
    const [width, height, depth] = size;
    const blade = rand() < 0.6;
    const broken = rand() < 0.35;
    const flickering = broken || rand() < 0.2;
    const color = pick(neon);
    const yaw = pick([0, Math.PI, Math.PI / 2, -Math.PI / 2]);
    const span = yaw === 0 || yaw === Math.PI ? width : depth;
    const offset = yaw === 0 || yaw === Math.PI ? depth / 2 : width / 2;
    const signWidth = blade ? 6 : span * 0.7;
    const signHeight = blade ? range(14, 26) : range(6, 10);
    const v = range(signHeight, Math.max(signHeight + 1, height * 0.8));
    let local = new THREE.Matrix4()
      .makeRotationY(yaw)
      .multiply(
        blade
          ? new THREE.Matrix4()
              .makeTranslation(span / 2 - 2, v, offset + 4)
              .multiply(new THREE.Matrix4().makeRotationY(Math.PI / 2))
          : new THREE.Matrix4().makeTranslation(0, v, offset + 0.6),
      );
    if (broken)
      local = local
        .multiply(new THREE.Matrix4().makeTranslation(0, signHeight / 2, 0))
        .multiply(
          new THREE.Matrix4().makeRotationZ(pick([-1, 1]) * range(0.3, 0.8)),
        )
        .multiply(new THREE.Matrix4().makeTranslation(0, -signHeight / 2, 0));
    const at = matrix.clone().multiply(local);
    if (corner.set(0, 0, 0).applyMatrix4(at).y < 2) return;
    const surface = flickering ? flicker : signs;
    const lines = flickering ? flickerLines : signLines;
    const halfWidth = signWidth / 2;
    const halfHeight = signHeight / 2;
    quad(surface, at, [0, 0, halfWidth, halfHeight], rise, color);
    [
      [-halfWidth, -halfHeight, halfWidth, -halfHeight],
      [halfWidth, -halfHeight, halfWidth, halfHeight],
      [halfWidth, halfHeight, -halfWidth, halfHeight],
      [-halfWidth, halfHeight, -halfWidth, -halfHeight],
    ].forEach(edge => line(lines, at, edge, rise, color));
    /* glyphs: stacked marks down a blade, strokes across a billboard */
    const marks = blade ? Math.floor(signHeight / 4) : 3;
    for (let index = 0; index < marks; index++) {
      if (blade) {
        const y = halfHeight - 2.5 - index * 4;
        line(lines, at, [-1.6, y, 1.6, y], rise, color);
        line(lines, at, [range(-1.6, 1.6), y, range(-1.6, 1.6), y - 2.2], rise, color);
      } else {
        const y = halfHeight - 2 - index * ((signHeight - 3) / 3);
        line(lines, at, [-halfWidth + 2, y, range(-halfWidth + 4, halfWidth - 2), y], rise, color);
      }
    }
  };

  const tower = (x: number, z: number, pad: number[] | undefined) => {
    const far = THREE.MathUtils.clamp((60 - z) / 960, 0, 1);
    const sink = sunk ? range(30, 80) : 0;
    const rise = far * 0.5 + rand() * 0.12;
    let width = pad ? 34 : range(18, 36);
    let depth = pad ? 34 : range(18, 36);
    const height = pad
      ? pad[2] + sink
      : sink + range(14, 50) + rand() * rand() * 230 * (0.3 + far);
    const lean = sunk && !pad ? 0.08 : 0;
    const base = new THREE.Matrix4()
      .makeRotationFromEuler(
        new THREE.Euler(
          range(-lean, lean),
          pad ? 0 : range(-0.15, 0.15),
          range(-lean, lean),
        ),
      )
      .setPosition(new THREE.Vector3(x, -sink, z));
    const damage = pad ? 'none' : pick(DAMAGE);
    const levels = height > 110 ? 3 : height > 50 ? 2 : 1;
    let y = 0;

    for (let level = 0; level < levels; level++) {
      const last = level === levels - 1;
      const segment = last ? height - y : height * range(0.35, 0.5);
      if (last && damage === 'toppled' && level > 0) {
        /* the crown came down into the street */
        const yaw = range(0, Math.PI * 2);
        const reach = segment / 2 + width * 0.6;
        const lying = new THREE.Matrix4()
          .makeTranslation(
            x + Math.cos(yaw) * reach,
            sunk ? range(-4, 4) : width * 0.3,
            z + Math.sin(yaw) * reach,
          )
          .multiply(
            new THREE.Matrix4().makeRotationFromEuler(
              new THREE.Euler(range(-0.15, 0.15), yaw, Math.PI / 2 - 0.12),
            ),
          );
        box([width, segment, depth], lying, rise, false);
        const stump = base.clone().multiply(new THREE.Matrix4().makeTranslation(0, y, 0));
        girders(width, depth, stump, rise);
        ruins.push(new THREE.Vector3(x, y - sink, z));
        break;
      }
      let local = new THREE.Matrix4().makeTranslation(0, y, 0);
      if (last && damage === 'snapped')
        /* the broken crown leans off its stump */
        local = new THREE.Matrix4()
          .makeTranslation(range(-4, 4), y + 1, range(-4, 4))
          .multiply(
            new THREE.Matrix4().makeRotationFromEuler(
              new THREE.Euler(
                range(-0.3, 0.3),
                0,
                pick([-1, 1]) * range(0.18, 0.4),
              ),
            ),
          );
      const matrix = base.clone().multiply(local);
      const size = [width, segment, depth];
      box(size, matrix, rise);
      windowsOn(size, matrix, rise, last && damage === 'gutted' ? 0.55 : 1);
      if (rand() < 0.45 - far * 0.25) sign(size, matrix, rise);
      if (last) {
        const top = matrix.clone().multiply(new THREE.Matrix4().makeTranslation(0, segment, 0));
        if (damage === 'gutted' || damage === 'snapped') girders(width, depth, top, rise);
        if (damage === 'none' && !pad && rand() < 0.5)
          box([0.8, range(10, 30), 0.8], top, rise);
        const crown = new THREE.Vector3().setFromMatrixPosition(top);
        roofs.push(crown);
        if (pad) pads.push(crown.clone().setY(crown.y + 0.3));
        if (damage !== 'none') ruins.push(crown);
        if (damage !== 'none' && fires.length < maxFires && rand() < 0.55)
          fires.push({ position: crown.clone(), size: range(3, 6) * (1 + far * 1.5) });
      }
      y += segment;
      width *= range(0.62, 0.85);
      depth *= range(0.62, 0.85);
    }
  };

  const density = Math.min(1, count / 238);
  for (let gx = -7; gx <= 7; gx++) {
    for (let gz = -15; gz <= 1; gz++) {
      const pad = PADS.find(([px, pz]) => px === gx && pz === gz);
      /* the avenue stays open: it is the view down the middle */
      if (gx === 0 || (!pad && rand() > density)) continue;
      tower(
        gx * CELL + (pad ? 0 : range(-8, 8)),
        gz * CELL + (pad ? 0 : range(-8, 8)),
        pad,
      );
    }
  }

  /* rubble: half piled at the ruins, half strewn down the streets */
  const pieces = Math.round(count * (sunk ? 0.6 : 2));
  for (let index = 0; index < pieces; index++) {
    const near = ruins.length && rand() < 0.5 ? pick(ruins) : undefined;
    const size = range(1.5, 6);
    const x = near ? near.x + range(-26, 26) : Math.round(range(-7, 7)) * CELL + 30 + range(-6, 6);
    const z = near ? near.z + range(-26, 26) : range(-900, 60);
    const matrix = new THREE.Matrix4()
      .makeRotationFromEuler(new THREE.Euler(range(0, 3), range(0, 3), range(0, 3)))
      .setPosition(new THREE.Vector3(x, sunk ? range(-1, 1) : size * 0.3, z));
    if (rand() < 0.5) box([size, size * range(0.3, 1), size * range(0.5, 2)], matrix, 0.6, false);
    else {
      const shard = new THREE.TetrahedronBufferGeometry(size * 0.7);
      add(edges, new THREE.EdgesGeometry(shard), matrix, 0.6);
      add(fill, shard, matrix, 0.6);
    }
  }

  const wrecks = WRECKS.slice(0, sunk ? 3 : 4).map(([kind, x, z]: any) => {
    const position = new THREE.Vector3(x, sunk ? -1 : 2, z);
    if (fires.length < maxFires + 4)
      fires.push({ position: position.clone().setY(position.y + 2), size: 4 });
    return {
      kind,
      position,
      rotation: [range(0.5, 0.9), range(0, Math.PI * 2), range(-0.5, 0.5)],
    };
  });

  if (!sunk) {
    pads.push(new THREE.Vector3(0, 0.3, -40));
    /* lane markings down the avenue */
    for (let z = 100; z > -900; z -= 14)
      line(signLines, new THREE.Matrix4().makeRotationX(-Math.PI / 2), [0, -z, 0, -z + 7], 0.3, colors.infoColor);
  }

  cache[key] = {
    sunk,
    fill: pack(fill),
    edges: pack(edges),
    windows: pack(windows),
    signs: pack(signs),
    signLines: pack(signLines),
    flicker: pack(flicker),
    flickerLines: pack(flickerLines),
    roofs: roofs.sort((a, b) => b.y - a.y),
    fires,
    pads,
    wrecks,
  };
  return cache[key];
};

/* the /experience entrance: every building grows out of the ground, near ones first */
const grow = (material: THREE.Material, build: any, base: any) => {
  material.onBeforeCompile = (shader: any) => {
    shader.uniforms.uBuild = build;
    shader.uniforms.uBase = base;
    shader.vertexShader = `attribute float rise;\nuniform float uBuild;\nuniform float uBase;\n${shader.vertexShader}`.replace(
      '#include <begin_vertex>',
      `#include <begin_vertex>
      float grown = clamp((uBuild - rise) / 0.35, 0.0, 1.0);
      transformed.y = uBase + (transformed.y - uBase) * max(1.0 - pow(1.0 - grown, 3.0), 0.001);`,
    );
  };
  return material;
};

const PAD = solid(new THREE.RingBufferGeometry(5, 8, 6).rotateX(-Math.PI / 2));
const BEACON = new THREE.BoxBufferGeometry(0.9, 0.9, 0.9);
const HEX = Array.from({ length: 6 }, (_, index) => [
  Math.cos((index * Math.PI) / 3) * 8.6,
  Math.sin((index * Math.PI) / 3) * 8.6,
]);
const FLAME = new THREE.ConeBufferGeometry(1, 1, 7, 1, true).translate(0, 0.5, 0);
const EMBERS = 16;
const PLUMES = 9;

const Burn = ({ fires, colors, dark, still }: any) => {
  const flames = React.useRef<any[]>([]);
  const parts = React.useMemo(() => {
    const total = fires.length;
    const system = (per: number) => {
      const positions = new Float32Array(total * per * 3);
      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      return {
        geometry,
        positions,
        life: Float32Array.from({ length: total * per }, () => Math.random()),
        speed: Float32Array.from({ length: total * per }, () => 0.25 + Math.random() * 0.5),
        angle: Float32Array.from({ length: total * per }, () => Math.random() * Math.PI * 2),
      };
    };
    return {
      embers: system(EMBERS),
      smoke: system(PLUMES),
      outer: new THREE.MeshBasicMaterial({
        color: colors.warningColor,
        transparent: true,
        opacity: 0.5,
        blending: blend(dark),
        depthWrite: false,
        side: THREE.DoubleSide,
      }),
      inner: new THREE.MeshBasicMaterial({
        color: colors.dangerColor,
        transparent: true,
        opacity: 0.75,
        blending: blend(dark),
        depthWrite: false,
        side: THREE.DoubleSide,
      }),
      sparks: new THREE.PointsMaterial({
        color: colors.warningColor,
        size: 2.5,
        map: texture('Circle/circle.png'),
        transparent: true,
        depthWrite: false,
        blending: blend(dark),
      }),
      haze: new THREE.PointsMaterial({
        color: dark
          ? colors.secondaryColor.clone().lerp(colors.backgroundColor, 0.45)
          : colors.secondaryColor,
        size: 34,
        map: texture('Cloud/cloud.png'),
        transparent: true,
        opacity: dark ? 0.4 : 0.22,
        depthWrite: false,
      }),
    };
  }, [fires, colors, dark]);

  React.useEffect(
    () => () => {
      [parts.outer, parts.inner, parts.sparks, parts.haze].forEach(material => material.dispose());
      parts.embers.geometry.dispose();
      parts.smoke.geometry.dispose();
    },
    [parts],
  );

  useFrame(({ clock }, delta) => {
    const t = clock.elapsedTime;
    /* reduced motion: embers and smoke hang where they were placed */
    const dt = still ? 0 : Math.min(delta, 0.05);
    fires.forEach(({ size }: any, index: number) => {
      const lick = still ? 1 : 1 + 0.25 * Math.sin(t * 13 + index * 1.7) + 0.15 * Math.sin(t * 23 + index);
      const outer = flames.current[index * 2];
      const inner = flames.current[index * 2 + 1];
      if (outer) outer.scale.set(size, size * 2.6 * lick, size);
      if (inner) inner.scale.set(size * 0.55, size * 1.7 * (2 - lick), size * 0.55);
    });
    const rise = (system: any, per: number, place: (fire: any, k: number, angle: number, out: Float32Array, at: number) => void) => {
      for (let index = 0; index < system.life.length; index++) {
        system.life[index] = (system.life[index] + dt * system.speed[index] * (per === EMBERS ? 1 : 0.18)) % 1;
        place(fires[Math.floor(index / per)], system.life[index], system.angle[index], system.positions, index * 3);
      }
      system.geometry.attributes.position.needsUpdate = true;
    };
    rise(parts.embers, EMBERS, ({ position, size }, k, angle, out, at) => {
      out[at] = position.x + Math.sin(angle + k * 4) * size * (0.4 + k);
      out[at + 1] = position.y + k * size * 7;
      out[at + 2] = position.z + Math.cos(angle + k * 4) * size * (0.4 + k);
    });
    rise(parts.smoke, PLUMES, ({ position, size }, k, angle, out, at) => {
      out[at] = position.x + Math.sin(angle) * size * k * 3 + k * 40;
      out[at + 1] = position.y + size + k * size * 22;
      out[at + 2] = position.z + Math.cos(angle) * size * k * 3;
    });
  });

  return (
    <>
      {fires.map(({ position }: any, index: number) => (
        <group key={index} position={position}>
          <mesh
            ref={(mesh: any) => (flames.current[index * 2] = mesh)}
            geometry={FLAME}
            material={parts.outer}
          />
          <mesh
            ref={(mesh: any) => (flames.current[index * 2 + 1] = mesh)}
            geometry={FLAME}
            material={parts.inner}
          />
        </group>
      ))}
      <points geometry={parts.embers.geometry} material={parts.sparks} />
      <points geometry={parts.smoke.geometry} material={parts.haze} />
    </>
  );
};

export const Ruins = ({ plan, colors, dark, entry, still }: any) => {
  const build = React.useRef({ value: 2 }).current;
  const base = React.useRef({ value: plan.sunk ? -90 : 0 }).current;
  const beacons = React.useRef<any[]>([]);
  const materials = React.useMemo(() => {
    const surface = (opacity: number) =>
      grow(
        new THREE.MeshBasicMaterial({
          vertexColors: true,
          transparent: true,
          opacity,
          blending: blend(dark),
          depthWrite: false,
          side: THREE.DoubleSide,
        }),
        build,
        base,
      );
    const neon = () => grow(new THREE.LineBasicMaterial({ vertexColors: true, transparent: true }), build, base);
    return {
      fill: grow(
        new THREE.MeshBasicMaterial({
          color: colors.backgroundColor,
          side: THREE.DoubleSide,
          polygonOffset: true,
          polygonOffsetFactor: 1,
          polygonOffsetUnits: 1,
        }),
        build,
        base,
      ),
      edges: grow(
        new THREE.LineBasicMaterial({
          color: colors.secondaryColor.clone().lerp(colors.backgroundColor, dark ? 0.3 : 0.05),
        }),
        build,
        base,
      ),
      windows: grow(new THREE.MeshBasicMaterial({ vertexColors: true, side: THREE.DoubleSide }), build, base),
      beacon: new THREE.MeshBasicMaterial({ color: colors.warningColor }),
      signs: surface(0.3),
      signLines: neon(),
      flicker: surface(0.3),
      flickerLines: neon(),
    };
  }, [colors, dark]);

  React.useEffect(
    () => () => Object.values(materials).forEach((material: any) => material.dispose()),
    [materials],
  );

  useFrame(({ clock }) => {
    build.value = entry.kind === 'build' ? entry.p * 1.1 : 2;
    if (still) return;
    const t = clock.elapsedTime;
    /* broken signs: mostly on, dropping out in short bursts */
    const on = Math.sin(t * 7.3) + Math.sin(t * 2.9) > -1.2 ? 1 : 0.12;
    materials.flicker.opacity = 0.3 * on;
    materials.flickerLines.opacity = on;
    /* pad beacons chase around the hexagon */
    const lit = Math.floor(t * 6) % 6;
    beacons.current.forEach((beacon, index) => {
      if (beacon) beacon.visible = index % 6 === lit;
    });
  });

  return (
    <>
      {!plan.sunk && (
        <>
          <mesh rotation-x={-Math.PI / 2} position={[0, -0.1, -300]}>
            <planeBufferGeometry attach="geometry" args={[2600, 2600]} />
            <meshBasicMaterial attach="material" color={colors.backgroundColor} />
          </mesh>
          {/* the street grid sits between the blocks */}
          <gridHelper
            args={[2400, 40, colors.secondaryColor, colors.secondaryColor.clone().lerp(colors.backgroundColor, 0.55)]}
            position={[30, 0.05, -270]}
          />
        </>
      )}
      <mesh geometry={plan.fill} material={materials.fill} />
      <lineSegments geometry={plan.edges} material={materials.edges} />
      <mesh geometry={plan.windows} material={materials.windows} />
      <mesh geometry={plan.signs} material={materials.signs} />
      <lineSegments geometry={plan.signLines} material={materials.signLines} />
      <mesh geometry={plan.flicker} material={materials.flicker} />
      <lineSegments geometry={plan.flickerLines} material={materials.flickerLines} />
      {plan.pads.map((pad: THREE.Vector3, index: number) => (
        <group key={index} position={pad}>
          <Part shape={PAD} fill={colors.backgroundColor} line={colors.infoColor} />
          {HEX.map(([x, z], corner) => (
            <mesh
              key={corner}
              ref={(mesh: any) => (beacons.current[index * 6 + corner] = mesh)}
              geometry={BEACON}
              material={materials.beacon}
              position={[x, 0.5, z]}
            />
          ))}
        </group>
      ))}
      {plan.wrecks.map(({ kind, position, rotation }: any, index: number) => {
        const Model = MODELS[kind];
        return (
          <group key={index} position={position} rotation={rotation} scale={[4, 4, 4]}>
            <Model colors={colors} line={colors.secondaryColor} glow={colors.dangerColor} />
          </group>
        );
      })}
      <Burn fires={plan.fires} colors={colors} dark={dark} still={still} />
    </>
  );
};
