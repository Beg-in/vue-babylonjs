import { DirectionalLight } from '../babylon';
import * as AbstractLight from './';
import { vec3, toVec3 } from '../types/vector';

export const mixins = [AbstractLight];

export const props = {
  direction: vec3,
};

export const computed = {
  directionVector3() {
    return toVec3(this.direction);
  },
};

export const watch = {
  directionVector3() {
    this.setDirection();
  },
};

export const methods = {
  setDirection() {
    this.$entity.direction.copyFrom(this.directionVector3);
  },
};

export const onScene = function ({ name, scene }) {
  return new DirectionalLight(name, this.directionVector3, scene);
};
