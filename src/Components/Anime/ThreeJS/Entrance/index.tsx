import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { useFrame, useThree } from 'react-three-fiber';
import * as THREE from 'three';

import { RouteFrom } from 'Utilities/RouteFrom';

/* how each world is entered depends on where you came from; '*' is anywhere else */
const SPACE = { '/rain': 'launch', '/bird': 'launch', '/physics': 'launch', '/skybox': 'jump' };
const ENTRIES: any = {
  rain: { '/': 'orbit', '/home': 'orbit', '/experience': 'build', '/bird': 'drain', '/physics': 'drop', '/skybox': 'orbit', '*': 'sweep' },
  bird: { '/': 'orbit', '/home': 'orbit', '/experience': 'build', '/rain': 'flood', '/physics': 'drop', '/skybox': 'orbit', '*': 'sweep' },
  /* the landing page opens as it always has; the box routes pass 'none' themselves */
  home: { ...SPACE, '': 'none', '/': 'none', '/home': 'none', '/experience': 'retreat', '*': 'scan' },
  experience: { ...SPACE, '/': 'dive', '/home': 'dive', '*': 'scan' },
  physics: { '/': 'orbit', '/home': 'orbit', '/experience': 'orbit', '/skybox': 'orbit', '/rain': 'fall', '/bird': 'fall', '*': 'crane' },
  skybox: { '/': 'warp', '/home': 'warp', '/experience': 'warp', '/rain': 'climb', '/bird': 'climb', '/physics': 'climb', '*': 'drift' },
};
export const entryKind = (world: string) => ENTRIES[world][RouteFrom.get()] || ENTRIES[world]['*'];

/* where each world's camera settles; a free pose hands the camera to the orbit controls */
const SPACE_POSE = { position: [0, 0, 5], look: [0, 0, -25], fov: 75, portrait: 75, free: true };
const POSES: any = {
  rain: { position: [0, 36, 150], look: [0, 40, -160], fov: 45, portrait: 62 },
  bird: { position: [0, 75, 200], look: [0, 90, -300], fov: 55, portrait: 70 },
  physics: { position: [-8, 34, 100], look: [-8, 30, 0], fov: 50, portrait: 85 },
  skybox: { position: [0, 12, 120], look: [0, 0, -60], fov: 55, portrait: 80 },
  home: SPACE_POSE,
  experience: SPACE_POSE,
};

const easeOut = (p: number) => 1 - Math.pow(1 - p, 3);
const easeInOut = (p: number) => (p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2);
/* accelerate like a body, then pull up hard at the end */
const freefall = (p: number) => (p < 0.7 ? 0.5 * Math.pow(p / 0.7, 2) : 0.5 + 0.5 * easeOut((p - 0.7) / 0.3));

/* camera keys before the settle pose, as [positions, look targets] */
const SHOTS: any = {
  /* from the fleet's sky: straight down out of orbit */
  orbit: {
    position: [[0, 1400, -300], [0, 520, 60]],
    look: [[0, 0, -320], [0, 20, -260]],
    time: 3.6,
    ease: easeOut,
  },
  /* from the physics sandbox: free fall, then a hard flare just above the street */
  drop: {
    position: [[20, 700, 150], [10, 90, 150]],
    look: [[10, 0, 90], [0, 30, -80]],
    time: 2.4,
    ease: freefall,
  },
  /* from /experience: hold high while the sector rebuilds itself */
  build: {
    position: [[0, 170, 280], [0, 100, 220]],
    look: [[0, 10, -240], [0, 30, -200]],
    time: 3.2,
    ease: easeInOut,
  },
  /* from /bird: the flood drains away below the lens */
  drain: {
    position: [[0, 90, 200], [0, 60, 175]],
    look: [[0, 60, -200], [0, 48, -180]],
    time: 2.8,
    ease: easeInOut,
  },
  /* from /rain: the street view rises with the water */
  flood: {
    position: [[0, 36, 150], [0, 55, 175]],
    look: [[0, 40, -160], [0, 65, -240]],
    time: 3.2,
    ease: easeInOut,
  },
  /* first load or anywhere else: a low sweep in from the side */
  sweep: {
    position: [[-420, 60, 40], [-150, 45, 120]],
    look: [[-60, 40, -300], [0, 40, -220]],
    time: 3,
    ease: easeOut,
  },
  /* into /physics from a city: falling with the debris, past the torn decks */
  fall: {
    position: [[-8, 300, 40], [-8, 140, 70]],
    look: [[-8, 60, -10], [-8, 40, -5]],
    time: 2.6,
    ease: freefall,
  },
  /* into /physics from anywhere else: up out of the flood at the foot of the towers */
  crane: {
    position: [[-70, 3, 60], [-40, 8, 90]],
    look: [[-20, 40, -20], [-12, 34, -5]],
    time: 3.2,
    ease: easeInOut,
  },
  /* into the broken planets from the fleet's sky: out of a warp, the pieces still flying in */
  warp: {
    position: [[0, 0, 1400], [0, 6, 380]],
    look: [[0, 0, -60], [0, 0, -60]],
    time: 2.4,
    ease: (p: number) => 1 - Math.pow(1 - p, 5),
  },
  /* into the broken planets from a city: climbing out of a gravity well below them */
  climb: {
    position: [[-60, -320, 160], [-30, -110, 150]],
    look: [[-40, 0, -60], [0, -10, -60]],
    time: 3,
    ease: easeOut,
  },
  /* into the broken planets from anywhere else: a slow drift in from the side */
  drift: {
    position: [[260, 80, -20], [150, 40, 80]],
    look: [[0, 0, -60], [0, 0, -60]],
    time: 3.2,
    ease: easeInOut,
  },
  /* into open space from a city: straight up through the starfield, levelling off at the box */
  launch: {
    position: [[0, -260, 140], [0, -70, 60]],
    look: [[0, 40, -60], [0, 10, -40]],
    time: 3,
    ease: easeOut,
  },
  /* from the broken planets: out of a jump, braking hard on the box */
  jump: {
    position: [[0, 0, 620], [0, 0, 160]],
    look: [[0, 0, 0], [0, 0, -25]],
    time: 2.2,
    ease: (p: number) => 1 - Math.pow(1 - p, 5),
  },
  /* from /experience by the menu: backing out of the skill field */
  retreat: {
    position: [[0, 30, -200], [0, 20, -70]],
    look: [[0, 0, -420], [0, 0, -220]],
    time: 3,
    ease: easeInOut,
  },
  /* from / by the menu: a dive from above onto the box */
  dive: {
    position: [[0, 260, 80], [0, 80, 40]],
    look: [[0, 0, -40], [0, 0, -30]],
    time: 2.8,
    ease: easeInOut,
  },
  /* first load or anywhere else in space: a pan across the field */
  scan: {
    position: [[220, 40, -40], [90, 15, 20]],
    look: [[-40, 0, -260], [-10, 0, -80]],
    time: 3,
    ease: easeOut,
  },
  /* the box already flew this one: start settled (space worlds only; a curve needs two points) */
  none: { position: [SPACE_POSE.position], look: [SPACE_POSE.look], time: 0, ease: easeOut },
};

