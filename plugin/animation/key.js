let { isFloat, isPercent, vec3: { validator } } = require('../util');

module.exports = {
  inject: ['AnimationKeys'],

  props: {
    frame: {
      validator: value => {
        return isFloat(value) || isPercent(value);
      },
      default: 0,
    },

    value: {
      default: 0,
    },

    inTangent: {
      validator,
      default: null,
    },

    outTangent: {
      validator,
      default: null,
    },
  },

  created() {
    this.AnimationKeys.push({
      frame: this.frame,
      value: this.value,
      inTangent: this.inTangent,
      outTangent: this.outTangent,
    });
  },
};
