import * as React from 'react';
import { Canvas } from 'react-three-fiber';

import { Box } from 'Components/Anime/ThreeJS/Box';
import { EntryCaption, Rig, entryKind } from 'Components/Anime/ThreeJS/Entrance';
import { OrbitControl } from 'Components/Anime/ThreeJS/OrbitControl';
import { Skills } from 'Components/Anime/ThreeJS/Skills';
import { Stars } from 'Components/Anime/ThreeJS/Stars';
import * as Routes from 'Constants/Routes';
import { useDimension } from 'Hooks/UseDimension';
import { useLockScroll } from 'Hooks/UseLockScroll';
import { useMedia } from 'Hooks/UseMedia';
import { useSceneColors } from 'Hooks/UseSceneColors';
import { MusicContext } from 'MusicContext';
import { SettingsContext } from 'SettingsContext';

export const AnimeThreeJSExperience = ({ colors, theme, history }: any) => {
  const {
    rotationX,
    rotationY,
    rotationZ,
    acceleration,
  }: any = React.useContext(SettingsContext);
  const { frequency }: any = React.useContext(MusicContext);
  const { width, height } = useDimension();
  const isMediaGreaterThan771px = useMedia({ query: `(min-width: 771px)` });
  const reduceMotion = useMedia({ query: `(prefers-reduced-motion: reduce)` });
  /* the box crash already flew the camera here; any other way in gets its own shot */
  const entry = React.useRef({
    kind:
      history.location.state && history.location.state.crashed
        ? 'none'
        : entryKind('experience'),
    p: 0,
    t: 0,
  }).current;
  /* the orbit controls take the camera only once the entry shot lands */
  const [settled, setSettled] = React.useState(false);
  const onSettle = React.useCallback(() => setSettled(true), []);

  useLockScroll(isMediaGreaterThan771px);
  const COLORS = useSceneColors(colors, theme);

  const deviceSizeDependentMemo = React.useMemo(() => {
    return (
      <>
        {isMediaGreaterThan771px && settled && (
          <OrbitControl minDistance={0} maxDistance={200} />
        )}
      </>
    );
  }, [isMediaGreaterThan771px, settled]);

  const themeDeviceSizeDependentMemo = React.useMemo(() => {
    return isMediaGreaterThan771px ? (
      <Skills colors={COLORS} />
    ) : (
      <React.Fragment></React.Fragment>
    );
  }, [theme, isMediaGreaterThan771px]);

  const themeDependentMemo = React.useMemo(() => {
    return (
      <>
        <ambientLight
          color={COLORS.primaryColor}
          intensity={1}
          position={[0, 0, 0]}
        />
        <pointLight
          color={COLORS.primaryColor}
          intensity={10}
          position={[0, 0, 0]}
          distance={5000}
          decay={500}
        />
        <ambientLight
          color={COLORS.primaryColor}
          intensity={0.1}
          position={[0, 0, 0]}
        />
      </>
    );
  }, [theme]);

  const rotationFrequencyThemeHistoryDependentMemo = React.useMemo(() => {
    return (
      <Box
        frequency={frequency}
        rotationX={rotationX}
        rotationY={rotationY}
        rotationZ={rotationZ}
        redirectURL={{ pathname: Routes.ROOT, state: { reassemble: true } }}
        wireframe={true}
        colors={COLORS}
        position={[0, 0, -25]}
        history={history}
        still={reduceMotion}
      />
    );
  }, [theme, frequency, history, rotationX, rotationY, rotationZ, reduceMotion]);

  const accelerationThemeHistoryDependentMemo = React.useMemo(() => {
    return (
      <Stars
        acceleration={acceleration}
        colors={COLORS}
        count={isMediaGreaterThan771px ? 6000 : 2500}
        still={reduceMotion}
      />
    );
  }, [theme, acceleration, isMediaGreaterThan771px, reduceMotion]);

  return (
    <div style={{ width, height }}>
      <Canvas
        style={{ width, height }}
        camera={{
          fov: 75,
          near: 1,
          far: 1000,
        }}
        pixelRatio={Math.min(window.devicePixelRatio || 1, 2)}>
        <Rig
          world="experience"
          entry={entry}
          phone={!isMediaGreaterThan771px}
          still={reduceMotion}
          onSettle={onSettle}
        />
        {deviceSizeDependentMemo}
        {themeDependentMemo}
        {themeDeviceSizeDependentMemo}
        {rotationFrequencyThemeHistoryDependentMemo}
        {accelerationThemeHistoryDependentMemo}
      </Canvas>
      <EntryCaption kind={entry.kind} top={true} />
    </div>
  );
};
