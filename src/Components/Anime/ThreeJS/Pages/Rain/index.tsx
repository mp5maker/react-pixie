import * as React from 'react';
import * as THREE from 'three';
import { Canvas } from 'react-three-fiber';

import { SettingsContext } from 'SettingsContext';
import { MusicContext } from 'MusicContext';
import { RectangleLight } from 'Components/Anime/ThreeJS/RectangleLight';
import { InteriorGround } from 'Components/Anime/ThreeJS/InteriorGround';
import { ShinySphere } from 'Components/Anime/ThreeJS/ShinySphere';
import { Moon } from 'Components/Anime/ThreeJS/Moon';
import { RainDroplets } from 'Components/Anime/ThreeJS/RainDroplets';
import { BonFire } from 'Components/Anime/ThreeJS/BonFire';
import { Wall } from 'Components/Anime/ThreeJS/House/Wall';
import { Text } from 'Components/Anime/ThreeJS/Text';
import { Cloud } from 'Components/Anime/ThreeJS/Cloud';
import { useDimension } from 'Hooks/UseDimension';
import { useMedia } from 'Hooks/UseMedia';

export const AnimeThreeJSRain = ({ colors, theme, history }: any) => {
  const { acceleration, fire }: any = React.useContext(SettingsContext);
  const { frequency }: any = React.useContext(MusicContext);
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

  /* Colors */
  const COLORS = {
    primaryColor: new THREE.Color(colors[theme].primaryColor),
    backgroundColor: new THREE.Color(colors[theme].backgroundColor),
    secondaryColor: new THREE.Color(colors[theme].secondaryColor),
    infoColor: new THREE.Color(colors[theme].infoColor),
    dangerColor: new THREE.Color(colors[theme].dangerColor),
    warningColor: new THREE.Color(colors[theme].warningColor),
    successColor: new THREE.Color(colors[theme].successColor),
    fogColor: new THREE.Color(colors[theme].fogColor),
  };

  const themeDependentMemo = React.useMemo(() => {
    return (
      <>
        <ambientLight color={COLORS.primaryColor} intensity={0.1} />
        <RectangleLight colors={COLORS} />
        <InteriorGround colors={COLORS} />
        <Text
          position={{ x: -800, y: 0, z: -200 }}
          text={`S. Photon Khan`}
          meshColor={COLORS.backgroundColor}
        />
        <Text
          position={{ x: -250, y: 0, z: -500 }}
          text={`Awesome!`}
          meshColor={COLORS.primaryColor}
        />
        <Wall colors={COLORS} />
      </>
    );
  }, [theme]);

  const frequencyAndColorDependentMemo = React.useMemo(() => {
    return (
      <>
        <ShinySphere frequency={frequency} colors={COLORS} />
        <Cloud frequency={frequency} colors={COLORS} noOfClouds={25} />
      </>
    );
  }, [theme, frequency]);

  const fireThemeAccelerationDependentMemo = React.useMemo(() => {
    return (
      <>
        {fire ? (
          <BonFire />
        ) : (
          <>
            <RainDroplets acceleration={acceleration} colors={COLORS} />
            <Moon colors={COLORS} />
          </>
        )}
      </>
    );
  }, [theme, acceleration, fire]);

  return (
    <div style={{ width, height }}>
      <Canvas
        style={{ width, height }}
        shadowMap={true}
        colorManagement={true}
        camera={{
          fov: 45,
          near: 1,
          far: 5000,
          position: [100, 40, 120],
        }}
        pixelRatio={window.devicePixelRatio || 1}>
        {themeDependentMemo}
        {frequencyAndColorDependentMemo}
        {fireThemeAccelerationDependentMemo}
      </Canvas>
    </div>
  );
};
