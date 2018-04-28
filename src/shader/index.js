import { Effect, ShaderMaterial } from '../babylon';
import AbstractEntity from '../entity/abstract';
import { id } from '../util';

export const VERTEX = 'VertexShader';
export const FRAGMENT = 'FragmentShader';
export const ATTRIBUTES = {
  POSITION: 'position',
  NORMAL: 'normal',
  UV: 'uv',
};
export const UNIFORMS = {
  WORLD: 'world',
  WORLD_VIEW: 'worldView',
  WORLD_VIEW_PROJECTION: 'worldViewProjection',
  VIEW: 'view',
  PROJECTION: 'projection',
  TIME: 'time',
};
export const NAME = 'vue-babylonjs';
export const DEFAULT_VERTEX_NAME = `${NAME}${VERTEX}`;
export const DEFAULT_VERTEX = `
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
export const DEFAULT_FRAGMENT_NAME = `${NAME}${FRAGMENT}`;
export const DEFAULT_FRAGMENT = `
precision highp float;

void main() {
  gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
}
`;

export default {
  mixins: [AbstractEntity],

  data() {
    return {
      uniformStore: {},
      attributeStore: {},
      vertexComponent: null,
      fragmentComponent: null,
    };
  },

  provide() {
    return {
      ShaderName: this.name,
    };
  },

  props: {
    name: {
      type: String,
      default: null,
    },

    vertex: { // vertex name in shader store
      type: String,
      default: null,
    },

    vertexElement: { // vertex script id
      type: String,
      default: null,
    },

    vertexShader: { // raw vertex shader code
      type: String,
      default: null,
    },

    fragment: { // fragment name in shader store
      type: String,
      default: null,
    },

    fragmentElement: { // fragment script id
      type: String,
      default: null,
    },

    fragmentShader: { // raw fragment shader code
      type: String,
      default: null,
    },

    shader: { // shader and fragment name in shader store
      type: String,
      default: null,
    },

    src: { // fx file path
      type: String,
      default: null,
    },
  },

  computed: {
    options() {
      if (this.src) {
        return this.src;
      }
      if (this.shader) {
        return {
          fragment: this.shader,
          vertex: this.shader,
        };
      }
      let options = {};
      if (this.vertexComponent) {
        options.vertex = this.vertexComponent;
      } else if (this.vertex) {
        options.vertex = this.vertex;
      } else if (this.vertexElement) {
        options.vertexElement = this.vertexElement;
      } else if (this.vertexShader) {
        this.storeShader(VERTEX, this.uid, this.vertexShader);
        options.vertex = this.uid;
      } else {
        if (!Effect.ShadersStore[DEFAULT_VERTEX_NAME]) {
          Effect.ShadersStore[DEFAULT_VERTEX_NAME] = DEFAULT_VERTEX;
        }
        options.vertex = NAME;
      }
      if (this.fragmentComponent) {
        options.fragment = this.fragmentComponent;
      } else if (this.fragment) {
        options.fragment = this.fragment;
      } else if (this.fragmentElement) {
        options.fragmentElement = this.fragmentElement;
      } else if (this.fragmentShader) {
        this.storeShader(FRAGMENT, this.uid, this.fragmentShader);
        options.fragment = this.uid;
      } else {
        if (!Effect.ShadersStore[DEFAULT_FRAGMENT_NAME]) {
          Effect.ShadersStore[DEFAULT_FRAGMENT_NAME] = DEFAULT_FRAGMENT;
        }
        options.fragment = NAME;
      }
      return options;
    },

    attributes() {
      return Object.values(ATTRIBUTES).concat(Object.keys(this.attributeStore));
    },

    uniforms() {
      return Object.values(UNIFORMS).concat(Object.keys(this.uniformStore));
    },

    variables() {
      return {
        attributes: this.attributes,
        uniforms: this.uniforms,
      };
    },
  },

  methods: {
    createMaterial() {
      if (!this._$_parent) {
        return;
      }
      this.$replace(new ShaderMaterial(this.name, this.$scene, this.options, this.variables));
      this._$_parent.material = this.$entity;
    },

    setValue(store, variable, value) {
      this.$entity[`set${store[variable]}`](variable, value);
    },

    storeShader(type, name, value) {
      Effect.ShadersStore[name + type] = value;
    },

    getStore(kind) {
      if (kind === 'attribute') {
        return this.attributeStore;
      }
      return this.uniformStore;
    },
  },

  watch: {
    options() {
      this.createMaterial();
    },
  },

  events: {
    registerVariable({ kind, variable, type }) {
      this.getStore(kind)[variable] = type;
    },

    setVariable({ kind, variable, value }) {
      this.setValue(this.getStore(kind), variable, value);
    },

    disposeVariable({ kind, variable }) {
      delete this.getStore(kind)[variable];
    },

    setVertex({ name, value }) {
      this.vertexComponent = name;
      this.storeShader(VERTEX, name, value);
    },

    setFragment({ name, value }) {
      this.fragmentComponent = name;
      this.storeShader(FRAGMENT, name, value);
    },
  },

  beforeCreate() {
    this.uid = id();
  },

  onParent() {
    this.createMaterial();
  },

  beforeRender() {
    this.$entity.setFloat('time', performance.now());
  },

  beforeDestroy() {
    this._$_destroyed = true;
    this.$entity.dispose();
  },
};
