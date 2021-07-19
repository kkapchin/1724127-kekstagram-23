export function makeCounter (startNum, step) {
  let counter = startNum - step;
  return () => counter += step;
}
