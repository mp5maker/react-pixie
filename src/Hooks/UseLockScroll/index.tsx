import * as React from 'react';

/* the 3D pages pin the body on desktop, so wheel and drag reach the canvas */
export const useLockScroll = (desktop: boolean) => {
  React.useEffect(() => {
    const body: any = document.querySelector('body');
    if (desktop) {
      body.style.setProperty('overflow', 'hidden', 'important');
      body.style.setProperty('position', 'fixed', 'important');
    } else {
      body.style.setProperty('position', 'fixed', '');
    }
    return () => {
      body.style.setProperty('overflow', 'hidden', '');
      body.style.setProperty('position', 'fixed', '');
    };
  }, [desktop]);
};
