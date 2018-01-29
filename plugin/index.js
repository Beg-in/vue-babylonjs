// let Vuex = require('vuex');

// module.exports = Object.assign((store, { namespace = 'scene' } = {}) => {
//   store.registerModule(namespace, require('./store'));
//   Object.assign(module.exports, Vuex.createNamespacedHelpers(namespace), { store });
// }, {
module.exports = {
  components: Object.assign({
    entity: require('./entity'),
  }, require('./mesh')),

  install(Vue) {
    // if (!module.exports.store) {
    //   console.error('Error loading vue-babylonjs: Must be installed to Vuex first');
    //   return;
    // }
    Vue.component('scene', require('./scene'));
  },
};
