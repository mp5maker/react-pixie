import * as React from 'react';
import { Canvas } from 'react-three-fiber';
import { useTranslation } from 'react-i18next';

import { Skybox } from 'Components/Anime/ThreeJS/Skybox';
import { OrbitControl } from 'Components/Anime/ThreeJS/OrbitControl';
import * as Routes from 'Constants/Routes';
import { useDimension } from 'Hooks/UseDimension';
import { useMedia } from 'Hooks/UseMedia';

export const AnimeThreeJSSkybox = ({ colors, theme, history }: any) => {
  const { t, i18n } = useTranslation();
  const { width, height } = useDimension();
  const isMediaGreaterThan771px = useMedia({ query: `(min-width: 771px)` });

  React.useEffect(() => {
    const body: any = document.querySelector('body');
    if (isMediaGreaterThan771px) {
      body.style.setProperty('overflow', 'hidden', 'important');
      body.style.setProperty('position', 'fixed', 'important');
    } else {
      body.style.setProperty('position', 'fixed', '');
    }
    return () => {
      body.style.setProperty('overflow', 'hidden', '');
      body.style.setProperty('position', 'fixed', '');
    };
  }, [isMediaGreaterThan771px]);

  return (
    <div style={{ width, height }}>
      <Canvas
        style={{ width, height }}
        shadowMap={true}
        camera={{
          fov: 55,
          near: 45,
          far: 30000,
        }}
        pixelRatio={window.devicePixelRatio || 1}>
        <OrbitControl />
        <Skybox />
      </Canvas>
    </div>
  );
};
