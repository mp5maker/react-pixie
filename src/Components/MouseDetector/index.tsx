import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { useMouse } from 'Hooks/UseMouse';
import './styles.scss';

const svgVariants = {
  initial: {},
  animate: {},
  exit: {},
};

const pathVariants = {
  initial: {},
  animate: {},
  exit: {},
};

export const MouseDetector = ({
  colors,
  theme,
  strokeWidth = 10,
  width = '366',
  height = '522',
}: any) => {
  const { type, typeConstants } = useMouse();
  const {
    MOUSE_LEFT_CLICK,
    MOUSE_RIGHT_CLICK,
    MOUSE_MIDDLE_CLICK,
    MOUSE_SCROLL_UP,
    MOUSE_SCROLL_DOWN,
  } = typeConstants;

  const isLeftClick = MOUSE_LEFT_CLICK == type;
  const isRightClick = MOUSE_RIGHT_CLICK == type;
  const isMiddleClick = MOUSE_MIDDLE_CLICK == type;

  return (
    <React.Fragment>
      <div className="mouse-detector-container">
        <AnimatePresence initial={true} exitBeforeEnter>
          <motion.svg
            key={type}
            variants={svgVariants}
            initial={`initial`}
            animate={`animate`}
            exit={`exit`}
            width={width}
            height={height}
            viewBox="0 0 366 522"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <motion.path
              key={`mouse-wire`}
              variants={pathVariants}
              strokeWidth={strokeWidth}
              d="M199 56L217.5 69.5L228 67L236 68H243L248.5 69.5L254.5 72V65.5L250.5 58.5L245.5 50L238 41.5L233 36.5L228 32L215.5 26L201.5 22H173.5H165.5L156 23.5L146 26L132 29.5L119.5 32L109.5 34.5L100 36.5L85.5 38.5L71 39.5L56.5 36.5L50.5 33L43 26L38 20.5L34.5 14L31.5 8L26 3L17.5 1.5L10 3L3 8L1 12.5V22L5 32L13.5 45.5L20 52L31.5 62.5L50.5 72H68H91.5L108 69.5L140 62.5L168.5 56H199Z"
              stroke={colors[theme].primaryColor}
            />
            <motion.path
              key={`mouse-left-button`}
              variants={pathVariants}
              strokeWidth={strokeWidth}
              d="M178.5 99C181.5 97.3333 190.2 93 201 89L201.5 248H107L106.5 198L108.5 188.5L112 179.5L115 172.5L118.5 164L122.5 154L127 145.5L132.5 138.5L141 128.5L147 121L155.5 114L162 108L169 104L178.5 99Z"
              stroke={colors[theme].primaryColor}
              fill={isLeftClick ? colors[theme].primaryColor : ''}
            />
            <motion.path
              key={`mouse-middle-button`}
              variants={pathVariants}
              strokeWidth={strokeWidth}
              d="M224 91.5L231 85.5C233.8 83.9 239.5 84.8333 242 85.5L246 88.5L249 91L251 93.5L251.5 97.5L251 237.5L249.5 241L247.5 244.5L245 248L241.5 249H236.5H233.5L231 248.5L227 246.5L224 243.5L222 239L220.5 102V99L221 96L224 91.5Z"
              stroke={colors[theme].primaryColor}
              fill={isMiddleClick ? colors[theme].primaryColor : ''}
            />
            <motion.path
              key={`mouse-right-button`}
              variants={pathVariants}
              strokeWidth={strokeWidth}
              d="M270 247.5V91.5L281.5 95.5L292.5 101L298.5 104L308.5 110L320.5 119.5L326.5 125.5L332.5 131L338.5 138L345.5 149.5L351 159L357.5 172.5L361.5 187L363.5 198.5L364.5 247.5H270Z"
              stroke={colors[theme].primaryColor}
              fill={isRightClick ? colors[theme].primaryColor : ''}
            />
            <motion.path
              key={`mouse-body`}
              variants={pathVariants}
              strokeWidth={strokeWidth}
              d="M106 408.5V267.5H364V408.5L357.5 436L351.5 450L339 470.5L327 483.5L311.5 497.5L300 504.5L288.5 511L272.5 517.5L262 521.5H210.5L197.5 517.5L187 513.5L174 507.5L165 501.5L152 492L141.5 482L132 470L123.5 457L115 441L108.5 422L106 408.5Z"
              stroke={colors[theme].primaryColor}
            />
          </motion.svg>
        </AnimatePresence>
      </div>
    </React.Fragment>
  );
};
