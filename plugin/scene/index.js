let { Engine, Scene } = require('babylonjs');

module.exports = {
  provide() {
    return {
      EngineReady: this.EngineReady,
      SceneReady: this.SceneReady,
      // VrHelper: this.vrHelper,
    };
  },

  methods: {
    resize() {
      this.engine.resize();
    },

    setScene() {
      this.engine = new Engine(this.$refs.scene, true);
      this.scene = new Scene(this.engine);
      // https://developer.mozilla.org/en-US/docs/Web/API/Element/requestFullScreen
      this.vrHelper = this.scene.createDefaultVRExperience({
        createFallbackVRDeviceOrientationFreeCamera: false,
      });
      this.resolveScene(this.scene);
      this.resolveEngine(this.engine);
      this.engine.runRenderLoop(() => this.scene.render());
      // HACK: investigate sqaush effect on initial load
      this.scene.executeWhenReady(this.resize);
      // TODO: Add ability to toggle debugLayer on keystroke
      // this.scene.debugLayer.show();
    },
  },

  beforeCreate() {
    this.SceneReady = new Promise(resolve => {
      this.resolveScene = resolve;
    });
    this.EngineReady = new Promise(resolve => {
      this.resolveEngine = resolve;
    });
  },

  mounted() {
    this.setScene(this.$refs.scene);
    window.addEventListener('resize', this.resize);
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.resize);
    this.engine.stopRenderLoop();
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
