let Vue = require('vue');
let { Engine, Scene, Color3, Vector3, CannonJSPlugin, OmioJSPlugin } = require('babylonjs');
let { color3, toColor3, vec3: { validator }, toVec3 } = require('../util');

const FOG_TYPES = [
  'none',
  'exp',
  'exp2',
  'linear',
];

const PHYSICS_ENGINES = [
  'cannon',
  'oimo',
];

module.exports = {
  provide() {
    return {
      EngineReady: this.EngineReady,
      SceneReady: this.SceneReady,
      SceneBus: this.sceneBus,
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
      validator: value => FOG_TYPES.includes(value),
      default: FOG_TYPES[0],
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

    physics: {
      type: String,
      default: PHYSICS_ENGINES[0],
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
      this.scene = new Scene(this.engine);
      this.setAmbientColor();
      this.setFogMode();
      this.resolveScene(this.scene);
      this.resolveEngine(this.engine);
      Vue.nextTick(this.defaultEnvironment);
      this.engine.runRenderLoop(() => this.scene.render());
      this.requestFullScreen();
      this.debugLayer();
      this.scene.executeWhenReady(this.resize); // HACK: investigate sqaush effect on initial load
      this.scene.executeWhenReady(this.defaultEnvrionment);
      this.$emit('change', this.scene);
    },

    initPhysics() {
      if (!this.physicsEngine) {
        this.physicsEngine = this.physics === 'cannon' ? new CannonJSPlugin() : new OmioJSPlugin();
        this.scene.enablePhysics(this.gravityVector3, this.physicsEngine);
      }
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
  },

  beforeCreate() {
    this.sceneBus = new Vue();
    this.SceneReady = new Promise(resolve => {
      this.resolveScene = resolve;
    });
    this.EngineReady = new Promise(resolve => {
      this.resolveEngine = resolve;
    });
  },

  created() {
    this.sceneBus.$on('physics', this.initPhysics);
  },

  mounted() {
    this.setScene(this.$refs.scene);
    window.addEventListener('resize', this.resize);
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.resize);
    this.engine.stopRenderLoop();
    if (this.physicsEngine) {
      this.physicsEngine.dispose();
      this.physicsEngine = null;
    }
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
