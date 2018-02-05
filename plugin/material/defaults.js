let { Effect } = require('babylonjs');

const NAME = 'vue-babylonjs';

Effect.ShadersStore[`${NAME}VertexShader`] = `
attribute vec3 position;
attribute vec2 uv;
uniform mat4 worldViewProjection;
uniform float time;
varying vec2 vUv;

void main() {
  gl_Position = worldViewProjection * vec4(position, 1.0);
  vUv = uv;
}
`;

Effect.ShadersStore[`${NAME}FragmentShader`] = `
precision highp float;

void main() {
  gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
}
`;

module.exports = NAME;
