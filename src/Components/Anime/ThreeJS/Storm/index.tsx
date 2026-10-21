import * as React from 'react';
import { useFrame, useThree } from 'react-three-fiber';
import * as THREE from 'three';

import { blend, texture } from 'Components/Anime/ThreeJS/Ruins';

const random = (min: number, max: number) => min + Math.random() * (max - min);
const TOP = 260;
const WIND = 0.12;
const BOLT = 96;
const CLOUDS = 40;

/* one strike: bright, a dropout, a restrike, then a fade */
const flash = (age: number) => {
  if (age < 0.06) return 1;
  if (age < 0.1) return 0.15;
  if (age < 0.16) return 0.9;
  if (age < 0.35) return ((0.35 - age) / 0.19) * 0.6;
  return 0;
};

/* a jagged line from the cloud base down to a target, written as segment pairs */
const jag = (
  out: Float32Array,
  start: number,
  from: THREE.Vector3,
  to: THREE.Vector3,
  steps: number,
  spread: number,
) => {
  let index = start;
  const last = from.clone();
  const next = new THREE.Vector3();
  for (let step = 1; step <= steps; step++) {
    next.lerpVectors(from, to, step / steps);
    if (step < steps)
      next.add(new THREE.Vector3(random(-spread, spread), random(-spread, spread) * 0.3, random(-spread, spread)));
    last.toArray(out, index * 3);
    next.toArray(out, index * 3 + 3);
    index += 2;
    last.copy(next);
  }
  return index;
};

export const Storm = ({ plan, colors, dark, acceleration = 1, phone, still }: any) => {
  const { scene }: any = useThree();
  const count = phone ? 1500 : 4000;
  const strike = React.useRef({ at: -1, next: 2.5 }).current;
  const parts = React.useMemo(() => {
    const drops = new Float32Array(count * 6);
    const fall = Float32Array.from({ length: count }, () => random(0.8, 1.2));
    for (let index = 0; index < count; index++) {
      drops[index * 6] = random(-250, 250);
      drops[index * 6 + 1] = random(0, TOP);
      drops[index * 6 + 2] = random(-400, 150);
    }
    const rain = new THREE.BufferGeometry();
    rain.setAttribute('position', new THREE.BufferAttribute(drops, 3));
    const bolt = new THREE.BufferGeometry();
    bolt.setAttribute('position', new THREE.BufferAttribute(new Float32Array(BOLT * 3), 3));
    bolt.setDrawRange(0, 0);
    const deckPositions = new Float32Array(CLOUDS * 3);
    for (let index = 0; index < CLOUDS; index++)
      deckPositions.set([random(-900, 900), random(290, 360), random(-1300, 50)], index * 3);
    const clouds = new THREE.BufferGeometry();
    clouds.setAttribute('position', new THREE.BufferAttribute(deckPositions, 3));
    const deck = colors.secondaryColor.clone().lerp(colors.backgroundColor, dark ? 0.55 : 0.2);
    return {
      drops,
      fall,
      rain,
      bolt,
      clouds,
      deck,
      streak: new THREE.LineBasicMaterial({
        color: dark ? colors.infoColor : colors.secondaryColor,
        transparent: true,
        opacity: 0.35,
        blending: blend(dark),
        depthWrite: false,
      }),
      arc: new THREE.LineBasicMaterial({
        color: dark ? colors.primaryColor : colors.infoColor,
        transparent: true,
        blending: blend(dark),
        depthWrite: false,
        fog: false,
      }),
      cloud: new THREE.PointsMaterial({
        color: deck.clone(),
        size: 320,
        map: texture('Cloud/cloud.png'),
        transparent: true,
        opacity: dark ? 0.55 : 0.35,
        depthWrite: false,
      }),
    };
  }, [count, colors, dark]);

  /* the sky colour the flash brightens, read once the page has set it */
  const sky = React.useRef<any>(null);
  React.useEffect(() => {
    const background = scene.background;
    sky.current = background ? background.clone() : null;
    return () => {
      /* undo a mid-flash tint, unless a theme change already gave the scene a new sky */
      if (sky.current && scene.background === background) {
        background.copy(sky.current);
        if (scene.fog) scene.fog.color.copy(sky.current);
      }
      [parts.rain, parts.bolt, parts.clouds].forEach(geometry => geometry.dispose());
      [parts.streak, parts.arc, parts.cloud].forEach(material => material.dispose());
    };
  }, [parts]);

  useFrame(({ clock }, rawDelta) => {
    const delta = Math.min(rawDelta, 0.1);
    const now = clock.elapsedTime;
    if (!still) {
      const speed = 120 + acceleration * 4;
      const length = speed * 0.035;
      const { drops, fall } = parts;
      for (let index = 0; index < count; index++) {
        const at = index * 6;
        drops[at + 1] -= speed * fall[index] * delta;
        drops[at] -= speed * fall[index] * delta * WIND;
        if (drops[at + 1] < 0) {
          drops[at + 1] += TOP;
          drops[at] = random(-250, 250);
        }
        drops[at + 3] = drops[at] + length * WIND;
        drops[at + 4] = drops[at + 1] + length;
        drops[at + 5] = drops[at + 2];
      }
      (parts.rain.attributes.position as THREE.BufferAttribute).needsUpdate = true;
    }

    if (still || !plan.roofs.length) return;
    if (now > strike.next) {
      /* hit one of the tall broken crowns */
      const roof = plan.roofs[Math.floor(Math.random() * Math.min(20, plan.roofs.length))];
      const from = new THREE.Vector3(roof.x + random(-80, 80), 330, roof.z + random(-60, 60));
      const out: any = parts.bolt.attributes.position.array;
      let used = jag(out, 0, from, roof, 14, 14);
      for (let branch = 0; branch < 2; branch++) {
        const split = Math.floor(random(2, 9)) * 6;
        const start = new THREE.Vector3(out[split], out[split + 1], out[split + 2]);
        const end = start.clone().add(new THREE.Vector3(random(-70, 70), -random(40, 90), random(-50, 50)));
        used = jag(out, used, start, end, 5, 8);
      }
      parts.bolt.setDrawRange(0, used);
      (parts.bolt.attributes.position as THREE.BufferAttribute).needsUpdate = true;
      strike.at = now;
      strike.next = now + random(4, 9);
    }
    const light = strike.at < 0 ? 0 : flash(now - strike.at);
    parts.arc.opacity = light;
    parts.cloud.color.copy(parts.deck).lerp(colors.infoColor, light * 0.35);
    if (sky.current && scene.background) {
      scene.background.copy(sky.current).lerp(colors.infoColor, light * 0.08);
      if (scene.fog) scene.fog.color.copy(scene.background);
    }
  });

  return (
    <>
      <lineSegments geometry={parts.rain} material={parts.streak} frustumCulled={false} />
      <lineSegments geometry={parts.bolt} material={parts.arc} frustumCulled={false} />
      <points geometry={parts.clouds} material={parts.cloud} />
    </>
  );
};
