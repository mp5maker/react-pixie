import * as React from 'react';
import moment from 'moment';

export const Footer = ({ colors, theme }: any) => {
  return (
    <footer
      style={{
        backgroundColor: colors[theme].backgroundColor,
        color: colors[theme].primaryColor,
      }}>
      {moment().format('YYYY')} &copy; All Rights Reserved, Photon Enterprise
    </footer>
  );
};
