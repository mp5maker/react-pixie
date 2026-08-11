import { useState, useEffect } from 'react';
import { eventHelper } from 'Services/CustomEvents';

export function useCustomEvent(eventName, initialValue = null) {
  const [data, setData] = useState(initialValue);

  useEffect(() => {
    const handleEvent = event => {
      setData(event.detail);
    };

    window.addEventListener(eventName, handleEvent);

    return () => {
      window.removeEventListener(eventName, handleEvent);
    };
  }, [eventName]);

  const triggerEvent = payload => {
    eventHelper.dispatch(eventName, payload);
  };

  return [data, triggerEvent];
}
