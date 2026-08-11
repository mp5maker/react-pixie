export const EVENT_NAME = {
  HOWLER_MUTE: 'howler-mute',
} as const;

export const eventHelper = {
  dispatch(eventName: typeof EVENT_NAME[keyof typeof EVENT_NAME], detail: any) {
    const event = new CustomEvent(eventName, { detail });
    window.dispatchEvent(event);
  },
};
