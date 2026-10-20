import * as React from 'react';

import { Colors } from 'Constants/Colors';

export const useColors = ({ theme }: any) => {
  const root = React.useRef(document.documentElement).current;

  React.useEffect(() => {
    // @ts-ignore
    Object.entries(Colors[theme]).forEach(([key, value]: any) => {
      /* primaryColor -> --primary-color */
      const name = key.replace(/[A-Z]/g, (char: string) => `-${char.toLowerCase()}`);
      root.style.setProperty(`--${name}`, value);
    });
    root.dataset.theme = theme;
  }, [theme]);

  return;
};
