// let Vuex = require('vuex');
let util = require('./util');

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
    Object.assign(Vue.prototype, {
      $vector: util.$vector,
      $color: util.$color,
      $matrix: util.$matrix,
    });
    Object.entries(Object.assign(
      {
        Scene: require('./scene'),
        Entity: require('./entity'),
        Property: require('./entity/property'),
        Camera: require('./camera'),
      },
      require('./mesh'),
      require('./light'),
      require('./animation'),
      require('./material')
    )).forEach(([name, component]) => {
      Vue.component(name, component);
    });
  },
};
