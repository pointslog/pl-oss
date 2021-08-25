import * as Jimp from 'jimp';

export function mergeJimps(jimps: Jimp[]): Jimp {
  const base = jimps.shift();
  jimps.forEach((x) => { base.composite(x, 0, 0); });
  return base;
}
