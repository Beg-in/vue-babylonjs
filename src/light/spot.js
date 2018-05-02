import { SpotLight } from '../babylon';
import * as DirectionalLight from './directional';
import { isFloat } from '../util';

export const mixins = [DirectionalLight];

export const props = {
  angle: {
    validator: isFloat,
    default: Math.PI / 2,
  },

  exponent: {
    validator: isFloat,
    default: 1.5,
  },
};

export const watch = {
  angle() {
    this.$entity.angle = this.angle;
  },

  exponent() {
    this.$entity.exponent = this.exponent;
  },
};

export const onScene = function ({ name, position, scene }) {
  return new SpotLight(name, position, this.directionVector3, this.angle, this.exponent, scene);
};
