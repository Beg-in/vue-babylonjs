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
        Camera: require('./camera'),
        Entity: require('./entity'),
        Property: require('./entity/property'),
        Material: require('./material'),

        Animation: require('./animation'),
        Key: require('./animation/key'),

        DirectionalLight: require('./light/directional'),
        HemisphericLight: require('./light/hemispheric'),
        PointLight: require('./light/point'),
        SpotLight: require('./light/spot'),

        Shader: require('./shader'),
        Vertex: require('./shader/vertex'),
        Fragment: require('./shader/fragment'),
        Attribute: require('./shader/attribute'),
        Uniform: require('./shader/uniform'),
      },
      require('./mesh'),
    )).forEach(([name, component]) => {
      Vue.component(name, component);
    });
  },
};
