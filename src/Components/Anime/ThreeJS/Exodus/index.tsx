import * as React from 'react';
import { useFrame } from 'react-three-fiber';
import * as THREE from 'three';

import { Part, solid } from 'Components/Anime/ThreeJS/Fleet';
import { blend, merge, texture } from 'Components/Anime/ThreeJS/Ruins';

const random = (min: number, max: number) => min + Math.random() * (max - min);
const pick = (list: any[]) => list[Math.floor(Math.random() * list.length)];

/* the ark everyone is trying to reach, parked above the cloud line; length on x, nose on +x */
export const ARK_AT = new THREE.Vector3(-150, 520, -1400);
const ARK = {
  hull: solid(new THREE.BoxBufferGeometry(280, 22, 64)),
  deck: solid(new THREE.BoxBufferGeometry(160, 14, 40).translate(-30, 18, 0)),
  bridge: solid(new THREE.BoxBufferGeometry(30, 26, 22).translate(70, 30, 0)),
  prow: solid(new THREE.ConeBufferGeometry(32, 70, 4).rotateZ(-Math.PI / 2).translate(175, 0, 0)),
  engine: solid(new THREE.CylinderBufferGeometry(16, 20, 40, 8).rotateZ(Math.PI / 2)),
  ring: solid(new THREE.CylinderBufferGeometry(78, 78, 10, 16, 1, true).rotateZ(Math.PI / 2)),
};
const PLUME = new THREE.ConeBufferGeometry(14, 90, 8, 1, true).rotateZ(Math.PI / 2).translate(-45, 0, 0);
const LIGHT = new THREE.BoxBufferGeometry(3, 3, 3);
const RUNNING = Array.from({ length: 12 }, (_, index): [number, number, number] => [-130 + index * 24, 12, index % 2 ? 33 : -33]);

/* the space elevator: a tether out of the sea, pods crawling up it */
const ELEVATOR = new THREE.Vector3(260, 0, -700);
const TOP = 2400;
const BASE = solid(new THREE.CylinderBufferGeometry(26, 34, 14, 6).translate(0, 7, 0));
const POD = solid(new THREE.BoxBufferGeometry(7, 11, 7));
const TETHER = new THREE.BufferGeometry().setFromPoints(
  [-3, 3].reduce((list: THREE.Vector3[], x) => list.concat([new THREE.Vector3(x, 14, 0), new THREE.Vector3(x, TOP, 0)]), []),
);

/* a person: legs and torso, head, a lit visor facing +z */
const BODY = merge([
  new THREE.BoxBufferGeometry(0.9, 2, 0.6).translate(0, 1, 0),
  new THREE.BoxBufferGeometry(0.6, 0.6, 0.6).translate(0, 2.35, 0),
]);
const VISOR = new THREE.BoxBufferGeometry(0.5, 0.16, 0.08).translate(0, 2.4, 0.32);
const FIGURE = 2.6;
const MATRIX = new THREE.Matrix4();
const SPOT = new THREE.Vector3();
const TURN = new THREE.Quaternion();
const UP = new THREE.Vector3(0, 1, 0);
const SCALE = new THREE.Vector3();

const Ark = ({ colors, still }: any) => {
  const group: any = React.useRef();
  const ring: any = React.useRef();
  const plumes = React.useRef<any[]>([]);
  const lights = React.useRef<any[]>([]);

  /* far past the fog, so it has to opt out of it to be seen */
  React.useLayoutEffect(() => {
    group.current.traverse((child: any) => {
      if (child.material) {
        child.material.fog = false;
        child.material.needsUpdate = true;
      }
    });
  }, [colors]);

  useFrame(({ clock }) => {
    if (still) return;
    const t = clock.elapsedTime;
    group.current.position.y = ARK_AT.y + Math.sin(t * 0.3) * 6;
    ring.current.rotation.x = t * 0.15;
    plumes.current.forEach((plume, index) => plume && plume.scale.set(1 + 0.2 * Math.sin(t * 17 + index * 2), 1, 1));
    const blink = Math.floor(t * 1.5) % 2;
    lights.current.forEach((light, index) => light && (light.visible = index % 2 === blink));
  });

  const fill = colors.backgroundColor;
  const line = colors.primaryColor;
  return (
    <group ref={group} position={ARK_AT} rotation={[0, 0.35, 0.04]} scale={[1.5, 1.5, 1.5]}>
      <Part shape={ARK.hull} fill={fill} line={line} />
      <Part shape={ARK.deck} fill={fill} line={line} />
      <Part shape={ARK.bridge} fill={fill} line={colors.infoColor} />
      <Part shape={ARK.prow} fill={fill} line={line} />
      {[-22, 22].map((z, index) => (
        <group key={z} position={[-160, 0, z]}>
          <Part shape={ARK.engine} fill={fill} line={colors.infoColor} />
          <mesh ref={(mesh: any) => (plumes.current[index] = mesh)} geometry={PLUME}>
            <meshBasicMaterial
              attach="material"
              color={colors.infoColor}
              transparent={true}
              opacity={0.55}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
              side={THREE.DoubleSide}
            />
          </mesh>
        </group>
      ))}
      <group ref={ring} position={[-40, 0, 0]}>
        <Part shape={ARK.ring} fill={fill} line={colors.dangerColor} />
      </group>
      {RUNNING.map((position, index) => (
        <mesh
          key={index}
          ref={(mesh: any) => (lights.current[index] = mesh)}
          geometry={LIGHT}
          position={position}>
          <meshBasicMaterial attach="material" color={index % 3 ? colors.dangerColor : colors.warningColor} />
        </mesh>
      ))}
    </group>
  );
};

