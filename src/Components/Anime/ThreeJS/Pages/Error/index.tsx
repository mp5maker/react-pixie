import * as React from 'react';
import { Canvas } from 'react-three-fiber';

import { SettingsContext } from 'SettingsContext';
import { Stars } from 'Components/Anime/ThreeJS/Stars';
import { useDimension } from 'Hooks/UseDimension';
import { useMedia } from 'Hooks/UseMedia';
import { useSceneColors } from 'Hooks/UseSceneColors';

export const AnimeThreeJSError = ({ colors, theme }: any) => {
  const { acceleration }: any = React.useContext(SettingsContext);
  const { width, height } = useDimension();
  const isMediaGreaterThan771px = useMedia({ query: `(min-width: 771px)` });
  const reduceMotion = useMedia({ query: `(prefers-reduced-motion: reduce)` });

  React.useEffect(() => {
    const body: any = document.querySelector('body');
    body.style.setProperty('overflow', 'auto', 'important');
    body.style.setProperty('position', '', 'important');
    return () => {
      body.style.setProperty('overflow', 'hidden', '');
      body.style.setProperty('position', 'fixed', '');
    };
  }, []);

  const COLORS = useSceneColors(colors, theme);

  /* the stars are unlit points: no lights or shadows to pay for */
  return (
    <div style={{ width, height }}>
      <Canvas
        style={{ width, height }}
        sRGB={true}
        camera={{
          fov: 75,
          near: 1,
          far: 1000,
        }}
        pixelRatio={Math.min(window.devicePixelRatio || 1, 2)}>
        <Stars
          acceleration={acceleration}
          colors={COLORS}
          count={isMediaGreaterThan771px ? 6000 : 2500}
          still={reduceMotion}
        />
      </Canvas>
    </div>
  );
};
