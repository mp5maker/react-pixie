import * as React from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const svgVariants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 1,
    },
  },
  exit: {
    opacity: 0,
  },
};

const pathVariants = {
  initial: {
    pathLength: 0,
  },
  animate: {
    pathLength: 1,
    transition: {
      pathLength: {
        duration: 2,
        ease: `easeInOut`,
      },
    },
  },
  exit: {
    opacity: 0,
  },
};

export const Bird = ({
  colors,
  theme,
  width = 488,
  height = 526,
  strokeWidth = 10,
  svgKey = '',
}: any) => {
  return (
    <AnimatePresence initial={true} exitBeforeEnter>
      <motion.svg
        key={`bird-svg-${svgKey}`}
        variants={svgVariants}
        initial={`initial`}
        animate={`animate`}
        exit={`exit`}
        width={width}
        height={height}
        viewBox="0 0 488 526"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <motion.path
          variants={pathVariants}
          strokeWidth={strokeWidth}
          d="M119.5 36L135 5.5H136.5L139 9.5L151.5 38L157.5 51.5L173.5 74.5L186.5 88L219.5 109.5L264 130.5L297.5 152.5L329.5 179.5L351.5 199.5L382 228.5L383 224.5L390 205L401 183.5L410.5 171.5L422 161L430.5 157H434.5L442 158.5L454 164.5L470.5 177L487 191L477.5 198.5L467.5 207.5L460 219L458 226.5L459.5 241.5L467.5 288L468.5 315.5L464.5 331.5L451 354L437.5 372L423 385.5L403.5 394.5L377.5 402L346 407.5L281.5 414L253 419.5L232 426.5L195 445L167.5 469.5L135.5 510.5L129.5 520.5L126.5 525.5H124L120.5 524.5L103.5 516.5L92.5 509.5L81.5 499.5L77.5 492.5V488L80.5 480.5L82.5 477.5L83.5 475.5V473.5L82.5 472.5L63.5 462.5L42 447.5L27 433L22.5 425L21.5 419.5L23 414.5L29 409L40.5 403.5L40 400.5L26 381L13.5 362L7 349.5L1 329L1.5 326L3.5 323.5L9 325.5L34.5 337.5L46 342.5L67 348L88.5 350.5L204 349L232.5 342L256.5 329.5L256 326.5L241 321L212 307L177 284.5L149.5 260.5C146.833 256.833 141 249 139 247C137 245 129.167 228.833 125.5 221L123 209L120.5 185L115 166.5L107 142L103.5 112.5V89.5L110 62L119.5 36Z"
          stroke={colors[theme].primaryColor}
        />
        <motion.path
          variants={pathVariants}
          strokeWidth={strokeWidth}
          d="M274 122.5L241.5 106.5L242 95L245.5 81.5L257.5 56.5L275.5 35.5L297.5 21L314.5 13.5L339.5 5.5L365.5 1.5L355 14L345.5 27.5L336.5 46.5L331.5 65L330.5 85L333.5 113L342.5 141.5L355.5 170.5L368.5 193.5L372 201.5L370.5 199.5L358.5 188.5L340.5 172L310 147L274 122.5Z"
          stroke={colors[theme].primaryColor}
        />
        <motion.path
          variants={pathVariants}
          strokeWidth={strokeWidth}
          d="M454.5 181.5L457.5 179.5H458.5L461.5 181.5L462.5 183.5V184.5L462 187.5L460 188.5L457.5 189.5L454.5 188L453.5 185.5V183L454.5 181.5Z"
          stroke={colors[theme].primaryColor}
        />
      </motion.svg>
    </AnimatePresence>
  );
};
