export const RandomRange = ({ min, max }: any) =>
  Math.floor(Math.random() * (max - min + 1) + min);
