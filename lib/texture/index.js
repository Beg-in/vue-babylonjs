let { Texture } = require('babylonjs');

const TYPES = [
  'diffuse',
  'ambient',
  'opacity',
  'reflection',
  'emissive',
  'specular',
  'bump',
  'lightmap',
  'refraction',
  'cameraColorGrading',

  // PBR textures
  'albedo',
  'reflectivity',
  'metallic',
  'microSurface',
  'environmentBRDF',

  // PBR renames
  'metallicRoughness',
  'environment',
  'normal',
  'occlusion',
  'specularGlossiness',
];

module.exports = {
  mixins: [require('../entity/abstract')],

  props: {
    type: {
      validator: value => TYPES.includes(value),
      default: TYPES[0],
    },

    property: {
      type: String,
      default: null,
    },

    src: {
      type: String,
      default: null,
    },

    value: {
      validator: value => value instanceof Texture,
      default: null,
    },
  },

  computed: {
    identifier() {
      return this.property || `${this.type}Texture`;
    },
  },

  methods: {
    create() {
      let texture = this.value || new Texture(this.src, this.$scene);
      this.$replace(texture);
    },

    dispose(property = this.identifier) {
      this.$bus.$emit('disposeTexture', { property });
    },

    set() {
      this.$bus.$emit('setTexture', {
        property: this.identifier,
        texture: this.$entity,
      });
    },

    change() {
      if (!this.$entity) {
        this.create();
      }
      this.set();
    },
  },

  watch: {
    identifier(_, property) {
      this.dispose(property);
      this.set();
    },

    src() {
      this.dispose();
      this.create();
      this.set();
    },

    value() {
      this.dispose();
      this.create();
      this.set();
    },
  },

  onParent() {
    this.$bus.$on('change', this.change);
    this.change();
  },

  beforeDestroy() {
    this.dispose();
  },
};
