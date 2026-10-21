import * as React from 'react';
import { Canvas } from 'react-three-fiber';

import { SettingsContext } from 'SettingsContext';
import { Bird } from 'Components/Anime/ThreeJS/Bird';
import { EntryCaption, Rig, entryKind } from 'Components/Anime/ThreeJS/Entrance';
import { Exodus } from 'Components/Anime/ThreeJS/Exodus';
import { Ocean } from 'Components/Anime/ThreeJS/Ocean';
import { Ruins, Sky, city, isDark } from 'Components/Anime/ThreeJS/Ruins';
import { Traffic } from 'Components/Anime/ThreeJS/Traffic';
import { UnrealBloom } from 'Components/Anime/ThreeJS/UnrealBloom';
import { useDimension } from 'Hooks/UseDimension';
import { useLockScroll } from 'Hooks/UseLockScroll';
import { useMedia } from 'Hooks/UseMedia';
import { useSceneColors } from 'Hooks/UseSceneColors';

export const AnimeThreeJSBird = ({ colors, theme }: any) => {
  const { bloom }: any = React.useContext(SettingsContext);
  const { width, height } = useDimension();
  const isMediaGreaterThan771px = useMedia({ query: `(min-width: 771px)` });
  const still = useMedia({ query: `(prefers-reduced-motion: reduce)` });
  const phone = !isMediaGreaterThan771px;
  /* read once on arrival: the shot depends on the page we came from */
  const entry = React.useRef({ kind: entryKind('bird'), p: 0, t: 0 }).current;

  useLockScroll(isMediaGreaterThan771px);

  const COLORS = useSceneColors(colors, theme);
  const dark = isDark(COLORS);
  /* the same skyline as /rain, sunk and leaning */
  const plan = React.useMemo(
    () => city({ count: phone ? 80 : 140, sunk: true, colors: COLORS }),
    [COLORS, phone],
  );
  const world = { plan, colors: COLORS, dark, phone, still };

  return (
    <div style={{ width, height }}>
      <Canvas
        style={{ width, height }}
        camera={{
          fov: 55,
          near: 1,
          far: 6000,
          position: [0, 75, 200],
        }}
        pixelRatio={Math.min(window.devicePixelRatio || 1, 2)}>
        <Sky color={COLORS.backgroundColor} density={0.0009} />
        <Rig world="bird" entry={entry} phone={phone} still={still} />
        <Ocean colors={COLORS} dark={dark} entry={entry} phone={phone} still={still} />
        <Ruins plan={plan} colors={COLORS} dark={dark} entry={entry} still={still} />
        <Traffic {...world} exodus={true} />
        <Exodus {...world} />
        <Bird colors={COLORS} dark={dark} phone={phone} still={still} />
        {bloom && <UnrealBloom />}
      </Canvas>
      <EntryCaption kind={entry.kind} />
    </div>
  );
};
