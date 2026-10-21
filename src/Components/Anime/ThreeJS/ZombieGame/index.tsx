import * as React from 'react';
import * as THREE from 'three';
import { useTranslation } from 'react-i18next';
import { Canvas } from 'react-three-fiber';

import { Zombie } from 'Components/Anime/ThreeJS/Zombie';
import { useDimension } from 'Hooks/UseDimension';
import { LocaleNumber } from 'Utilities/LocaleNumber';
import { StorageGet, StorageSet } from 'Utilities/Storage';
import './styles.scss';

const BEST = 'zombie-best';
/* space and w only: arrows, enter and letters already drive the global hotkeys */
const KEYS = ['Space', 'KeyW'];

export const ZombieGame = ({ colors, theme }: any) => {
  const { width } = useDimension();
  const { t, i18n } = useTranslation();
  const arena: any = React.useRef();
  const api: any = React.useRef({}).current;
  const best = React.useRef(0);
  const [hud, setHud] = React.useState({ phase: 'ready', score: 0, combo: 1 });
  const [record, setRecord] = React.useState(0);
  const [hits, setHits] = React.useState(0);

  React.useEffect(() => {
    StorageGet({ key: BEST }).then((value: any) => {
      best.current = Number(value) || 0;
      setRecord(best.current);
    });
  }, []);

  const onHud = React.useCallback(next => setHud(next), []);

  const onDead = React.useCallback((score: number) => {
    setHits(count => count + 1);
    if (score <= best.current) return;
    best.current = score;
    setRecord(score);
    StorageSet({ key: BEST, value: score });
  }, []);

  React.useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (!KEYS.includes(event.code) || event.repeat) return;
      const target: any = event.target;
      if (target && /INPUT|TEXTAREA|SELECT/.test(target.tagName)) return;
      /* only while the arena is mostly on screen, so space still scrolls the rest of the page */
      const box = arena.current.getBoundingClientRect();
      const middle = box.top + box.height / 2;
      if (middle < 0 || middle > window.innerHeight) return;
      event.preventDefault();
      if (api.press) api.press();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  /* taps jump on press for timing; start and retry wait for a click so a scroll never starts a run */
  const onPointerDown = React.useCallback(() => {
    if (api.phase === 'run' && api.press) api.press();
  }, []);
  const onClick = React.useCallback(() => {
    if (api.phase !== 'run' && api.press) api.press();
  }, []);

  /* Colors */
  const COLORS = {
    primaryColor: new THREE.Color(colors[theme].primaryColor),
    backgroundColor: new THREE.Color(colors[theme].backgroundColor),
    secondaryColor: new THREE.Color(colors[theme].secondaryColor),
    infoColor: new THREE.Color(colors[theme].infoColor),
    dangerColor: new THREE.Color(colors[theme].dangerColor),
  };

  const zombieMemo = React.useMemo(() => {
    return <Zombie colors={COLORS} api={api} onHud={onHud} onDead={onDead} />;
  }, [theme]);

  const number = (value: number) => LocaleNumber({ t, value });

  const summaryMemo = React.useMemo(() => {
    return (
      <dl className={`zombie-game-summary hud-panel`}>
        <div>
          <dt className={`hud-label`}>{t(`YOUR_SCORE`)}</dt>
          <dd className={`hud-display`}>{number(hud.score)}</dd>
        </div>
        <div>
          <dt className={`hud-label`}>{t(`BEST`)}</dt>
          <dd className={`hud-display`}>{number(record)}</dd>
        </div>
        <div className={hud.combo > 1 ? `is-hot` : ``}>
          <dt className={`hud-label`}>{t(`COMBO`)}</dt>
          <dd className={`hud-display`}>×{number(hud.combo)}</dd>
        </div>
      </dl>
    );
  }, [i18n.language, hud.score, hud.combo, record]);

  const promptMemo = React.useMemo(() => {
    if (hud.phase === 'run') return null;
    const dead = hud.phase === 'dead';
    return (
      <div className={`zombie-game-prompt hud-panel`}>
        <p className={`hud-rail`}>{t(dead ? `GAME_OVER` : `GAME_TITLE`)}</p>
        {dead && (
          <p className={`zombie-game-result`}>
            {number(hud.score)}
            {hud.score >= record && hud.score > 0 && (
              <span className={`hud-label`}>{t(`NEW_BEST`)}</span>
            )}
          </p>
        )}
        <button type="button" className={`zombie-game-start`}>
          {t(dead ? `GAME_RETRY` : `GAME_RUN`)}
        </button>
        <p className={`zombie-game-hint`}>
          <kbd>space</kbd> <kbd>w</kbd> {t(`TAP`)} — {t(`GAME_HINT`)}
        </p>
      </div>
    );
  }, [i18n.language, hud.phase, hud.score, record]);

  return (
    <div
      ref={arena}
      className={`zombie-game is-${hud.phase}`}
      style={{ width, height: 500 }}
      onPointerDown={onPointerDown}
      onClick={onClick}>
      <Canvas
        style={{
          width,
          height: 500,
        }}
        camera={{
          fov: 75,
          near: 1,
          far: 500,
        }}
        pixelRatio={Math.min(window.devicePixelRatio || 1, 2)}>
        {zombieMemo}
      </Canvas>
      {summaryMemo}
      {promptMemo}
      {hits > 0 && (
        <div key={hits} className={`zombie-game-glitch`} aria-hidden="true" />
      )}
    </div>
  );
};
