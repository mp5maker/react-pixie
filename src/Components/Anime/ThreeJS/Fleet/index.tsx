import * as React from 'react';
import { useFrame } from 'react-three-fiber';
import * as THREE from 'three';

import { LOGOS } from 'Components/Anime/ThreeJS/Skills';

/* where the Box sits: the fleet crashes into it */
const CORE = new THREE.Vector3(0, 0, -25);
const FAR = -700;
/* seconds: dive into the core, then shards fly to where /experience draws each skill */
const CRASH = 0.6;
const SPLIT = 0.9;
const SHOCK = 0.5;
/* seconds: back from /experience the shards fly home, then their pieces rebuild every craft */
const GATHER = 0.9;
const ASSEMBLE = 0.9;
/* some craft are aimed to skim the box: touching it stalls them while they rebuild as another kind */
const GRAZE = 3.8;
const MORPH = 0.6;
const GOLD = '#E0B04A';

const random = (min: number, max: number) => min + Math.random() * (max - min);
const side = () => (Math.random() < 0.5 ? -1 : 1);
const easeOut = (p: number) => 1 - Math.pow(1 - p, 3);

const flat = (points: number[][]) =>
  new THREE.ShapeBufferGeometry(
    new THREE.Shape(points.map(([x, y]) => new THREE.Vector2(x, y))),
  );

export const solid = (geometry: THREE.BufferGeometry) => ({
  geometry,
  edges: new THREE.EdgesGeometry(geometry),
});

/* every model is a flat list of pieces, rotations baked into the geometry, so pieces can fly apart and back */

/* fighter, nose on +z */
const FIGHTER = {
  body: solid(new THREE.ConeBufferGeometry(0.45, 3, 4).rotateX(Math.PI / 2)),
  wing: solid(
    flat([
      [0, 0.7],
      [1.9, -1.1],
      [-1.9, -1.1],
    ])
      .rotateX(Math.PI / 2)
      .translate(0, 0, -0.3),
  ),
  fin: solid(
    flat([
      [-1.2, 0],
      [-0.2, 0],
      [-1.2, 0.9],
    ]).rotateY(-Math.PI / 2),
  ),
  engine: new THREE.CylinderBufferGeometry(0.22, 0.32, 0.4, 8)
    .rotateX(Math.PI / 2)
    .translate(0, 0, -1.6),
  flame: new THREE.ConeBufferGeometry(0.22, 1.6, 8)
    .rotateX(-Math.PI / 2)
    .translate(0, 0, -2.6),
};

/* three engine bells in a triangle, shared by the shuttle and the starship */
const THRUSTERS = [
  [0.22, 0.15],
  [-0.22, 0.15],
  [0, -0.2],
];

/* shuttle orbiter: fuselage, nose, delta wing, tail fin, three mains */
const SHUTTLE = {
  body: solid(
    new THREE.CylinderBufferGeometry(0.5, 0.55, 2.8, 8).rotateX(Math.PI / 2),
  ),
  nose: solid(new THREE.ConeBufferGeometry(0.5, 1.1, 8).rotateX(Math.PI / 2)),
  wing: solid(
    flat([
      [0, 1.1],
      [1.9, -1.4],
      [-1.9, -1.4],
    ]).rotateX(Math.PI / 2),
  ),
  fin: solid(
    flat([
      [-1.4, 0.4],
      [-0.5, 0.4],
      [-1.4, 1.6],
    ]).rotateY(-Math.PI / 2),
  ),
  engine: new THREE.CylinderBufferGeometry(0.14, 0.22, 0.35, 8).rotateX(
    Math.PI / 2,
  ),
  flame: new THREE.ConeBufferGeometry(0.3, 1.4, 8).rotateX(-Math.PI / 2),
};

