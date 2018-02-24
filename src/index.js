let BABYLON = require('babylonjs');
let { $vector, $color, $matrix } = require('./util');

const API = {
  BABYLON,
  $vector,
  $color,
  $matrix,
};

module.exports = {
  install(Vue) {
    Object.assign(Vue.prototype, API);
    Object.assign(Vue, API);
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
      require('./material'),
    )).forEach(([name, component]) => {
      Vue.component(name, component);
    });
  },
};
