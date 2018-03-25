let { Effect, ShaderMaterial } = require('babylonjs');
let { id } = require('../util');
let defaultShader = require('./defaults');

const VERTEX = 'VertexShader';
const FRAGMENT = 'FragmentShader';
const ATTRIBUTES = [
  'position',
  'normal',
  'uv',
];
const UNIFORMS = [
  'world',
  'worldView',
  'worldViewProjection',
  'view',
  'projection',
  'time',
];

module.exports = {
  mixins: [require('../entity/abstract')],

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
        options.vertex = defaultShader;
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
        options.fragment = defaultShader;
      }
      return options;
    },

    attributes() {
      return ATTRIBUTES.concat(Object.keys(this.attributeStore));
    },

    uniforms() {
      return UNIFORMS.concat(Object.keys(this.uniformStore));
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