/* steel starship: hull, ogive nose, rear flaps and forward canards as one plate each */
const STARSHIP = {
  hull: solid(
    new THREE.CylinderBufferGeometry(0.55, 0.55, 3.6, 10).rotateX(Math.PI / 2),
  ),
  nose: solid(new THREE.ConeBufferGeometry(0.55, 1.5, 10).rotateX(Math.PI / 2)),
  flaps: solid(
    flat([
      [-1.5, -1.7],
      [1.5, -1.7],
      [1.5, -0.9],
      [0.5, -0.5],
      [-0.5, -0.5],
      [-1.5, -0.9],
    ]).rotateX(Math.PI / 2),
  ),
  canards: solid(
    flat([
      [-1.1, 1.2],
      [1.1, 1.2],
      [1.1, 1.6],
      [0.5, 2],
      [-0.5, 2],
      [-1.1, 1.6],
    ]).rotateX(Math.PI / 2),
  ),
  flame: new THREE.ConeBufferGeometry(0.35, 1.8, 8).rotateX(-Math.PI / 2),
};

/* saucer: two shallow cones back to back, a dome, a ring of running lights */
const SAUCER = {
  top: solid(new THREE.ConeBufferGeometry(2.2, 0.55, 16)),
  bottom: solid(new THREE.ConeBufferGeometry(2.2, 0.35, 16).rotateX(Math.PI)),
  dome: solid(
    new THREE.SphereBufferGeometry(0.75, 12, 6, 0, Math.PI * 2, 0, Math.PI / 2),
  ),
  light: new THREE.BoxBufferGeometry(0.25, 0.12, 0.25),
};
const RIM = Array.from({ length: 8 }, (_, index) => [
  Math.cos((index * Math.PI) / 4) * 2.2,
  Math.sin((index * Math.PI) / 4) * 2.2,
]);

/* james webb: 18 gold hexes in two rings (centre left open), secondary on struts, 5-layer sunshield */
const MIRROR: number[][] = [];
for (let q = -2; q <= 2; q++) {
  for (let r = -2; r <= 2; r++) {
    const ring = Math.max(Math.abs(q), Math.abs(r), Math.abs(q + r));
    if (ring === 0 || ring > 2) continue;
    const x = 1.5 * 0.52 * q;
    const y = Math.sqrt(3) * 0.52 * (r + q / 2);
    MIRROR.push([x, y, (x * x + y * y) * 0.06]);
  }
}
const SECONDARY = new THREE.Vector3(0, 0, 2.6);
const STRUTS: THREE.Vector3[] = [];
[90, 210, 330].forEach(degrees => {
  const angle = (degrees * Math.PI) / 180;
  STRUTS.push(
    SECONDARY,
    new THREE.Vector3(Math.cos(angle) * 1.9, Math.sin(angle) * 1.9, 0.3),
  );
});
const JWST = {
  hex: new THREE.CircleBufferGeometry(0.5, 6),
  secondary: new THREE.CircleBufferGeometry(0.2, 6),
  struts: new THREE.BufferGeometry().setFromPoints(STRUTS),
  shield: solid(
    flat([
      [-4.5, 0],
      [-2, 3],
      [2, 3],
      [4.5, 0],
      [2, -3],
      [-2, -3],
    ]).rotateX(Math.PI / 2),
  ),
  bus: solid(new THREE.BoxBufferGeometry(1.2, 0.5, 1.2)),
  panel: solid(new THREE.BoxBufferGeometry(0.8, 0.04, 2.4)),
};

/* three shards per skill logo */
const SHARDS: any[] = [];
LOGOS.forEach(({ position, now }: any) => {
  for (let i = 0; i < 3; i++) {
    SHARDS.push({
      now,
      target: new THREE.Vector3(
        position.x + random(-15, 15),
        position.y + random(-15, 15),
        position.z,
      ),
      spin: random(2, 6) * side(),
    });
  }
});
const SHARD = solid(new THREE.TetrahedronBufferGeometry(1));

