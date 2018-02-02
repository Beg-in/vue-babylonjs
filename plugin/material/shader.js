let Vue = require('vue');
let { capitalize } = require('../util');

const ATTRIBUTES = [
  "position",
  "normal",
  "uv"
];
const UNIFORMS = [
  "world",
  "worldView",
  "worldViewProjection",
  "view",
  "projection",
  "time",
  "direction",
];

module.exports = {
  mixins: [require('../entity/abstract')],

  data() {
    return {
      bus: new Vue({}),
      uniformStore: {},
      attributeStore: {},
      vertexComponent: null,
      fragmentComponent: null,
    };
  },

  provide() {
    return {
      ShaderBus: this.bus,
    };
  },

  props: {
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
    attributes() {
      return ATTRIBUTES.concat(Object.keys(this.attributeStore));
    },

    uniforms() {
      return UNIFORMS.concat(Object.keys(this.uniformStore));
    },

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
        // TODO: raw shader code
      } else {
        // TODO: default shader
      }
      if (this.fragmentComponent) {
        options.fragment = this.fragmentComponent;
      } else if (this.fragment) {
        options.fragment = this.fragment;
      } else if (this.fragmentElement) {
        options.fragmentElement = this.fragmentElement;
      } else if (this.fragmentShader) {
        // TODO: raw shader code
      } else {
        // TODO: default shader
      }
      return options;
    },
  },

  methods: {
    createMaterial() {
      if (this.$entity) {
        delete this.$entity.onDispose;
        this.$entity.dispose();
      }
      this.$entity = new ShaderMaterial(name, scene, this.options, {
        attributes: this.attributes,
        uniforms: this.uniforms,
      });
      this.$entity.onDispose = () => {
        if (!this._$_destroyed) {
          this.$destroy();
        }
      };
      this._$_parent.material = this.$entity;
      this.bus.$emit('create');
    },

    setValue(store, variable, value) {
      this.$entity[`set${capitalize(store[variable])}`](value);
    },
  },

  events: {
    registerAttribute({ variable, type }) {
      this.attributeStore[variable] = type;
    },

    setAttribute({ variable, value }) {
      this.setValue(this.attributeStore, variable, value);
    },

    disposeAttribute(variable) {
      delete this.customAttributes[variable];
    },

    registerUniform({ variable, type }) {
      this.uniformStore[variable] = type;
    },

    setUniform({ variable, value }) {
      this.setValue(this.uniformStore, variable, value);
    },

    disposeUniform(variable) {
      delete this.uniformStore[variable];
    },

    setVertexComponent(value) {
      this.vertexComponent = value;
    },

    setFragmentComponent(value) {
      this.fragmentComponent = value;
    },
  },

  watch: {
    attributes() {
      this.setMaterial();
    },

    uniforms() {
      this.setMaterial();
    },

    options() {
      this.setMaterial();
    },
  },

  created() {
    Object.entries(this.$options.events).forEach(([name, fn]) => {
      this.bus.$on(name, fn.bind(this));
    });
  },

  onParent() {
    this.setMaterial();
  },

  beforeDestroy() {
    this._$_destroyed = true;
    this.$entity.dispose();
  },
};
