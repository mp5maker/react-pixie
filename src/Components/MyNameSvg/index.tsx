import * as React from 'react';
import { useTranslation } from 'react-i18next';

import './styles.scss';

/* prompts are commands, so they stay in english; only the output is translated */
const TERMINAL = [
  ['$ do', 'HUD_DO'],
  ['$ ops', 'HUD_OPS'],
  ['$ now', 'HUD_NOW'],
];

const order = (index: number) => ({ '--i': index } as React.CSSProperties);

export const MyNameSvg = () => {
  const { t, i18n } = useTranslation();

  return (
    <section className={`hero hud-panel`}>
      <p className={`hero-status`}>{t(`HUD_STATUS`)}</p>
      <h1 className={`hero-title`}>
        <span className={`hero-name hud-display`}>{t(`HUD_NAME`)}</span>
        <span className={`hero-word hud-display`} data-text={`photon`}>
          photon
        </span>
      </h1>
      <svg
        className={`hero-rule`}
        viewBox="0 0 100 2"
        preserveAspectRatio="none"
        aria-hidden="true">
        <line className={`hero-rule-line`} x1="0" y1="1" x2="100" y2="1" />
        <line className={`hero-rule-dash`} x1="0" y1="1" x2="100" y2="1" />
      </svg>
      <p className={`hero-sub`}>{t(`HUD_SUBTITLE`)}</p>

      <div className={`hero-term`}>
        <img src="/ok.png" alt={t(`HUD_NAME`)} width={72} height={72} />
        {/* keyed by language: switching replays the readout */}
        <ol key={i18n.language}>
          {TERMINAL.map(([prompt, key], index) => (
            <React.Fragment key={key}>
              <li className={`is-prompt`} style={order(index * 2)}>
                {prompt}
              </li>
              <li style={order(index * 2 + 1)}>{t(key)}</li>
            </React.Fragment>
          ))}
          <li
            className={`hero-cursor`}
            style={order(TERMINAL.length * 2)}
            aria-hidden="true"
          />
        </ol>
      </div>

      <div className={`hero-radar`} aria-hidden="true">
        <svg viewBox="0 0 96 96">
          <circle cx="48" cy="48" r="47" />
          <circle cx="48" cy="48" r="31" />
          <circle cx="48" cy="48" r="15" />
          <line x1="0" y1="48" x2="96" y2="48" />
          <line x1="48" y1="0" x2="48" y2="96" />
        </svg>
        <span className={`hero-radar-sweep`} />
        <span className={`hero-radar-blip`} />
        <span className={`hero-radar-blip`} />
        <span className={`hero-radar-blip`} />
      </div>
      <span className={`hero-scan`} aria-hidden="true" />
    </section>
  );
};
