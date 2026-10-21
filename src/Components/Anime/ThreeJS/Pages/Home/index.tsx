import * as React from 'react';
import { Canvas } from 'react-three-fiber';

import { Box } from 'Components/Anime/ThreeJS/Box';
import { EntryCaption, Rig, entryKind } from 'Components/Anime/ThreeJS/Entrance';
import { Fleet } from 'Components/Anime/ThreeJS/Fleet';
import { OrbitControl } from 'Components/Anime/ThreeJS/OrbitControl';
import { Stars } from 'Components/Anime/ThreeJS/Stars';
import * as Routes from 'Constants/Routes';
import { useDimension } from 'Hooks/UseDimension';
import { useLockScroll } from 'Hooks/UseLockScroll';
import { useMedia } from 'Hooks/UseMedia';
import { useSceneColors } from 'Hooks/UseSceneColors';
import { MusicContext } from 'MusicContext';
import { SettingsContext } from 'SettingsContext';

export const AnimeThreeJSHome = ({ colors, theme, history }: any) => {
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
  const [crashing, setCrashing] = React.useState(false);
  /* back from the /experience box: the skill shards fly home and rebuild the fleet */
  const reassemble = React.useRef(
    Boolean(history.location.state && history.location.state.reassemble),
  ).current;
  /* from anywhere else the camera flies in; the box routes arrive already in place */
  const entry = React.useRef({
    kind: reassemble ? 'none' : entryKind('home'),
    p: 0,
    t: 0,
  }).current;
  /* the orbit controls take the camera only once the entry shot lands */
  const [settled, setSettled] = React.useState(false);
  const onSettle = React.useCallback(() => setSettled(true), []);
  const onSelect = React.useCallback(() => setCrashing(true), []);
  const onCrashed = React.useCallback(
    () => history.push({ pathname: Routes.EXPERIENCE, state: { crashed: true } }),
    [history],
  );

  React.useEffect(() => {
    /* no fleet to crash: go straight there */
    if (crashing && reduceMotion) onCrashed();
  }, [crashing]);

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
        redirectURL={Routes.EXPERIENCE}
        onSelect={onSelect}
        wireframe={false}
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

  const themeCrashDeviceSizeDependentMemo = React.useMemo(() => {
    /* fewer ships on small screens */
    const fighters = isMediaGreaterThan771px ? 5 : 3;
    return reduceMotion ? (
      <React.Fragment></React.Fragment>
    ) : (
      <Fleet
        key={fighters}
        fighters={fighters}
        colors={COLORS}
        crashing={crashing}
        reassemble={reassemble}
        onCrashed={onCrashed}
      />
    );
  }, [theme, crashing, isMediaGreaterThan771px, reduceMotion]);

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
          world="home"
          entry={entry}
          phone={!isMediaGreaterThan771px}
          still={reduceMotion}
          onSettle={onSettle}
        />
        {deviceSizeDependentMemo}
        {themeDependentMemo}
        {rotationFrequencyThemeHistoryDependentMemo}
        {accelerationThemeHistoryDependentMemo}
        {themeCrashDeviceSizeDependentMemo}
      </Canvas>
      <EntryCaption kind={entry.kind} top={true} />
    </div>
  );
};