export const entryTime = (kind: string) => SHOTS[kind].time;

const vectors = (list: number[][]) => list.map(([x, y, z]) => new THREE.Vector3(x, y, z));
const LOOK = new THREE.Vector3();
const DRIFT = new THREE.Vector3();

/* flies the entry shot, then drifts and follows the pointer; entry.p tells the world how far along it is */
export const Rig = ({ world, entry, phone, still, onSettle }: any) => {
  const { camera, size }: any = useThree();
  const portrait = size.width < size.height;
  const pose = POSES[world];
  const path = React.useMemo(() => {
    const { position, look } = SHOTS[entry.kind];
    return {
      position: new THREE.CatmullRomCurve3(vectors(position.concat([pose.position]))),
      look: new THREE.CatmullRomCurve3(vectors(look.concat([pose.look]))),
      end: new THREE.Vector3(...pose.position),
      target: new THREE.Vector3(...pose.look),
    };
  }, [entry.kind, world]);

  React.useEffect(() => {
    camera.fov = portrait ? pose.portrait : pose.fov;
    camera.updateProjectionMatrix();
  }, [portrait, world]);

  useFrame(({ clock, mouse }, rawDelta) => {
    const delta = Math.min(rawDelta, 0.1);
    if (entry.p < 1) {
      const { time, ease } = SHOTS[entry.kind];
      /* clamped frame time, so a first-frame shader compile pauses the shot instead of skipping it;
         reduced motion lands on the last frame at once */
      entry.t += still ? time : delta;
      entry.p = time ? Math.min(entry.t / time, 1) : 1;
      const t = ease(entry.p);
      path.position.getPoint(t, camera.position);
      camera.lookAt(path.look.getPoint(t, LOOK));
      if (entry.p === 1 && onSettle) onSettle();
      return;
    }
    if (still || pose.free) return;
    /* idle: a slow drift, plus parallax on a pointer */
    const t = clock.elapsedTime;
    DRIFT.set(Math.sin(t * 0.13) * 14 + (phone ? 0 : mouse.x * 18), Math.sin(t * 0.21) * 3 + (phone ? 0 : mouse.y * 6), 0).add(path.end);
    camera.position.lerp(DRIFT, Math.min(1, delta * 1.5));
    camera.lookAt(path.target);
  });

  return null;
};

/* the /bird flood drains off the city before /rain starts */
export const Drain = ({ entry, colors }: any) => {
  const group: any = React.useRef();
  useFrame(() => {
    if (!group.current) return;
    group.current.visible = entry.p < 1;
    group.current.position.y = 70 - 75 * easeInOut(entry.p);
  });
  return (
    <group ref={group}>
      <mesh rotation-x={-Math.PI / 2}>
        <planeBufferGeometry attach="geometry" args={[2600, 2600]} />
        <meshBasicMaterial
          attach="material"
          color={colors.backgroundColor.clone().lerp(colors.infoColor, 0.18)}
          transparent={true}
          opacity={0.88}
        />
      </mesh>
      <gridHelper args={[2600, 80, colors.infoColor, colors.infoColor]} position={[0, 0.2, 0]} />
    </group>
  );
};

/* names the entry in the HUD while it plays, then gets out of the way */
export const EntryCaption = ({ kind, top }: any) => {
  const { t } = useTranslation();
  const [shown, setShown] = React.useState(true);
  React.useEffect(() => {
    const timer = window.setTimeout(() => setShown(false), (entryTime(kind) + 0.6) * 1000);
    return () => window.clearTimeout(timer);
  }, [kind]);
  if (!shown || kind === 'none') return null;
  return (
    <div className={`world-entry hud-panel${top ? ' world-entry-top' : ''}`} role="status">
      <span className={`hud-label`}>{t(`ENTRY_SECTOR`)}</span>
      <span className={`hud-display`}>{t(`ENTRY_${kind.toUpperCase()}`)}</span>
    </div>
  );
};
