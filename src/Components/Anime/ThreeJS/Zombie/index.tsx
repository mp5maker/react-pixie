import { Howl } from 'howler';
import * as React from 'react';
import { useFrame, useThree } from 'react-three-fiber';
import * as THREE from 'three';

import { Glow, Part, solid } from 'Components/Anime/ThreeJS/Fleet';

/* world units per second: every run starts at RUN and overclocks towards TOP; phones get a slower lane */
const RUN = 7;
const TOP = 16;
const RAMP = 0.2;
const GRAVITY = 30;
const LEAP = 10.5;
/* screen y of the street */
const FLOOR = -1.6;
/* walk/idle frames are 430x519, dead frames 629x526 */
const BODY: [number, number, number] = [1.2, 1.45, 1];
const FALLEN: [number, number, number] = [1.73, 1.45, 1];
/* seconds before a dead run takes a retry, so the tap that killed you does not restart it */
const GRACE = 0.6;
/* camera sits at z 5: a layer at depth d is scaled by (5 - d) / 5 so it lines up with the street */
const CAMERA = 5;

const random = (min: number, max: number) => min + Math.random() * (max - min);
const range = (from: number, to: number) =>
  Array.from({ length: to - from + 1 }, (_, index) => from + index);

const backgroundSound = new Howl({
  src: ['/Audio/zombie-game-background.mp3'],
  preload: true,
  volume: 1,
  loop: true,
});

const zombieDead = new Howl({
  src: ['/Audio/zombie-dead.mp3'],
  preload: true,
  volume: 1,
  loop: false,
});

const zombieJump = new Howl({
  src: ['/Audio/zombie-jump.mp3'],
  preload: true,
  volume: 1,
  loop: false,
});

const chipSound = new Howl({
  src: ['/Audio/button-click.mp3'],
  preload: true,
  volume: 0.6,
  loop: false,
});

const loader = new THREE.TextureLoader();
const frames = (name: string, numbers: number[]) =>
  numbers.map(
    number =>
      new THREE.SpriteMaterial({
        map: loader.load(`/Zombie/Male/${name}-${number}.png`),
      }),
  );

const box = (width: number, height: number, depth: number) =>
  solid(new THREE.BoxBufferGeometry(width, height, depth));

const SHAPES = {
  leg: box(0.08, 0.5, 0.08),
  board: box(1.1, 0.3, 0.25),
  strip: new THREE.BoxBufferGeometry(1.12, 0.06, 0.27),
  crate: box(0.9, 0.8, 0.6),
  crateTop: box(0.75, 0.75, 0.55),
  band: new THREE.BoxBufferGeometry(0.92, 0.05, 0.62),
  beacon: new THREE.BoxBufferGeometry(0.12, 0.12, 0.12),
  hull: box(0.7, 0.2, 0.45),
  arm: box(1.3, 0.05, 0.08),
  rotor: box(0.5, 0.03, 0.5),
  eye: new THREE.BoxBufferGeometry(0.18, 0.08, 0.05),
  chip: new THREE.EdgesGeometry(new THREE.OctahedronBufferGeometry(0.22)),
  core: new THREE.OctahedronBufferGeometry(0.09),
};

/* hit boxes, y measured up from the street: barrier takes a jump, stack a double jump, drone punishes jumping */
const HAZARDS: any = {
  barrier: { w: 1.1, h: 0.8, y: 0 },
  stack: { w: 0.9, h: 1.6, y: 0 },
  drone: { w: 1.3, h: 0.5, y: 1.7 },
};
const KINDS = Object.keys(HAZARDS);

const Barrier = ({ fill, line }: any) => (
  <>
    <Part shape={SHAPES.leg} fill={fill} line={line} position={[-0.42, 0.25, 0]} />
    <Part shape={SHAPES.leg} fill={fill} line={line} position={[0.42, 0.25, 0]} />
    <Part shape={SHAPES.board} fill={fill} line={line} position={[0, 0.62, 0]} />
    <Glow shape={SHAPES.strip} color={line} position={[0, 0.62, 0]} />
  </>
);

const Stack = ({ fill, line }: any) => (
  <>
    <Part shape={SHAPES.crate} fill={fill} line={line} position={[0, 0.4, 0]} />
    <Part
      shape={SHAPES.crateTop}
      fill={fill}
      line={line}
      position={[0.05, 1.175, 0]}
      rotation={[0, 0.35, 0]}
    />
    <Glow shape={SHAPES.band} color={line} position={[0, 0.4, 0]} />
    <Glow shape={SHAPES.beacon} color={line} position={[0.05, 1.62, 0]} />
  </>
);

