precision highp float;
attribute vec3 position;
uniform mat4 worldViewProjection;
uniform float time;
uniform vec3 color;
uniform float start;
varying float t;

void main() {
  gl_Position = worldViewProjection * vec4(position, 1.0);
  t = sin((time / 1000.0) + start);
}
