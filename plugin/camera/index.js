let classes = require('babylonjs');
let { vec3, capitalize } = require('../util');

const TYPES = [
  'universal',
  'free',
  'follow',
  'arcRotate',
  'arcFollow',
  'deviceOrientation',
  'touch',
  'gamepad',
];
const CAMERA_MODES = [
  'perspective',
  'orthographic',
];

{ Vector3 } = classes;

module.exports = {
  mixins: [require('../entity/abstract')],

  props: {
    position: {
      validator: vec3.validator,
      default() {
        return new Vector3(0, 0, -10);
      },
    },

    type: {
      validator(value) {
        return types.includes(value);
      },
      default: TYPES[0],
    },

    target: vec3,

    alpha: {
      type: Number,
      default: 0,
    },

    beta: {
      type: Number,
      default: 0,
    },

    radius: {
      type: Number,
      default: 10,
    },

    mode: {
      type: String,
      default: CAMERA_MODES[0],
    },
  },

  computed: {
    Type() {
      return classes[capitalize(this.type)];
    },

    positionVector3() {
      return toVec3(this.position);
    },

    targetVector3() {
      return toVec3(this.target);
    },

    args() {
      let out = [this.name];
      switch (this.type) {
        case 'arcRotate':
        case 'arcFollow':
          out = out.concat([this.alpha, this.beta, this.radius, this.targetVector3]);
          break;
        case 'universal':
        case 'touch':
        case 'deviceOrientation':
        case 'free':
        case 'follow':
        default:
          out = out.concat([this.positionVector3]);
      }
      return out.concat([this.$scene]);
      // attachControl
    },
  },

  // ==== Camera ====
  // ... lots of shit
  // attachControl()
  // detachControl()
  methods: {
    attachControl() {
    },
  },

  onScene({ scene }) {
    return new this.Type();
  },
};
