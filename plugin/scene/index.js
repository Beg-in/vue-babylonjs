let BABYLONJS = require('babylonjs');

let { Engine, Scene } = BABYLONJS;

module.exports = {
  render(createElement) {
    return createElement('canvas', {
      ref: 'scene',
      style: { height: '100%', width: '100%' },
    }, this.$slots.default);
  },

  provide() {
    return {
      BABYLONJS,
      Engine: this.engine,
      Scene: this.scene,
      VrHelper: this.vrHelper,
    };
  },

  methods: {
    resize() {
      this.engine.resize();
    },

    setScene() {
      this.engine = new Engine(this.$refs.scene, true);
      this.scene = new Scene(this.engine);
      this.vrHelper = this.scene.createDefaultVRExperience();
      this.engine.runRenderLoop(() => this.scene.render());
    },
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
};