const Elevator = ({ colors, dark, phone, still }: any) => {
  const pods = React.useRef<any[]>([]);
  const climb = React.useMemo(
    () => Array.from({ length: phone ? 4 : 6 }, (_, index) => ({ y: (index * TOP) / 6, speed: random(26, 40) })),
    [phone],
  );
  useFrame((_, rawDelta) => {
    const delta = still ? 0 : Math.min(rawDelta, 0.1);
    climb.forEach((pod, index) => {
      pod.y = (pod.y + pod.speed * delta) % TOP;
      if (pods.current[index]) pods.current[index].position.y = 20 + pod.y;
    });
  });
  return (
    <group position={ELEVATOR}>
      <Part shape={BASE} fill={colors.backgroundColor} line={colors.infoColor} />
      <lineSegments geometry={TETHER}>
        <lineBasicMaterial attach="material" color={dark ? colors.infoColor : colors.primaryColor} transparent={true} opacity={0.6} />
      </lineSegments>
      {climb.map((_, index) => (
        <group key={index} ref={(group: any) => (pods.current[index] = group)}>
          <Part shape={POD} fill={colors.backgroundColor} line={index % 2 ? colors.dangerColor : colors.infoColor} />
        </group>
      ))}
    </group>
  );
};

/* the crowd: queues shuffling onto every landing pad, and the ones who could not wait, rising on jetpacks */
const People = ({ plan, colors, dark, phone, still }: any) => {
  const bodies: any = React.useRef();
  const visors: any = React.useRef();
  const queue = phone ? 14 : 28;
  const flying = phone ? 5 : 10;
  const people = React.useMemo(() => {
    const walker = (pad: THREE.Vector3) => ({ pad, angle: random(0, Math.PI * 2), p: Math.random(), pace: random(0.08, 0.14) });
    const flyer = () => {
      const from = pick(plan.roofs.slice(0, 30));
      return { from: from.clone(), drift: new THREE.Vector3(random(-0.3, 0.1), 1, random(-0.5, -0.1)), p: Math.random(), pace: random(0.04, 0.07) };
    };
    return {
      walkers: plan.pads.reduce((list: any[], pad: THREE.Vector3) => list.concat(Array.from({ length: queue }, () => walker(pad))), []),
      flyers: Array.from({ length: flying }, flyer),
      reset: flyer,
    };
  }, [plan, queue, flying]);
  const total = people.walkers.length + people.flyers.length;

  const parts = React.useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(flying * 3), 3));
    return {
      body: new THREE.MeshBasicMaterial({ color: dark ? colors.secondaryColor : colors.primaryColor }),
      visor: new THREE.MeshBasicMaterial({ color: colors.infoColor }),
      thrust: geometry,
      flame: new THREE.PointsMaterial({
        color: colors.warningColor,
        size: 5,
        map: texture('Circle/circle.png'),
        transparent: true,
        depthWrite: false,
        blending: blend(dark),
      }),
    };
  }, [colors, dark, flying]);
  React.useEffect(
    () => () => {
      [parts.body, parts.visor, parts.flame].forEach(material => material.dispose());
      parts.thrust.dispose();
    },
    [parts],
  );

  useFrame(({ clock }, rawDelta) => {
    if (!bodies.current || !visors.current) return;
    const delta = still ? 0 : Math.min(rawDelta, 0.1);
    const t = clock.elapsedTime;
    let slot = 0;
    const place = (scale: number) => {
      MATRIX.compose(SPOT, TURN, SCALE.setScalar(FIGURE * scale));
      bodies.current.setMatrixAt(slot, MATRIX);
      visors.current.setMatrixAt(slot, MATRIX);
      slot += 1;
    };
    people.walkers.forEach((walker: any) => {
      /* from the roof edge to the pad, then they are aboard and someone new joins the back */
      walker.p += walker.pace * delta;
      if (walker.p > 1) {
        walker.p = 0;
        walker.angle = random(0, Math.PI * 2);
      }
      const radius = 16 - walker.p * 9;
      SPOT.set(
        walker.pad.x + Math.cos(walker.angle) * radius,
        walker.pad.y + (still ? 0 : Math.abs(Math.sin(t * 6 + walker.angle * 9)) * 0.25),
        walker.pad.z + Math.sin(walker.angle) * radius,
      );
      TURN.setFromAxisAngle(UP, Math.atan2(-Math.cos(walker.angle), -Math.sin(walker.angle)));
      place(walker.p > 0.92 ? (1 - walker.p) / 0.08 : 1);
    });
    const flames: any = parts.thrust.attributes.position.array;
    people.flyers.forEach((flyer: any, index: number) => {
      flyer.p += flyer.pace * delta;
      if (flyer.p > 1) Object.assign(flyer, people.reset(), { p: 0 });
      const height = flyer.p * flyer.p * 520;
      SPOT.copy(flyer.from).addScaledVector(flyer.drift, height);
      SPOT.x += Math.sin(t * 2 + index) * 2;
      TURN.setFromAxisAngle(UP, index);
      place(1);
      flames[index * 3] = SPOT.x;
      flames[index * 3 + 1] = SPOT.y - 0.4;
      flames[index * 3 + 2] = SPOT.z;
    });
    bodies.current.instanceMatrix.needsUpdate = true;
    visors.current.instanceMatrix.needsUpdate = true;
    (parts.thrust.attributes.position as THREE.BufferAttribute).needsUpdate = true;
  });

  return (
    <>
      <instancedMesh ref={bodies} args={[BODY, parts.body, total]} frustumCulled={false} />
      <instancedMesh ref={visors} args={[VISOR, parts.visor, total]} frustumCulled={false} />
      <points geometry={parts.thrust} material={parts.flame} frustumCulled={false} />
    </>
  );
};