const Drone = ({ fill, line }: any) => (
  <>
    <Part shape={SHAPES.hull} fill={fill} line={line} position={[0, 1.95, 0]} />
    <Part shape={SHAPES.arm} fill={fill} line={line} position={[0, 2.03, 0]} />
    <Part shape={SHAPES.rotor} fill={fill} line={line} position={[-0.65, 2.08, 0]} />
    <Part shape={SHAPES.rotor} fill={fill} line={line} position={[0.65, 2.08, 0]} />
    <Glow shape={SHAPES.eye} color={line} position={[0, 1.93, 0.23]} />
  </>
);

const MODELS: any = { barrier: Barrier, stack: Stack, drone: Drone };

/* one strip of city: outlines, lit windows, and a fill that hides the strip behind it */
const skyline = (span: number, low: number, high: number) => {
  const outline: number[] = [];
  const windows: number[] = [];
  const fill: number[] = [];
  for (let x = 0; x < span; ) {
    const right = Math.min(x + random(0.6, 1.6), span);
    const top = random(low, high);
    outline.push(x, 0, 0, x, top, 0, x, top, 0, right, top, 0, right, top, 0, right, 0, 0);
    if (Math.random() < 0.3) {
      const mast = (x + right) / 2;
      outline.push(mast, top, 0, mast, top + 0.4, 0);
    }
    fill.push(x, 0, 0, right, 0, 0, right, top, 0, x, 0, 0, right, top, 0, x, top, 0);
    for (let y = 0.3; y < top - 0.2; y += 0.35)
      for (let w = x + 0.15; w < right - 0.25; w += 0.3)
        if (Math.random() < 0.25) windows.push(w, y, 0, w + 0.12, y, 0);
    x = right + random(0.05, 0.4);
  }
  const geometry = (points: number[]) =>
    new THREE.BufferGeometry().setAttribute(
      'position',
      new THREE.Float32BufferAttribute(points, 3),
    );
  return {
    outline: geometry(outline),
    windows: geometry(windows),
    fill: geometry(fill),
  };
};

const Layer = ({ city, depth, outline, windows, fill, layerRef }: any) => {
  const scale = (CAMERA - depth) / CAMERA;
  const strip = (x: number) => (
    <group position={[x, FLOOR, 0]}>
      {fill && (
        <mesh geometry={city.fill}>
          <meshBasicMaterial attach="material" color={fill} side={THREE.DoubleSide} />
        </mesh>
      )}
      <lineSegments geometry={city.outline}>
        <lineBasicMaterial attach="material" color={outline} />
      </lineSegments>
      <lineSegments geometry={city.windows}>
        <lineBasicMaterial attach="material" color={windows} />
      </lineSegments>
    </group>
  );
  return (
    <group position={[0, 0, depth]} scale={[scale, scale, 1]}>
      <group ref={layerRef}>
        {strip(0)}
        {strip(city.span)}
      </group>
    </group>
  );
};

