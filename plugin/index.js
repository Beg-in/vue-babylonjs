// let Vuex = require('vuex');

// module.exports = Object.assign((store, { namespace = 'scene' } = {}) => {
//   store.registerModule(namespace, require('./store'));
//   Object.assign(module.exports, Vuex.createNamespacedHelpers(namespace), { store });
// }, {
module.exports = {
  install(Vue) {
    // if (!module.exports.store) {
    //   console.error('Error loading vue-babylonjs: Must be installed to Vuex first');
    //   return;
    // }
    Object.entries(Object.assign({
      Scene: require('./scene'),
      Entity: require('./entity'),
    }, require('./mesh'), require('./light'))).forEach(([name, component]) => {
      Vue.component(name, component);
    });
  },
};
