import * as React from 'react';
import { useFrame } from 'react-three-fiber';
import * as THREE from 'three';

import { KINDS, MODELS } from 'Components/Anime/ThreeJS/Fleet';
import { blend, texture } from 'Components/Anime/ThreeJS/Ruins';

const random = (min: number, max: number) => min + Math.random() * (max - min);
const pick = (list: any[]) => list[Math.floor(Math.random() * list.length)];
const smooth = (p: number) => p * p * (3 - 2 * p);
const at = (x: number, y: number, z: number) => new THREE.Vector3(x, y, z);

/* somewhere past the edge of the city, where ships enter and leave */
const edge = () =>
  Math.random() < 0.5
    ? at(random(-500, 500), random(120, 220), -1100)
    : at(pick([-1, 1]) * 750, random(100, 200), random(-800, -100));

type Leg = { to: THREE.Vector3; time: number; light?: boolean; spin?: number; gone?: boolean; free?: THREE.Vector3 };

/* a mission is a list of legs: fly each one, then pick another */
const MISSIONS: any = {
  land: (ship: any, { pads, busy }: any) => {
    const free = pads.filter((pad: any) => !busy.has(pad));
    if (!free.length) return MISSIONS.cruise(ship);
    const pad = pick(free);
    busy.add(pad);
    ship.pad = pad;
    const above = pad.clone().setY(pad.y + 28);
    return [
      { to: above.clone().add(at(random(-90, 90), 50, random(60, 120))), time: random(5, 8) },
      { to: above, time: 3, light: true },
      { to: pad.clone().setY(pad.y + 1.6), time: 3.5, light: true },
      { to: pad.clone().setY(pad.y + 1.6), time: random(3, 6), free: pad },
      { to: above.clone().setY(above.y + 20), time: 3, light: true },
      { to: edge(), time: random(8, 11), gone: true },
    ];
  },
  patrol: (ship: any, { fires }: any) => {
    const { position } = pick(fires);
    const start = random(0, Math.PI * 2);
    const legs: Leg[] = [];
    for (let step = 0; step <= 6; step++) {
      const angle = start + (step * Math.PI) / 3;
      legs.push({
        to: at(position.x + Math.cos(angle) * 45, position.y + 34, position.z + Math.sin(angle) * 45),
        time: step ? 1.8 : random(5, 8),
        light: step > 0,
      });
    }
    return legs.concat({ to: edge(), time: random(8, 11), gone: true });
  },
  scan: (ship: any, { roofs }: any) => {
    const roof = pick(roofs.slice(0, 30));
    const above = roof.clone().setY(roof.y + 40);
    return [
      { to: above, time: random(6, 9) },
      { to: above, time: 4.5, light: true, spin: pick([-1, 1]) * 1.2 },
      { to: edge(), time: random(8, 11), gone: true },
    ];
  },
  cruise: () => [{ to: edge(), time: random(10, 14), gone: true }],
  /* /bird: lift off the water or a roof, then climb out of the atmosphere */
  leave: (ship: any, { pads }: any) => {
    const pad = Math.random() < 0.5 ? pick(pads) : at(random(-400, 400), 0, random(-900, -150));
    const above = pad.clone().setY(pad.y + 30);
    return [
      { to: above, time: 2.5, light: true },
      { to: above.clone().add(at(random(-120, 120), 220, random(-260, -120))), time: random(3, 4.5) },
      { to: at(random(-500, 300), random(900, 1300), random(-1700, -1300)), time: random(6, 9), gone: true },
    ];
  },
};

const plan = (ship: any, world: any, exodus: boolean) => {
  if (exodus) return Math.random() < 0.75 ? MISSIONS.leave(ship, world) : MISSIONS.patrol(ship, world);
  const roll = Math.random();
  if (roll < 0.4) return MISSIONS.land(ship, world);
  if (roll < 0.65) return MISSIONS.patrol(ship, world);
  if (roll < 0.85) return MISSIONS.scan(ship, world);
  return MISSIONS.cruise(ship);
};

