import { SpotLight } from '../babylon';
import DirectionalLight from './directional';
import { isFloat } from '../util';

export default {
  mixins: [DirectionalLight],

  props: {
    angle: {
      validator: isFloat,
      default: Math.PI / 2,
    },

    exponent: {
      validator: isFloat,
      default: 1.5,
    },
  },

  watch: {
    angle() {
      this.$entity.angle = this.angle;
    },

    exponent() {
      this.$entity.exponent = this.exponent;
    },
  },

  onScene({ name, position, scene }) {
    return new SpotLight(name, position, this.directionVector3, this.angle, this.exponent, scene);
  },
};