/* night-city HUD look: background-coloured fill, neon edges, no lights needed */
export const Part = ({ shape, fill, line, ...props }: any) => (
  <group {...props}>
    <mesh geometry={shape.geometry}>
      <meshBasicMaterial
        attach="material"
        color={fill}
        side={THREE.DoubleSide}
        polygonOffset={true}
        polygonOffsetFactor={1}
        polygonOffsetUnits={1}
      />
    </mesh>
    <lineSegments geometry={shape.edges}>
      <lineBasicMaterial attach="material" color={line} />
    </lineSegments>
  </group>
);

export const Glow = ({ shape, color, ...props }: any) => (
  <mesh geometry={shape} {...props}>
    <meshBasicMaterial attach="material" color={color} />
  </mesh>
);

const Flame = ({ shape, color, ...props }: any) => (
  <mesh geometry={shape} {...props}>
    <meshBasicMaterial
      attach="material"
      color={color}
      transparent={true}
      opacity={0.45}
      blending={THREE.AdditiveBlending}
      depthWrite={false}
    />
  </mesh>
);

const Fighter = ({ colors, line, glow }: any) => (
  <>
    <Part shape={FIGHTER.body} fill={colors.backgroundColor} line={line} />
    <Part shape={FIGHTER.wing} fill={colors.backgroundColor} line={line} />
    <Part shape={FIGHTER.fin} fill={colors.backgroundColor} line={line} />
    <Glow shape={FIGHTER.engine} color={glow} />
    <Flame shape={FIGHTER.flame} color={glow} />
  </>
);

const Shuttle = ({ colors, line, glow }: any) => (
  <>
    <Part shape={SHUTTLE.body} fill={colors.backgroundColor} line={line} />
    <Part
      shape={SHUTTLE.nose}
      fill={colors.backgroundColor}
      line={line}
      position={[0, 0, 1.95]}
    />
    <Part
      shape={SHUTTLE.wing}
      fill={colors.backgroundColor}
      line={line}
      position={[0, -0.3, -0.2]}
    />
    <Part shape={SHUTTLE.fin} fill={colors.backgroundColor} line={line} />
    {THRUSTERS.map(([x, y]) => (
      <Glow
        key={`${x}:${y}`}
        shape={SHUTTLE.engine}
        color={glow}
        position={[x, y, -1.55]}
      />
    ))}
    <Flame shape={SHUTTLE.flame} color={glow} position={[0, 0, -2.4]} />
  </>
);

const Starship = ({ colors, line, glow }: any) => (
  <>
    <Part shape={STARSHIP.hull} fill={colors.backgroundColor} line={line} />
    <Part
      shape={STARSHIP.nose}
      fill={colors.backgroundColor}
      line={line}
      position={[0, 0, 2.55]}
    />
    <Part shape={STARSHIP.flaps} fill={colors.backgroundColor} line={line} />
    <Part shape={STARSHIP.canards} fill={colors.backgroundColor} line={line} />
    {THRUSTERS.map(([x, y]) => (
      <Glow
        key={`${x}:${y}`}
        shape={SHUTTLE.engine}
        color={glow}
        position={[x, y, -1.95]}
      />
    ))}
    <Flame shape={STARSHIP.flame} color={glow} position={[0, 0, -3]} />
  </>
);

const Saucer = ({ colors, line, glow }: any) => (
  <>
    <Part
      shape={SAUCER.top}
      fill={colors.backgroundColor}
      line={line}
      position={[0, 0.27, 0]}
    />
    <Part
      shape={SAUCER.bottom}
      fill={colors.backgroundColor}
      line={line}
      position={[0, -0.17, 0]}
    />
    <Part
      shape={SAUCER.dome}
      fill={colors.backgroundColor}
      line={glow}
      position={[0, 0.33, 0]}
    />
    {RIM.map(([x, z]) => (
      <Glow
        key={`${x}:${z}`}
        shape={SAUCER.light}
        color={glow}
        position={[x, 0, z]}
      />
    ))}
  </>
);

