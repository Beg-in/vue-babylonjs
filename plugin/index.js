let Vuex = require('Vuex');
let { Scene, Engine } = require('babylonjs');

const STORE_MODULE = 'scene';

let ready = new Promise(resolve => {
  ready.resolve = resolve;
});

module.exports = Object.assign(store => {
  store.registerModule(STORE_MODULE, {
    namespaced: true,
    state: {
      scene: null,
      engine: null,
      vrHelper: null,
    },

    mutations: {
      setScene(state, el) {
        state.engine = new Engine(el, true);
        state.scene = new Scene(state.engine);
        state.vrHelper = state.scene.createDefaultVRExperience();
        state.engine.runRenderLoop(() => state.scene.render());
      },

      resize(state) {
        state.engine.resize();
      },

      teleportationEnabled(state, status) {
        state.vrHelper.teleportationEnabled = status;
      },
    },

    actions: {
      // init() {
      // },
    },
  });
  module.exports.store = Object.assign(Vuex.createNamespacedHelpers(STORE_MODULE), { store });
  let { mapActions } = module.exports.store;
  // Object.assign({ $store: store }, mapActions(['init'])).init();
  ready.resolve(module.exports.store);
}, {
  ready,
  async install(Vue) {
    let { mapMutations, mapActions } = await ready;
    Vue.component('scene', {
      props: {
        teleportation: {
          type: 'Boolean',
          default: false,
        },
      },
      render(createElement) {
        return createElement('canvas', {
          ref: 'scene',
          style: { height: '100%', width: '100%' },
          nativeOn: {
            resize: this.resize
          },
        });
      },
      watch: {
        teleportation() {
          this.teleportationEnabled(this.teleportation);
        },
      },
      methods: mapMutations(['setScene', 'resize', 'teleportationEnabled']),
      mounted() {
        this.setScene(this.$refs.scene);
        this.teleportationEnabled(this.teleportation);
      },
    });
  },
});