const BEAM = new THREE.ConeBufferGeometry(14, 64, 16, 1, true).translate(0, -32, 0);
const HEADING = new THREE.Vector3();

/* the sky lanes: dotted streams of running lights between the towers */
const lanes = (exodus: boolean, phone: boolean) =>
  Array.from({ length: phone ? 6 : 10 }, (_, index) => {
    if (exodus) {
      /* everything streams up to the ark */
      const from = at(random(-600, 600), random(20, 80), random(-900, -200));
      const to = at(random(-260, -40), 520, -1400);
      return { from, to, speed: random(0.04, 0.07) };
    }
    const height = 60 + index * 16 + random(-6, 6);
    const along = index % 2 === 0;
    const offset = random(-420, 420);
    const from = along ? at(offset, height, 150) : at(-800, height, random(-900, -150));
    const to = along ? at(offset, height, -1100) : at(800, height, from.z);
    return { from: index % 4 < 2 ? from : to, to: index % 4 < 2 ? to : from, speed: random(0.025, 0.05) };
  });

const Lanes = ({ colors, dark, exodus, phone, still }: any) => {
  const per = phone ? 16 : 24;
  const stream = React.useMemo(() => {
    const list = lanes(exodus, phone);
    const palette = [colors.infoColor, colors.dangerColor, colors.warningColor, colors.primaryColor];
    const colorArray = new Float32Array(list.length * per * 3);
    list.forEach((lane, index) => {
      const color = palette[index % palette.length];
      for (let dot = 0; dot < per; dot++) color.toArray(colorArray, (index * per + dot) * 3);
    });
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(list.length * per * 3), 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));
    const material = new THREE.PointsMaterial({
      size: exodus ? 5 : 3.5,
      map: texture('Circle/circle.png'),
      vertexColors: true,
      transparent: true,
      depthWrite: false,
      blending: blend(dark),
      fog: !exodus,
    });
    const offsets = Float32Array.from({ length: list.length * per }, () => Math.random());
    return { list, geometry, material, offsets };
  }, [colors, dark, exodus, phone]);

  React.useEffect(
    () => () => {
      stream.geometry.dispose();
      stream.material.dispose();
    },
    [stream],
  );

  useFrame(({ clock }) => {
    const t = still ? 0 : clock.elapsedTime;
    const positions: any = stream.geometry.attributes.position.array;
    stream.list.forEach(({ from, to, speed }, index) => {
      for (let dot = 0; dot < per; dot++) {
        const slot = index * per + dot;
        const p = (stream.offsets[slot] + t * speed) % 1;
        positions[slot * 3] = from.x + (to.x - from.x) * p;
        positions[slot * 3 + 1] = from.y + (to.y - from.y) * p;
        positions[slot * 3 + 2] = from.z + (to.z - from.z) * p;
      }
    });
    (stream.geometry.attributes.position as THREE.BufferAttribute).needsUpdate = true;
  });

  return <points geometry={stream.geometry} material={stream.material} />;
};

