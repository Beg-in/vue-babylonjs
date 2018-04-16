precision highp float;
uniform float time;
uniform vec3 color;
varying float t;

void main() {
  gl_FragColor = vec4(t * color, 1.0);
}
