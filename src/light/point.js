import { PointLight } from '../babylon';
import * as AbstractLight from './';

export const mixins = [AbstractLight];

export const onScene = function ({ name, position, scene }) {
  return new PointLight(name, position, scene);
};
