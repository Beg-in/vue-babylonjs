import { Engine, Scene, Color3, Vector3 } from '../babylon';
import { createBus, defer } from '../util';
import { vecValidator as validator, toVec3 } from '../types/vector';
import { color3, toColor3 } from '../types/color';
import { registerObservers } from '../observable';

const FOG_TYPES = {
  NONE: 'none',
  EXP: 'exp',
  EXP2: 'exp2',
  LINEAR: 'linear',
};

export default {
  provide() {
    return {
      EngineReady: this.EngineReady,
      SceneReady: this.SceneReady,
      SceneBus: this.sceneBus,
      SceneGravity: this.gravityVector3,
      EntityBus: this.$event,
    };
  },

  model: {
    prop: 'model',
    event: 'change',
  },

  props: {
    model: {
      type: Object,
      default: null,
    },

    ambient: {
      validator: color3.validator,
      default: () => Color3.Black(),
    },

    fog: {
      validator: value => Object.values(FOG_TYPES).includes(value),
      default: Object.values(FOG_TYPES)[0],
    },

    fogStart: {
      type: Number,
      default: 20,
    },

    fogEnd: {
      type: Number,
      default: 60,
    },

    fogDensity: {
      type: Number,
      default: 0.1,
    },

    fogColor: {
      validator: color3.validator,
      default: () => new Color3(0.2, 0.2, 0.3),
    },

    fullscreen: {
      type: Boolean,
      default: false,
    },

    debug: {
      type: Boolean,
      default: false,
    },

    environment: {
      type: Object,
      default: undefined,
    },

    main: {
      validator: color3.validator,
      default: null,
    },

    gravity: {
      validator,
      default: () => new Vector3(0, -9.81, 0),
    },
  },

  computed: {
    ambientColor() {
      return toColor3(this.ambient);
    },

    fogMode() {
      return Scene[`FOGMODE_${this.fog.toUpperCase()}`];
    },

    fogColor3() {
      return toColor3(this.fogColor);
    },

    mainColor() {
      if (!this.main) {
        return null;
      }
      return toColor3(this.main);
    },

    gravityVecor3() {
      return toVec3(this.gravity);
    },
  },

  methods: {
    setAmbientColor() {
      this.scene.ambientColor = this.ambientColor;
    },

    setFogStart() {
      this.scene.fogStart = this.fogStart;
    },

    setFogEnd() {
      this.scene.fogStart = this.fogEnd;
    },

    setFogDensity() {
      this.scene.fogDensity = this.fogDensity;
    },

    setFogColor() {
      this.scene.fogColor = this.fogColor3;
    },

    setFogMode() {
      this.scene.fogMode = this.fogMode;
      switch (this.fog) {
        case 'none':
          break;
        case 'linear':
          this.setFogStart();
          this.setFogEnd();
          break;
        default:
          this.setFogDensity();
      }
      this.setFogColor();
    },

    requestFullScreen() {
      if (this.fullscreen) {
        this.$refs.scene.requestFullScreen();
      }
    },

    debugLayer() {
      if (this.debug) {
        this.scene.debugLayer.show();
      } else {
        this.scene.debugLayer.hide();
      }
    },

    resize() {
      this.engine.resize();
    },

    defaultEnvironment() {
      if (this.scene.cameras.length < 1) {
        this.scene.createDefaultCameraOrLight(true, true, true);
        let helper = this.scene.createDefaultEnvironment(this.environment);
        if (this.mainColor) {
          helper.setMainColor(this.mainColor);
        }
      }
    },

    setScene() {
      this.engine = new Engine(this.$refs.scene, true);
      this.$emit('engine', this.engine);
      this.scene = new Scene(this.engine);
      this.$emit('scene', this.scene);
      this.observers = registerObservers.call(this, this.scene);
      this.setAmbientColor();
      this.setFogMode();
      this.resolveScene(this.scene);
      this.resolveEngine(this.engine);
      this.$nextTick(this.defaultEnvironment);
      this.engine.runRenderLoop(() => this.scene.render());
      this.requestFullScreen();
      this.debugLayer();
      this.scene.executeWhenReady(this.resize); // HACK: investigate sqaush effect on initial load
      this.scene.executeWhenReady(this.defaultEnvrionment);
    },

    setGravity() {
      if (this.scene && this.scene.getPhysicsEngine()) {
        this.physicsEngine.setGravity(this.gravityVector3);
      }
    },

    register({ name }) {
      this._$_children[name] = defer();
    },

    complete({ name, entity }) {
      this._$_children[name].complete({ name, entity });
    },
  },

  watch: {
    ambientColor() {
      this.setAmbientColor();
    },

    fog() {
      this.setFogMode();
    },

    fogDensity() {
      this.setFogDensity();
    },

    fogStart() {
      this.setFogStart();
    },

    fogEnd() {
      this.setFogEnd();
    },

    fogColor3() {
      this.setFogColor();
    },

    fullscreen() {
      this.requestFullScreen();
    },

    debug() {
      this.debugLayer();
    },

    gravityVector3() {
      this.setGravity();
    },
  },

  beforeCreate() {
    this.sceneBus = createBus.call(this);
    this.SceneReady = new Promise(resolve => {
      this.resolveScene = resolve;
    });
    this.EngineReady = new Promise(resolve => {
      this.resolveEngine = resolve;
    });
    this.$event = createBus.call(this);
  },

  beforeMount() {
    this._$_children = {};
    this.$event.$on('register', this.register);
    this.$event.$on('complete', this.complete);
  },

  async mounted() {
    this.setScene(this.$refs.scene);
    window.addEventListener('resize', this.resize);
    let children = await Promise.all(Object.values(this._$_children));
    children = children.reduce((out, { name, entity }) => {
      out[name] = entity;
      return out;
    }, {});
    this.$emit('complete', { children, scene: this.scene, engine: this.engine });
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.resize);
    this.engine.stopRenderLoop();
    this.observers();
    this.scene.dispose();
    this.vrHelper = null;
    this.scene = null;
    this.engine = null;
  },

  render(createElement) {
    return createElement('canvas', {
      ref: 'scene',
      style: { height: '100%', width: '100%' },
    }, this.$slots.default);
  },
};
