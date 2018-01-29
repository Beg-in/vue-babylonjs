let { components } = require('../');
let BABYLONJS = require('babylonjs');

module.exports = {
  components,

  render(createElement) {
    return createElement('canvas', {
      ref: 'scene',
      style: { height: '100%', width: '100%' },
    });
  },

  provide() {
    return {
      BABYLONJS,
      engine: this.engine,
      scene: this.scene,
      vrHelper: this.vrHelper,
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
