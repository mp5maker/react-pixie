import * as React from 'react';
import { useTranslation } from 'react-i18next';

import './styles.scss';

/* role flow: a packet runs client to verify, each node lights as it lands */
const FLOW = ['client', 'repro', 'poc', 'ship', 'verify'];
const FLOW_GAP = 97;

/* tools per domain, counted from the github profile skill map */
const STACK: [string, number][] = [
  ['ops', 19],
  ['backend', 20],
  ['frontend', 24],
  ['test', 10],
  ['sec', 3],
];
const STACK_MAX = Math.max(...STACK.map(([, count]) => count));

const order = (index: number) => ({ '--i': index } as React.CSSProperties);

export const Loadout = () => {
  const { t } = useTranslation();

  return (
    <section className={`loadout hud-panel`}>
      <h2 className={`hud-rail`}>{t(`HUD_LOADOUT`)}</h2>
      <svg
        className={`loadout-flow`}
        viewBox="0 0 400 44"
        role="img"
        aria-label={FLOW.join(', ')}>
        <line className={`loadout-flow-line`} x1="6" y1="10" x2="394" y2="10" />
        {FLOW.map((step, index) => {
          const x = 6 + index * FLOW_GAP;
          const anchor =
            index === 0 ? 'start' : index === FLOW.length - 1 ? 'end' : 'middle';
          return (
            <g key={step} style={order(index)}>
              <rect className={`loadout-flow-node`} x={x - 5} y="5" width="10" height="10" />
              <rect className={`loadout-flow-hit`} x={x - 5} y="5" width="10" height="10" />
              <text x={x} y="38" textAnchor={anchor}>
                {step}
              </text>
            </g>
          );
        })}
        <rect className={`loadout-flow-packet`} x="3" y="7" width="6" height="6" />
      </svg>
      <ul className={`loadout-stack`}>
        {STACK.map(([name, count], index) => (
          <li key={name} style={order(index)}>
            <span className={`loadout-stack-name`}>{name}</span>
            <span className={`loadout-stack-bar`}>
              <span style={{ transform: `scaleX(${count / STACK_MAX})` }} />
            </span>
            <span className={`loadout-stack-count`}>{count}</span>
          </li>
        ))}
      </ul>
    </section>
  );
};
