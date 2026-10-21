/* the path we left last: /rain and /bird pick their entrance flight by it */
let from = '';
let at = window.location.pathname;

export const RouteFrom = {
  get: () => from,
  set: (pathname: string) => {
    if (pathname === at) return;
    from = at;
    at = pathname;
  },
};
