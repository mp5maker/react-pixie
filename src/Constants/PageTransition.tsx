export const PageTransition = {
  initial: {
    opacity: 0,
    left: -100,
  },
  animate: {
    opacity: 1,
    left: 0,
    transition: {
      ease: `easeInOut`,
    },
  },
  exit: {
    opacity: 0,
    left: 100,
  },
};
