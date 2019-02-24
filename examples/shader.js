import { BABYLON } from 'vue-babylonjs';

import VERTEX from './vertex.glsl';
import FRAGMENT from './fragment.glsl';

const NAME = 'demo';

BABYLON.Effect.ShadersStore[`${NAME}VertexShader`] = VERTEX;
BABYLON.Effect.ShadersStore[`${NAME}FragmentShader`] = FRAGMENT;

export default {
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
