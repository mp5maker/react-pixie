export const Lerp = ({ start, end, alpha }: any) =>
  (1 - alpha) * start + alpha * end;
