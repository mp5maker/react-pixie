import * as React from 'react';
import { Canvas } from 'react-three-fiber';

import { SettingsContext } from 'SettingsContext';
import { BonFire } from 'Components/Anime/ThreeJS/BonFire';
import { Drain, EntryCaption, Rig, entryKind } from 'Components/Anime/ThreeJS/Entrance';
import { Ruins, Sky, city, isDark } from 'Components/Anime/ThreeJS/Ruins';
import { Storm } from 'Components/Anime/ThreeJS/Storm';
import { Traffic } from 'Components/Anime/ThreeJS/Traffic';
import { useDimension } from 'Hooks/UseDimension';
import { useLockScroll } from 'Hooks/UseLockScroll';
import { useMedia } from 'Hooks/UseMedia';
import { useSceneColors } from 'Hooks/UseSceneColors';

export const AnimeThreeJSRain = ({ colors, theme }: any) => {
  const { acceleration, fire }: any = React.useContext(SettingsContext);
  const { width, height } = useDimension();
  const isMediaGreaterThan771px = useMedia({ query: `(min-width: 771px)` });
  const still = useMedia({ query: `(prefers-reduced-motion: reduce)` });
  const phone = !isMediaGreaterThan771px;
  /* read once on arrival: the shot depends on the page we came from */
  const entry = React.useRef({ kind: entryKind('rain'), p: 0, t: 0 }).current;

  useLockScroll(isMediaGreaterThan771px);

  const COLORS = useSceneColors(colors, theme);
  const dark = isDark(COLORS);
  const plan = React.useMemo(
    () => city({ count: phone ? 80 : 140, sunk: false, colors: COLORS }),
    [COLORS, phone],
  );

  return (
    <div style={{ width, height }}>
      <Canvas
        style={{ width, height }}
        camera={{
          fov: 45,
          near: 1,
          far: 5000,
          position: [0, 36, 150],
        }}
        pixelRatio={Math.min(window.devicePixelRatio || 1, 2)}>
        <Sky color={COLORS.backgroundColor} density={0.0016} />
        <Rig world="rain" entry={entry} phone={phone} still={still} />
        <Ruins plan={plan} colors={COLORS} dark={dark} entry={entry} still={still} />
        <Traffic plan={plan} colors={COLORS} dark={dark} phone={phone} still={still} />
        {entry.kind === 'drain' && !still && <Drain entry={entry} colors={COLORS} />}
        {fire ? (
          <BonFire />
        ) : (
          <Storm
            plan={plan}
            colors={COLORS}
            dark={dark}
            acceleration={acceleration}
            phone={phone}
            still={still}
          />
        )}
      </Canvas>
      <EntryCaption kind={entry.kind} />
    </div>
  );
};
