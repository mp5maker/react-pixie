import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';

import './styles.scss';

interface ButtonSquarePropsInterface {
  style?: any;
  onClick?: ((params: any) => any) | ((params: any) => void);
  children: React.ReactNode;
}

export const ButtonSquare: React.FC<ButtonSquarePropsInterface> = ({
  style = {},
  onClick = () => {},
  children,
}: any = {}) => {
  return (
    <Button
      className={`button-square-container`}
      style={style}
      onClick={onClick}>
      {children}
    </Button>
  );
};

ButtonSquare.propTypes = {
  style: PropTypes.shape({}),
  onClick: PropTypes.func,
  children: PropTypes.node,
};
