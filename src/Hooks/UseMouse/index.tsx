import * as React from 'react';

/* Type */
export const MOUSE_LEFT_CLICK = 'left-click';
export const MOUSE_MIDDLE_CLICK = 'middle-click';
export const MOUSE_RIGHT_CLICK = 'right-click';
export const MOUSE_SCROLL = 'scroll';

/* Scroll Direction */
export const MOUSE_SCROLL_UP = 'scroll-up';
export const MOUSE_SCROLL_DOWN = 'scroll-down';

/* Scroll */
const POSITIVE = 1;
const NEGATIVE = -1;
const ZERO = 0;

/* Button */
export const MOUSE_LEFT_BUTTON = 0;
export const MOUSE_MIDDLE_BUTTON = 1;
export const MOUSE_RIGHT_BUTTON = 2;

export const useMouse = ({ query }: any = {}) => {
  const [event, setEvent] = React.useState(null);
  const [type, setType] = React.useState('');
  const [deltaY, setDeltaY] = React.useState(0);
  const [direction, setDirection] = React.useState('');

  const onMouseDown = (event: any) => {
    setEvent(event);
    if (event.button == MOUSE_LEFT_BUTTON) setType(MOUSE_LEFT_CLICK);
    if (event.button == MOUSE_MIDDLE_BUTTON) setType(MOUSE_MIDDLE_CLICK);
    if (event.button == MOUSE_RIGHT_BUTTON) setType(MOUSE_RIGHT_CLICK);
  };

  const onWindowWheel = (event: any) => {
    setEvent(event);
    setDeltaY(event.deltaY);
    setType(MOUSE_SCROLL);
    if (Math.sign(event.deltaY) == POSITIVE) setDirection(MOUSE_SCROLL_DOWN);
    if (Math.sign(event.deltaY) == NEGATIVE) setDirection(MOUSE_SCROLL_UP);
  };

  const onMouseUp = (event: any) => {
    setEvent(event);
    setType('');
  };

  React.useEffect(() => {
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    return () => {
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, []);

  React.useEffect(() => {
    if (query) {
      let selector: any = document.querySelector(query);
      selector.addEventListener('wheel', onWindowWheel);
      return () => {
        query && selector.removeEventListener('wheel', onWindowWheel);
      };
    }
  }, []);

  return {
    type,
    event,
    scroll: {
      deltaY,
      direction,
    },
    typeConstants: {
      MOUSE_LEFT_CLICK,
      MOUSE_MIDDLE_CLICK,
      MOUSE_RIGHT_CLICK,
      MOUSE_SCROLL_UP,
      MOUSE_SCROLL_DOWN,
    },
  };
};
