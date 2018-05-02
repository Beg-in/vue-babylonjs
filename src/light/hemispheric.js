import { HemisphericLight } from '../babylon';
import * as DirectionalLight from './directional';

export const mixins = [DirectionalLight];

export const onScene = function ({ name, scene }) {
  return new HemisphericLight(name, this.directionVector3, scene);
};
