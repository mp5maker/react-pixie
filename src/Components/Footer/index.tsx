import * as React from 'react';
import moment from 'moment';

export const Footer = () => {
  return (
    <footer>
      {moment().format('YYYY')} &copy; All Rights Reserved, Photon Enterprise
    </footer>
  );
};