const Webb = ({ colors }: any) => (
  <>
    {MIRROR.map(([x, y, z]) => (
      <mesh key={`${x}:${y}`} geometry={JWST.hex} position={[x, y, z]}>
        <meshBasicMaterial attach="material" color={GOLD} side={THREE.DoubleSide} />
      </mesh>
    ))}
    <mesh geometry={JWST.secondary} position={SECONDARY}>
      <meshBasicMaterial attach="material" color={GOLD} side={THREE.DoubleSide} />
    </mesh>
    <lineSegments geometry={JWST.struts}>
      <lineBasicMaterial attach="material" color={colors.primaryColor} />
    </lineSegments>
    {[0, 1, 2, 3, 4].map(layer => (
      <Part
        key={layer}
        shape={JWST.shield}
        fill={colors.backgroundColor}
        line={colors.dangerColor}
        position={[0, -2.4 - layer * 0.14, 0.6]}
      />
    ))}
    <Part
      shape={JWST.bus}
      fill={colors.backgroundColor}
      line={colors.primaryColor}
      position={[0, -3.4, 0.6]}
    />
    <Part
      shape={JWST.panel}
      fill={colors.backgroundColor}
      line={colors.infoColor}
      position={[0, -3.4, -1.2]}
    />
  </>
);

export const MODELS: any = {
  fighter: Fighter,
  shuttle: Shuttle,
  starship: Starship,
  saucer: Saucer,
};
export const KINDS = Object.keys(MODELS);

const AHEAD = new THREE.Vector3();
const START = new THREE.Vector3();

/* e=1 built, e=0 blown apart: each piece has its own throw and spin, so the rebuild reads like a transformer */
const pose = (model: any, e: number, from?: THREE.Vector3) =>
  model.children.forEach((piece: any) => {
    if (!piece.userData.base) {
      piece.userData = {
        base: piece.position.clone(),
        toss: new THREE.Vector3(
          random(-1, 1),
          random(-1, 1),
          random(-1, 1),
        ).setLength(random(4, 9)),
        spin: random(2, 5) * side(),
      };
    }
    const { base, toss, spin } = piece.userData;
    /* from: pieces start bunched at that point instead of scattered round the craft */
    if (from) START.copy(from).addScaledVector(toss, 0.3);
    else START.copy(base).add(toss);
    piece.position.lerpVectors(START, base, e);
    piece.rotation.set(spin * (1 - e), spin * (1 - e) * 0.7, 0);
    piece.scale.setScalar(0.3 + 0.7 * e);
  });

