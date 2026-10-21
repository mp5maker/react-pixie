import * as React from 'react';
import { Canvas } from 'react-three-fiber';

import { SettingsContext } from 'SettingsContext';
import { EntryCaption, Rig, entryKind } from 'Components/Anime/ThreeJS/Entrance';
import { Planets } from 'Components/Anime/ThreeJS/Planets';
import { Sky, isDark } from 'Components/Anime/ThreeJS/Ruins';
import { UnrealBloom } from 'Components/Anime/ThreeJS/UnrealBloom';
import { useDimension } from 'Hooks/UseDimension';
import { useLockScroll } from 'Hooks/UseLockScroll';
import { useMedia } from 'Hooks/UseMedia';
import { useSceneColors } from 'Hooks/UseSceneColors';

export const AnimeThreeJSSkybox = ({ colors, theme }: any) => {
  const { bloom }: any = React.useContext(SettingsContext);
  const { width, height } = useDimension();
  const isMediaGreaterThan771px = useMedia({ query: `(min-width: 771px)` });
  const still = useMedia({ query: `(prefers-reduced-motion: reduce)` });
  const phone = !isMediaGreaterThan771px;
  /* read once on arrival: the shot depends on the page we came from */
  const entry = React.useRef({ kind: entryKind('skybox'), p: 0, t: 0 }).current;
  useLockScroll(isMediaGreaterThan771px);

  const COLORS = useSceneColors(colors, theme);
  const dark = isDark(COLORS);

  return (
    <div style={{ width, height }}>
      <Canvas
        style={{ width, height }}
        camera={{
          fov: 55,
          near: 1,
          far: 3000,
          position: [0, 12, 120],
        }}
        pixelRatio={Math.min(window.devicePixelRatio || 1, 2)}>
        <Sky color={COLORS.backgroundColor} density={0.0018} />
        <Rig world="skybox" entry={entry} phone={phone} still={still} />
        <Planets colors={COLORS} dark={dark} phone={phone} entry={entry} still={still} />
        {bloom && <UnrealBloom />}
      </Canvas>
      <EntryCaption kind={entry.kind} />
    </div>
  );
};
