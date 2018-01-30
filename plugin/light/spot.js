let { isFloat } = require('../util');

module.exports = {
  mixins: [require('./directional')],

  props: {
    angle: {
      validator: isFloat,
      default: Math.PI / 2,
    },

    exponent: {
      validator: isFloat,
      default: 1.5,
    }
  },

  watch: {
    angle() {
      this.$entity.angle = this.angle;
    },

    exponent() {
      this.$entity.exponent = this.exponent;
    },
  },

  onScene({ name, position, scene, classes: { SpotLight } }) {
    return new SpotLight(name, position, this.directionVector3, this.angle, this.exponent, scene);
  },
};
