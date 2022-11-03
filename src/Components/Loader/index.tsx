import * as React from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';

import { SPK } from 'Svg/SPK';
import { Colors } from 'Constants/Colors';
import { DARK } from 'Constants/Settings';
import './styles.scss';

const loaderVariants = {
  initial: {
    x: 200,
    y: 200,
    scale: 5,
    opacity: 0,
  },
  animate: {
    x: 2,
    y: 2,
    scale: 1,
    opacity: 1,
    transition: {
      x: {
        ease: `easeInOut`,
        delay: 2,
        duration: 2,
      },
      y: {
        ease: `easeInOut`,
        delay: 2,
        duration: 2,
      },
      scale: {
        ease: `easeInOut`,
        delay: 2,
        duration: 2,
      },
      opacity: {
        ease: `easeInOut`,
        duration: 1,
      },
    },
  },
  exit: {},
};

interface LoaderPropsInterface {
  children?: React.ReactNode;
  className?: string;
  width?: number | string;
  height?: number | string;
  colors?: any;
  theme?: string;
  strokeWidth?: number;
}

export const Loader: React.FC<LoaderPropsInterface> = ({
  className,
  children,
  width = 1139,
  height = 534,
  colors = Colors,
  theme = DARK,
  strokeWidth = 10,
  svgKey = 'loader',
}: any) => {
  return (
    <React.Fragment>
      <AnimatePresence exitBeforeEnter initial={true}>
        <motion.div
          variants={loaderVariants}
          initial={`initial`}
          animate={`animate`}
          exit={`exit`}
          className={`loader-container ${className}`}>
          <SPK
            svgKey={svgKey}
            strokeWidth={strokeWidth}
            width={width}
            height={height}
            colors={colors}
            theme={theme}
          />
          {children}
        </motion.div>
      </AnimatePresence>
    </React.Fragment>
  );
};

Loader.defaultProps = {
  className: ``,
  colors: Colors,
  theme: DARK,
  strokeWidth: 10,
};

Loader.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  colors: PropTypes.shape({}),
  theme: PropTypes.string,
  strokeWidth: PropTypes.number,
};