/* far traffic: hundreds of lights climbing out of the haze towards orbit */
const Swarm = ({ colors, dark, phone, still }: any) => {
  const count = phone ? 30 : 70;
  const swarm = React.useMemo(() => {
    const palette = [colors.infoColor, colors.dangerColor, colors.warningColor];
    const from = Array.from({ length: count }, () => new THREE.Vector3(random(-1600, 1600), random(150, 350), random(-2600, -1500)));
    const pace = Float32Array.from({ length: count }, () => random(0.02, 0.05));
    const life = Float32Array.from({ length: count }, () => Math.random());
    const colorArray = new Float32Array(count * 3);
    from.forEach((_, index) => palette[index % 3].toArray(colorArray, index * 3));
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(count * 3), 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));
    const material = new THREE.PointsMaterial({
      size: 7,
      map: texture('Circle/circle.png'),
      vertexColors: true,
      transparent: true,
      depthWrite: false,
      blending: blend(dark),
      fog: false,
    });
    return { from, pace, life, geometry, material };
  }, [colors, dark, count]);
  React.useEffect(
    () => () => {
      swarm.geometry.dispose();
      swarm.material.dispose();
    },
    [swarm],
  );

  useFrame((_, rawDelta) => {
    const delta = still ? 0 : Math.min(rawDelta, 0.1);
    const positions: any = swarm.geometry.attributes.position.array;
    swarm.from.forEach((from, index) => {
      swarm.life[index] = (swarm.life[index] + swarm.pace[index] * delta) % 1;
      const k = swarm.life[index];
      positions[index * 3] = from.x + k * 120;
      positions[index * 3 + 1] = from.y + k * k * 1400;
      positions[index * 3 + 2] = from.z - k * 400;
    });
    (swarm.geometry.attributes.position as THREE.BufferAttribute).needsUpdate = true;
  });

  return <points geometry={swarm.geometry} material={swarm.material} frustumCulled={false} />;
};

/* /bird: the end of the city, and everyone in it trying to get off the planet */
export const Exodus = (props: any) => (
  <>
    <Ark {...props} />
    <Elevator {...props} />
    <People {...props} />
    <Swarm {...props} />
  </>
);
