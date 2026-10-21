import * as React from 'react';
import * as THREE from 'three';

/* the theme palette as three.js colours, rebuilt only when the theme changes */
export const useSceneColors = (colors: any, theme: string) =>
  React.useMemo(
    () => ({
      primaryColor: new THREE.Color(colors[theme].primaryColor),
      backgroundColor: new THREE.Color(colors[theme].backgroundColor),
      secondaryColor: new THREE.Color(colors[theme].secondaryColor),
      infoColor: new THREE.Color(colors[theme].infoColor),
      dangerColor: new THREE.Color(colors[theme].dangerColor),
      warningColor: new THREE.Color(colors[theme].warningColor),
      successColor: new THREE.Color(colors[theme].successColor),
      fogColor: new THREE.Color(colors[theme].fogColor),
    }),
    [theme],
  );
