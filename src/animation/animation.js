let classes = require('babylonjs');
let { capitalize, isFloat } = require('../util');

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

let { EasingFunction, Animation } = classes;

module.exports = {
  mixins: [require('../entity/abstract')],

  data() {
    return {
      keys: {},
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

    blendingSpeed: {
      type: Number,
      default: null,
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

  computed: {
    easingFunction() {
      if (!this.easing) {
        return null;
      }
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
      easingFunction.setEasingMode(EasingFunction[`EASINGMODE_EASE${
        this.easingMode.toUpperCase()
      }`]);
      return easingFunction;
    },

    finish() {
      return this.duration ? this.duration * this.fps : this.to;
    },

    frames() {
      let keys = Object.values(this.keys);
      if (keys.length < 1) {
        return [{
          frame: this.from,
          value: this.start,
        }, {
          frame: this.finish,
          value: this.end,
        }];
      }
      return keys.map(key => {
        let frame = Number.parseFloat(key.frame);
        if (!isFloat(key.frame)) {
          frame = Math.floor((frame / 100) * this.finish);
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
        return out;
      });
    },

    animationType() {
      return Animation[`ANIMATIONTYPE_${this.type.toUpperCase()}`];
    },

    animationLoopMode() {
      return Animation[`ANIMATIONLOOPMODE_${this.mode.toUpperCase()}`];
    },
  },

  methods: {
    enableBlending(speed) {
      this.$entity.enableBlending(speed);
    },

    disableBlending() {
      this.$entity.disableBlending();
    },

    setEasingFunction() {
      this.$entity.setEasingFunction(this.easingFunction);
    },

    setFrames() {
      if (this.$entity) {
        this.$entity.setKeys(this.frames);
      }
    },
  },

  watch: {
    fps() {
      this.$entity.framePerSecond = this.fps;
    },

    property() {
      this.$entity.targetProperty = this.property;
    },

    animationType() {
      this.dataType = this.animationType;
    },

    animationLoopMode() {
      this.loopMode = this.animationLoopMode;
    },

    frames() {
      this.setFrames();
    },

    easingFunction() {
      this.setEasingFunction();
    },

    speedRatio() {
      this.$entity.speedRatio = this.speedRatio;
    },

    loop() {
      this.$entity.loopAnimation = this.loop;
    },

    blending() {
      if (this.blending) {
        this.enableBlending(this.blendingSpeed);
      } else {
        this.disableBlending();
      }
    },
  },

  events: {
    setKey({ name, key }) {
      this.$set(this.keys, name, key);
    },

    removeKey(name) {
      this.$delete(this.keys, name);
    },

    reset() {
      this.$entity.stop();
    },

    enableBlending(speed) {
      this.enableBlending(speed);
    },

    disableBlending() {
      this.disableBlending();
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
  },

  beforeCreate() {
    this.$_TYPES = TYPES;
    this.$_MODES = MODES;
    this.$_EASINGS = EASINGS;
    this.$_EASING_MODES = EASING_MODES;
  },

  onScene({ name }) {
    return new Animation(name, this.property, this.fps, this.animationType, this.animationLoopMode);
  },

  onParent({ parent, entity, scene }) {
    this.setEasingFunction();
    this.setFrames();
    parent.animations.push(entity);
    scene.beginAnimation(parent, this.from, this.finish, this.loop, this.speedRatio, () => {
      this.$event.$emit('end');
    }, this.animatable);
  },
};