export const Fleet = ({
  colors,
  fighters = 5,
  crashing,
  reassemble,
  onCrashed,
}: any) => {
  const crafts = React.useRef<any[]>([]);
  const shards = React.useRef<any[]>([]);
  const shock: any = React.useRef();
  const crash = React.useRef({ at: -1, done: false }).current;
  const intro = React.useRef({ on: Boolean(reassemble), at: -1 }).current;
  const flights = React.useRef(
    Array.from({ length: fighters + 1 }, (_, index) => {
      const jwst = index === fighters;
      return {
        jwst,
        kind: jwst ? 'jwst' : KINDS[index % KINDS.length],
        prev: '',
        morph: -1,
        graze: false,
        model: {} as any,
        pos: new THREE.Vector3(),
        dir: new THREE.Vector3(),
        from: new THREE.Vector3(),
        origin: new THREE.Vector3(),
        speed: 0,
        accel: 0,
        roll: 0,
        alive: false,
        wait: jwst ? 0.5 : 1 + index * 1.2 + random(0, 0.6),
      };
    }),
  ).current;

  /* start behind the camera off to one side (or where it was rebuilt), then accelerate in a straight line into the distance */
  const launch = (flight: any, group: any, from?: THREE.Vector3) => {
    const spread = flight.jwst ? 16 : 9;
    if (from) flight.pos.copy(from);
    else
      flight.pos.set(
        side() * random(spread * 0.5, spread),
        side() * random(2, 7),
        20,
      );
    flight.graze = !from && !flight.jwst && Math.random() < 0.35;
    if (flight.graze) {
      const angle = random(0, Math.PI * 2);
      AHEAD.set(Math.cos(angle) * GRAZE, Math.sin(angle) * GRAZE, 0).add(CORE);
    } else {
      AHEAD.set(random(-40, 40), random(-25, 25), FAR);
    }
    flight.dir.copy(AHEAD).sub(flight.pos).normalize();
    flight.speed = 4;
    /* grazers fly slower so the touch reads */
    flight.accel = flight.jwst ? 12 : flight.graze ? random(16, 24) : random(28, 48);
    flight.roll = random(0.3, 0.9) * side();
    flight.alive = true;
    group.position.copy(flight.pos);
    if (!flight.jwst) group.lookAt(AHEAD.copy(flight.pos).add(flight.dir));
  };

  useFrame(({ clock }, rawDelta) => {
    /* a backgrounded tab hands back one huge delta */
    const delta = Math.min(rawDelta, 0.1);
    const now = clock.elapsedTime;
    if (crashing && crash.at < 0) {
      crash.at = now;
      intro.on = false;
      flights.forEach(flight => flight.from.copy(flight.pos));
    }
    if (intro.on && intro.at < 0) {
      intro.at = now;
      /* rebuild in a ring round the box, each craft already facing where it will fly */
      flights.forEach((flight, index) => {
        const group = crafts.current[index];
        const angle = (index / fighters) * Math.PI * 2 + Math.PI / 2;
        if (flight.jwst) START.set(0, -8, -10).add(CORE);
        else START.set(Math.cos(angle) * 7, Math.sin(angle) * 5, 6).add(CORE);
        launch(flight, group, START);
        flight.alive = false;
        group.updateMatrixWorld(true);
        flight.model[flight.kind].worldToLocal(flight.origin.copy(CORE));
      });
    }
    const t = crash.at < 0 ? -1 : now - crash.at;
    const i = intro.on ? now - intro.at : -1;
    if (intro.on && i >= GATHER + ASSEMBLE) {
      intro.on = false;
      flights.forEach(flight => {
        pose(flight.model[flight.kind], 1);
        flight.alive = true;
      });
    }

    flights.forEach((flight, index) => {
      const group = crafts.current[index];
      const { model } = flight;
      if (flight.morph >= 0) {
        flight.morph += delta;
        const e = easeOut(Math.min(flight.morph / MORPH, 1));
        pose(model[flight.prev], 1 - e);
        pose(model[flight.kind], e);
        if (flight.morph >= MORPH) flight.morph = -1;
      }
      Object.keys(model).forEach(
        kind =>
          (model[kind].visible =
            kind === flight.kind || (flight.morph >= 0 && kind === flight.prev)),
      );

      if (t >= 0) {
        if (flight.alive) {
          /* cubic ease-in: the dive keeps accelerating until impact */
          const p = Math.min(t / CRASH, 1);
          flight.pos.lerpVectors(flight.from, CORE, p * p * p);
          group.position.copy(flight.pos);
          group.rotation.x += delta * 6;
          group.rotation.y += delta * 4;
        }
        group.visible = flight.alive && t < CRASH;
        return;
      }
      if (intro.on) {
        const p = (i - GATHER) / ASSEMBLE;
        group.visible = p >= 0;
        if (p >= 0) pose(model[flight.kind], easeOut(Math.min(p, 1)), flight.origin);
        return;
      }
      if (!flight.alive) {
        flight.wait -= delta;
        if (flight.wait <= 0) launch(flight, group);
        group.visible = flight.alive;
        return;
      }
      if (flight.graze && flight.pos.z <= CORE.z + 3) {
        /* touched the box: stall, rebuild as another kind, then burn away */
        const others = KINDS.filter(kind => kind !== flight.kind);
        flight.graze = false;
        flight.speed = 2;
        flight.prev = flight.kind;
        flight.kind = others[Math.floor(Math.random() * others.length)];
        flight.morph = 0;
      }
      if (flight.morph < 0) flight.speed += flight.accel * delta;
      flight.pos.addScaledVector(flight.dir, flight.speed * delta);
      group.position.copy(flight.pos);
      if (flight.jwst) {
        group.rotation.y += delta * 0.3;
        group.rotation.x += delta * 0.12;
      } else {
        group.rotateZ(delta * flight.roll);
        model.saucer.rotation.y += delta * 2;
      }
      if (flight.pos.z < FAR) {
        flight.alive = false;
        flight.wait = random(0.5, 3);
        group.visible = false;
      }
    });

    const split = t < 0 ? -1 : t - CRASH;
    const gather = intro.on && i < GATHER ? i / GATHER : -1;
    /* the shock fires on impact, and again when the shards land home */
    const pulse = split >= 0 ? split : intro.on ? i - GATHER : -1;
    shock.current.visible = pulse >= 0 && pulse < SHOCK;
    shards.current.forEach(shard => (shard.visible = split >= 0 || gather >= 0));
    if (shock.current.visible) {
      const s = pulse / SHOCK;
      shock.current.scale.setScalar(1 + easeOut(s) * 30);
      shock.current.material.opacity = 1 - s;
    }

    if (gather >= 0) {
      /* the split in reverse: ease in so the shards speed up into the core */
      const e = gather * gather * gather;
      SHARDS.forEach(({ target, spin }, index) => {
        const shard = shards.current[index];
        shard.position.lerpVectors(target, CORE, e);
        shard.rotation.x += delta * spin;
        shard.rotation.y += delta * spin * 0.7;
        shard.scale.setScalar(0.6 + (1 - e) * -target.z * 0.03);
      });
    }
    if (split < 0) return;

    const e = easeOut(Math.min(split / SPLIT, 1));
    SHARDS.forEach(({ target, spin }, index) => {
      const shard = shards.current[index];
      shard.position.lerpVectors(CORE, target, e);
      shard.rotation.x += delta * spin;
      shard.rotation.y += delta * spin * 0.7;
      /* grow with distance so every shard reads at about the same size on screen */
      shard.scale.setScalar(0.6 + e * -target.z * 0.03);
    });

    if (split >= SPLIT && !crash.done) {
      crash.done = true;
      onCrashed();
    }
  });

  return (
    <>
      {flights.map((flight, index) => (
        <group
          key={index}
          ref={(group: any) => (crafts.current[index] = group)}>
          {flight.jwst ? (
            <group
              ref={(group: any) => (flight.model.jwst = group)}
              scale={[1.4, 1.4, 1.4]}>
              <Webb colors={colors} />
            </group>
          ) : (
            KINDS.map(kind => {
              const Model = MODELS[kind];
              return (
                <group
                  key={kind}
                  ref={(group: any) => (flight.model[kind] = group)}>
                  <Model
                    colors={colors}
                    line={index % 2 ? colors.dangerColor : colors.infoColor}
                    glow={index % 2 ? colors.infoColor : colors.dangerColor}
                  />
                </group>
              );
            })
          )}
        </group>
      ))}
      {SHARDS.map(({ now }, index) => (
        <group
          key={index}
          ref={(group: any) => (shards.current[index] = group)}>
          <Part
            shape={SHARD}
            fill={colors.backgroundColor}
            line={now ? colors.infoColor : colors.secondaryColor}
          />
        </group>
      ))}
      <mesh ref={shock} position={CORE}>
        <icosahedronBufferGeometry attach="geometry" args={[1, 1]} />
        <meshBasicMaterial
          attach="material"
          color={colors.dangerColor}
          wireframe={true}
          transparent={true}
        />
      </mesh>
    </>
  );
};
