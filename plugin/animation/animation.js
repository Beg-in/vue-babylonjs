let { capitalize } = require('../util');
const TYPES = [
  'float',
  'vector2',
  'vector3',
  'size',
  'quaternion',
  'matrix',
  'color3',
];
const MODES = [
  'cycle',
  'relative',
  'constant',
];
const EASINGS = [
  'circle',
  'back',
  'bounce',
  'cubic',
  'elastic',
  'exponential',
  'power',
  'quadratic',
  'quartic',
  'quintic',
  'sine',
  'bezierCurve',
];
const EASING_MODES = [
  'in',
  'out',
  'inout',
];

module.exports = {
  mixins: [require('../entity/abstract')],

  provide() {
    return {
      AnimationKeys: this.keys,
    };
  },

  props: {
    type: {
      validator: value => TYPES.includes(value),
      default: TYPES[0],
    },

    mode: {
      validator: value => MODES.includes(value),
      default: MODES[0],
    },

    property: {
      type: String,
    },

    fps: {
      type: Number,
      default: 60,
    },

    from: {
      type: Number,
      default: 0,
    },

    to: {
      type: Number,
      default: 60,
    },

    duration: {
      type: Number,
      default: null,
    },

    start: {
      default: 0,
    },

    end: {
      default: 1,
    },

    loop: {
      type: Boolean,
      default: true,
    },

    speedRatio: {
      type: Number,
      default: 1,
    },

    animatable: {
      type: Object,
      default: null,
    },

    blending: {
      type: Boolean,
      default: false,
    },

    easing: {
      validator: value => EASINGS.includes(value),
      default: null,
    },

    easingMode: {
      validator: value => EASING_MODES.includes(value),
      default: EASING_MODES[0],
    },

    amplitude: {
      type: Number,
      default: 1,
    },

    bounces: {
      type: Number,
      default: 3,
    },

    bounciness: {
      type: Number,
      default: 2,
    },

    oscillations: {
      type: Number,
      default: 3,
    },

    springiness: {
      type: Number,
      default: 3,
    },

    exponent: {
      type: Number,
      default: 2,
    },

    power: {
      type: Number,
      default: 2,
    },

    x1: {
      type: Number,
      default: 0.32,
    },

    y1: {
      type: Number,
      default: -0.73,
    },

    x2: {
      type: Number,
      default: 0.69,
    },

    y2: {
      type: Number,
      default: 1.59,
    },
  },

  methods: {
    reset() {
      this.$entity.stop();
    },

    enableBlending(speed) {
      this.$entity.enableBlending(speed);
    },

    disableBlending() {
      this.$entity.disableBlending();
    },

    goToFrame(frame) {
      this.$entity.goToFrame(frame);
    },

    pause() {
      this.$entity.pause();
    },

    restart() {
      this.$entity.restart();
    },

    stop() {
      this.$entity.stop();
    },

    isStopped() {
      return this.$entity.isStopped();
    },
  },

  beforeCreate() {
    this.$_TYPES = TYPES;
    this.$_MODES = MODES;
    this.$_EASINGS = EASINGS;
    this.$_EASING_MODES = EASING_MODES;
    this.keys = [];
  },

  onScene({ name, classes }) {
    let { Animation } = classes;
    let type = Animation[`ANIMATIONTYPE_${this.type.toUpperCase()}`];
    let mode = Animation[`ANIMATIONLOOPMODE_${this.mode.toUpperCase()}`];
    let animation = new Animation(name, this.property, this.fps, type, mode);
    if (this.easing) {
      let easing = classes[`${capitalize(this.easing)}Ease`];
      let easingFunction;
      switch (this.easing) {
        case 'back':
          easingFunction = easing(this.amplitude);
          break;
        case 'bounce':
          easingFunction = easing(this.bounces, this.bounciness);
          break;
        case 'elastic':
          easingFunction = easing(this.oscillations, this.springiness);
          break;
        case 'exponential':
          easingFunction = easing(this.exponent);
          break;
        case 'power':
          easingFunction = easing(this.power);
          break;
        case 'bezierCurve':
          easingFunction = easing(this.x1, this.y1, this.x2, this.y2);
          break;
        default:
          easingFunction = easing();
      }
      easingFunction.setEasingMode(
        classes.EasingFunction[`EASINGMODE_EASE${this.easingMode.toUpperCase()}`]
      );
      animation.setEasingFunction(easingFunction);
    }
    return animation;
  },

  onParent({ parent, entity, scene, name }) {
    let to = this.duration ? this.duration * this.fps : this.to;
    let keys = [];
    if (this.keys.length < 1) {
      keys.push({
        frame: this.from,
        value: this.start,
      });
      keys.push({
        frame: to,
        value: this.end,
      });
    } else {
      this.keys.forEach(key => {
        let frame = Number.parseFloat(key.frame);
        if (!isFloat(key.value)) {
          frame = Math.floor((frame / 100) * to);
        }
        let out = {
          frame,
          value: key.value,
        };
        if (key.outTangent) {
          out.outTangent = key.outTangent;
        }
        if (key.inTangent) {
          out.inTangent = key.inTangent;
        }
        keys.push(out);
      });
    }
    entity.setKeys(keys);
    parent.animations.push(entity);
    scene.beginAnimation(parent, this.from, to, this.loop, this.speedRatio, null, this.animatable);
  },
};