/* ships with somewhere to be: landing on pads, circling fires, sweeping roofs with searchlights */
export const Traffic = ({ plan: world, colors, dark, phone, still, exodus = false }: any) => {
  const groups = React.useRef<any[]>([]);
  const beams = React.useRef<any[]>([]);
  const busy = React.useRef(new Set()).current;
  const ships = React.useRef(
    Array.from({ length: phone ? (exodus ? 6 : 4) : exodus ? 12 : 7 }, (_, index) => ({
      kind: KINDS[index % KINDS.length],
      legs: [] as any[],
      leg: 0,
      t: 0,
      wait: index * random(0.2, 0.5),
      /* already mid-flight over the city when the scene opens */
      pos: at(random(-400, 400), random(exodus ? 0 : 80, exodus ? 300 : 200), random(-900, -150)),
      from: new THREE.Vector3(),
      last: new THREE.Vector3(),
      yaw: 0,
      pitch: 0,
      pad: undefined as any,
    })),
  ).current;
  const beam = React.useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: colors.infoColor,
        transparent: true,
        opacity: dark ? 0.12 : 0.18,
        blending: blend(dark),
        depthWrite: false,
        side: THREE.DoubleSide,
      }),
    [colors, dark],
  );
  React.useEffect(() => () => beam.dispose(), [beam]);

  useFrame((_, rawDelta) => {
    const delta = still ? 0 : Math.min(rawDelta, 0.1);
    ships.forEach((ship, index) => {
      const group = groups.current[index];
      const light = beams.current[index];
      if (!group) return;
      if (ship.wait > 0) {
        ship.wait -= delta;
        group.visible = false;
        light.visible = false;
        return;
      }
      if (ship.leg >= ship.legs.length) {
        /* a new mission, from wherever the last one ended */
        ship.legs = plan(ship, { ...world, busy }, exodus);
        ship.leg = 0;
        ship.t = 0;
        ship.from.copy(ship.pos);
        ship.last.copy(ship.pos);
      }
      const leg = ship.legs[ship.leg];
      ship.t += delta;
      const p = Math.min(ship.t / leg.time, 1);
      ship.pos.lerpVectors(ship.from, leg.to, leg.gone ? p * p : smooth(p));
      group.visible = true;
      group.children.forEach((model: any, kind: number) => (model.visible = KINDS[kind] === ship.kind));
      group.position.copy(ship.pos);
      light.visible = Boolean(leg.light);
      light.position.copy(ship.pos);

      HEADING.subVectors(ship.pos, ship.last);
      const horizontal = Math.hypot(HEADING.x, HEADING.z);
      if (horizontal > 0.02) {
        const yaw = Math.atan2(HEADING.x, HEADING.z);
        /* shortest way round, so ships never spin a full turn */
        ship.yaw += Math.atan2(Math.sin(yaw - ship.yaw), Math.cos(yaw - ship.yaw)) * Math.min(1, delta * 3);
      }
      if (leg.spin) ship.yaw += leg.spin * delta;
      const pitch = HEADING.length() > 0.02 ? -Math.atan2(HEADING.y, horizontal) * 0.6 : 0;
      ship.pitch += (pitch - ship.pitch) * Math.min(1, delta * 3);
      group.rotation.set(ship.pitch, ship.yaw, 0, 'YXZ');
      ship.last.copy(ship.pos);

      if (p < 1) return;
      if (leg.free) busy.delete(leg.free);
      ship.leg += 1;
      ship.t = 0;
      ship.from.copy(ship.pos);
      if (leg.gone) {
        ship.wait = random(0.5, 3);
        ship.kind = pick(KINDS);
        if (exodus) ship.pos.set(random(-400, 400), 0, random(-900, -150));
        else ship.pos.copy(edge());
        ship.legs = [];
      }
    });
  });

  return (
    <>
      <Lanes colors={colors} dark={dark} exodus={exodus} phone={phone} still={still} />
      {ships.map((ship, index) => (
        <React.Fragment key={index}>
          <group ref={(group: any) => (groups.current[index] = group)} scale={[3, 3, 3]} visible={false}>
            {KINDS.map(kind => {
              const Model = MODELS[kind];
              return (
                <group key={kind}>
                  <Model
                    colors={colors}
                    line={index % 2 ? colors.dangerColor : colors.infoColor}
                    glow={index % 2 ? colors.infoColor : colors.dangerColor}
                  />
                </group>
              );
            })}
          </group>
          <mesh
            ref={(mesh: any) => (beams.current[index] = mesh)}
            geometry={BEAM}
            material={beam}
            visible={false}
          />
        </React.Fragment>
      ))}
    </>
  );
};
