import * as React from 'react';
import { Canvas } from 'react-three-fiber';
import { Physics } from 'use-cannon';

import { SettingsContext } from 'SettingsContext';
import { Debris } from 'Components/Anime/ThreeJS/Debris';
import { EntryCaption, Rig, entryKind } from 'Components/Anime/ThreeJS/Entrance';
import { Ruins, Sky, city, isDark } from 'Components/Anime/ThreeJS/Ruins';
import { UnrealBloom } from 'Components/Anime/ThreeJS/UnrealBloom';
import { useDimension } from 'Hooks/UseDimension';
import { useLockScroll } from 'Hooks/UseLockScroll';
import { useMedia } from 'Hooks/UseMedia';
import { useSceneColors } from 'Hooks/UseSceneColors';

export const AnimeThreeJSPhysics = ({ colors, theme }: any) => {
  const { bloom }: any = React.useContext(SettingsContext);
  const { width, height } = useDimension();
  const isMediaGreaterThan771px = useMedia({ query: `(min-width: 771px)` });
  const still = useMedia({ query: `(prefers-reduced-motion: reduce)` });
  const phone = !isMediaGreaterThan771px;
  /* read once on arrival: the shot depends on the page we came from */
  const entry = React.useRef({ kind: entryKind('physics'), p: 0, t: 0 }).current;
  useLockScroll(isMediaGreaterThan771px);

  const COLORS = useSceneColors(colors, theme);
  const dark = isDark(COLORS);
  /* the /bird skyline, smaller and pushed back behind the falling towers */
  const plan = React.useMemo(
    () => city({ count: phone ? 50 : 90, sunk: true, colors: COLORS }),
    [COLORS, phone],
  );

  return (
    <div style={{ width, height }}>
      <Canvas
        style={{ width, height }}
        camera={{
          fov: 50,
          near: 1,
          far: 4000,
          position: [-8, 34, 100],
        }}
        pixelRatio={Math.min(window.devicePixelRatio || 1, 2)}>
        <Sky color={COLORS.backgroundColor} density={0.0014} />
        <Rig world="physics" entry={entry} phone={phone} still={still} />
        <group position={[0, 0, -220]}>
          <Ruins plan={plan} colors={COLORS} dark={dark} entry={entry} still={still} />
        </group>
        {/* remounted on a reduced-motion change: the bodies are built once */}
        <Physics
          key={String(still)}
          gravity={still ? [0, 0, 0] : [0, -40, 0]}
          allowSleep={false}
          iterations={phone ? 4 : 6}
          defaultContactMaterial={{ friction: 0.2, restitution: 0.25 }}>
          <Debris colors={COLORS} dark={dark} phone={phone} still={still} />
        </Physics>
        {bloom && <UnrealBloom />}
      </Canvas>
      <EntryCaption kind={entry.kind} />
    </div>
  );
};