export const Zombie = ({ colors, api, onHud, onDead }: any) => {
  const { viewport } = useThree();
  const half = viewport.width / 2;
  const zombie: any = React.useRef();
  const dashes: any = React.useRef();
  const far: any = React.useRef();
  const near: any = React.useRef();

  const sheets = React.useMemo(
    () => ({
      ready: frames('idle', [...range(1, 9), ...range(11, 15)]),
      run: frames('walk', range(1, 10)),
      dead: frames('dead', range(1, 8)),
    }),
    [],
  );

  const run = React.useRef({
    phase: 'ready',
    feet: 0,
    vy: 0,
    jumps: 0,
    time: 0,
    speed: 0,
    dist: 0,
    score: 0,
    combo: 1,
    gap: 0,
    frame: 0,
    clock: 0,
    hud: 0,
    ended: 0,
    lane: 1,
    x: 0,
  }).current;

  const hazards = React.useRef(
    range(1, 3).map(() => ({ on: false, kind: KINDS[0], x: 0, group: null as any, model: {} as any })),
  ).current;
  const chips = React.useRef(
    range(1, 3).map(() => ({ on: false, passed: false, x: 0, y: 0, group: null as any })),
  ).current;

  /* city strips are as wide as the screen at their depth */
  const cities = React.useMemo(() => {
    const span = half * 2 + 2;
    return {
      far: { ...skyline(span, 1.5, 4.5), span },
      near: { ...skyline(span, 0.8, 2.6), span },
      dashes: new THREE.BufferGeometry().setAttribute(
        'position',
        new THREE.Float32BufferAttribute(
          range(0, Math.ceil(half * 2 + 4)).reduce(
            (points: number[], index) => points.concat(index - half - 2, -0.15, 0, index - half - 1.55, -0.15, 0),
            [],
          ),
          3,
        ),
      ),
    };
  }, [half]);

  const curb = React.useMemo(
    () =>
      new THREE.BufferGeometry().setAttribute(
        'position',
        new THREE.Float32BufferAttribute(
          [-half - 2, 0, 0, half + 2, 0, 0, -half - 2, -0.3, 0, half + 2, -0.3, 0],
          3,
        ),
      ),
    [half],
  );

  const notify = () =>
    onHud({ phase: run.phase, score: Math.floor(run.score), combo: run.combo });

  const hide = (item: any) => {
    item.on = false;
    if (item.group) item.group.visible = false;
  };

  const start = () => {
    Object.assign(run, {
      phase: 'run',
      feet: 0,
      vy: 0,
      jumps: 0,
      time: 0,
      score: 0,
      combo: 1,
      frame: 0,
      gap: RUN * run.lane * 1.2,
    });
    hazards.forEach(hide);
    chips.forEach(hide);
    zombie.current.scale.set(BODY[0], BODY[1], BODY[2]);
    backgroundSound.stop();
    backgroundSound.play();
    notify();
  };

  const die = () => {
    Object.assign(run, { phase: 'dead', frame: 0, ended: performance.now() });
    zombie.current.scale.set(FALLEN[0], FALLEN[1], FALLEN[2]);
    backgroundSound.stop();
    zombieDead.play();
    onDead(Math.floor(run.score));
    notify();
  };

  const spawn = () => {
    const slot = hazards.find(item => !item.on);
    if (!slot) return;
    const pool = run.time > 12 ? KINDS : ['barrier', 'barrier', 'stack'];
    slot.kind = pool[Math.floor(Math.random() * pool.length)];
    slot.on = true;
    slot.x = half + 1.5;
    KINDS.forEach(kind => (slot.model[kind].visible = kind === slot.kind));
    slot.group.visible = true;
    slot.group.position.x = slot.x;
    /* chips sit where the hazard rewards the right move: over a jump, under a drone */
    const chip = chips.find(item => !item.on);
    if (!chip || Math.random() > 0.55) return;
    Object.assign(chip, {
      on: true,
      passed: false,
      x: slot.x,
      y: slot.kind === 'drone' ? 0.6 : HAZARDS[slot.kind].h + 0.9,
    });
    chip.group.visible = true;
    chip.group.position.set(chip.x, FLOOR + chip.y, 0);
  };

  /* one input for everything: start, jump, double jump, retry */
  api.press = () => {
    if (run.phase === 'ready') return start();
    if (run.phase === 'dead') {
      if (performance.now() - run.ended > GRACE * 1000) start();
      return;
    }
    if (run.jumps > 1) return;
    run.vy = run.jumps ? LEAP * 0.9 : LEAP;
    run.jumps++;
    zombieJump.play();
  };
  api.phase = run.phase;

  React.useEffect(() => () => {
    backgroundSound.stop();
  }, []);

  useFrame((state, delta) => {
    const dt = Math.min(delta, 1 / 30);
    const sprite = zombie.current;
    if (!sprite) return;
    run.lane = Math.min(1, Math.max(0.6, half / 7));
    run.x = -half + Math.min(2, half * 0.45);
    api.phase = run.phase;

    if (run.jumps) {
      run.vy -= GRAVITY * dt;
      run.feet += run.vy * dt;
      if (run.feet <= 0) Object.assign(run, { feet: 0, vy: 0, jumps: 0 });
    }

    if (run.phase === 'run') {
      run.time += dt;
      run.speed = Math.min(TOP, RUN + run.time * RAMP) * run.lane;
      run.dist += run.speed * dt;
      run.score += run.speed * dt * 2;
      run.gap -= run.speed * dt;
      if (run.gap <= 0) {
        spawn();
        run.gap = run.speed * random(0.95, 1.7);
      }

      const bottom = run.feet + 0.05;
      const top = run.feet + 1.2;
      for (const slot of hazards) {
        if (!slot.on) continue;
        slot.x -= run.speed * dt;
        slot.group.position.x = slot.x;
        if (slot.x < -half - 2) hide(slot);
        const hit = HAZARDS[slot.kind];
        if (Math.abs(slot.x - run.x) < hit.w / 2 + 0.3 && top > hit.y && bottom < hit.y + hit.h) {
          die();
          break;
        }
      }

      for (const chip of chips) {
        if (!chip.on) continue;
        chip.x -= run.speed * dt;
        chip.group.position.x = chip.x;
        chip.group.rotation.y += dt * 3;
        if (Math.abs(chip.x - run.x) < 0.45 && chip.y > bottom - 0.2 && chip.y < top + 0.2) {
          run.score += 25 * run.combo;
          run.combo = Math.min(5, run.combo + 1);
          chipSound.play();
          hide(chip);
          notify();
        } else if (!chip.passed && chip.x < run.x - 0.6) {
          chip.passed = true;
          run.combo = 1;
          notify();
        }
        if (chip.x < -half - 2) hide(chip);
      }

      if (state.clock.elapsedTime - run.hud > 0.1 && run.phase === 'run') {
        run.hud = state.clock.elapsedTime;
        notify();
      }
    }

    /* walk cadence follows the speed; airborne holds the stride, the dead frames play once */
    const sheet = (sheets as any)[run.phase];
    const step = run.phase === 'run' ? (0.05 * RUN * run.lane) / run.speed : 0.07;
    run.clock += dt;
    if (run.clock >= step) {
      run.clock = 0;
      if (run.phase === 'dead') run.frame = Math.min(run.frame + 1, sheet.length - 1);
      else if (!(run.phase === 'run' && run.jumps)) run.frame = (run.frame + 1) % sheet.length;
    }
    sprite.material = sheet[Math.min(run.frame, sheet.length - 1)];
    sprite.position.set(run.x, FLOOR + BODY[1] / 2 + run.feet, 0.5);

    dashes.current.position.x = -(run.dist % 1);
    far.current.position.x = -((run.dist * 0.12) % cities.far.span) - half - 1;
    near.current.position.x = -((run.dist * 0.3) % cities.near.span) - half - 1;
  });

  return (
    <>
      <Layer
        city={cities.far}
        depth={-9}
        outline={colors.secondaryColor}
        windows={colors.dangerColor}
        layerRef={far}
      />
      <Layer
        city={cities.near}
        depth={-3}
        outline={colors.secondaryColor}
        windows={colors.infoColor}
        fill={colors.backgroundColor}
        layerRef={near}
      />
      <group position={[0, FLOOR, 0]}>
        <lineSegments geometry={curb}>
          <lineBasicMaterial attach="material" color={colors.secondaryColor} />
        </lineSegments>
        <lineSegments ref={dashes} geometry={cities.dashes}>
          <lineBasicMaterial attach="material" color={colors.infoColor} />
        </lineSegments>
      </group>
      {hazards.map((slot, index) => (
        <group
          key={`hazard-${index}`}
          ref={(node: any) => (slot.group = node)}
          position={[0, FLOOR, 0]}
          visible={false}>
          {KINDS.map(kind => {
            const Model = MODELS[kind];
            return (
              <group key={kind} ref={(node: any) => (slot.model[kind] = node)}>
                <Model fill={colors.backgroundColor} line={colors.dangerColor} />
              </group>
            );
          })}
        </group>
      ))}
      {chips.map((chip, index) => (
        <group
          key={`chip-${index}`}
          ref={(node: any) => (chip.group = node)}
          visible={false}>
          <lineSegments geometry={SHAPES.chip}>
            <lineBasicMaterial attach="material" color={colors.infoColor} />
          </lineSegments>
          <Glow shape={SHAPES.core} color={colors.infoColor} />
        </group>
      ))}
      <sprite
        // @ts-ignore
        ref={zombie}
        args={[sheets.ready[0]]}
        scale={BODY}
        position={[-half + Math.min(2, half * 0.45), FLOOR + BODY[1] / 2, 0.5]}
      />
    </>
  );
};
