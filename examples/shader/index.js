let { Effect } = require('babylonjs');

const VERTEX = require('./vertex.glsl');
const FRAGMENT = require('./fragment.glsl');

const NAME = 'demo';

Effect.ShadersStore[`${NAME}VertexShader`] = VERTEX;
Effect.ShadersStore[`${NAME}FragmentShader`] = FRAGMENT;

module.exports = {
  computed: {
    vertexShader() {
      return VERTEX;
    },

    fragmentShader() {
      return FRAGMENT;
    },

    shader() {
      return NAME;
    },
  },
};
