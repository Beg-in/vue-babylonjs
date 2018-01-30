let { SpotLight } = require('babylonjs');
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

  methods: {
    init() {
      this.setNode(new SpotLight(
        this.id,
        this.positionVector3,
        this.directionVector3,
        this.angle,
        this.exponent,
        this.scene
      ));
    },
  },
};
