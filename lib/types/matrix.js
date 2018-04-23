import { Matrix } from '../babylon';
import { isFloatArray } from '../util';

export const toMatrix = value => {
  if (value instanceof Matrix) {
    return value;
  }
  return Matrix.FromArray(value);
};

export const matrix = {
  validator: value => value !== null && (isFloatArray(value) || value instanceof Matrix),
  default: () => Matrix.Zero(),
};

export const $matrix = toMatrix;
