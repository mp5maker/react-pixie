import * as React from 'react';
import { Lerp } from 'Utilities/Lerp';

export const useSmoothScroll = ({ selector = 'main' }: any) => {
  React.useEffect(() => {
    let sx: number = 0;
    let sy: number = 0;
    let dx: number = 0;
    let dy: number = 0;
    let animationFrame: any;

    const body = document.body;
    const main = document.querySelector(selector);
    const currentMainStylePosition = main.style.position;
    const currentBodyStyleHeight = body.style.height;
    const currentBodyStylePosition = body.style.position;

    body.style.height = `${main.clientHeight}px`;
    main.style.setProperty('position', 'fixed', 'important');
    main.style.top = 0;
    main.style.left = 0;

    const onWindowScroll = () => {
      body.style.height = `${main.clientHeight}px`;
      sx = window.pageXOffset;
      sy = window.pageYOffset;
    };
    window.addEventListener('scroll', onWindowScroll);

    const animate = () => {
      dx = Lerp({ start: dx, end: sx, alpha: 0.07 });
      dy = Lerp({ start: dy, end: sy, alpha: 0.07 });

      dx = Math.floor(dx * 100) / 100;
      dy = Math.floor(dy * 100) / 100;

      main.style.transform = `translate(-${dx}px, -${dy}px)`;

      window.requestAnimationFrame(animate);
    };

    animationFrame = window.requestAnimationFrame(animate);

    return () => {
      animationFrame && window.cancelAnimationFrame(animationFrame);
      window.removeEventListener('scroll', onWindowScroll);
      main.style.position = currentMainStylePosition;
      body.style.height = currentBodyStyleHeight;
      body.style.position = currentBodyStylePosition;
    };
  }, []);

  return;
};
