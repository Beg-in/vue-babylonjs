import { Texture } from '@babylonjs/core';
import AbstractEntity from '../entity/abstract';

const TYPES = {
  DIFFUSE: 'diffuse',
  AMBIENT: 'ambient',
  OPACITY: 'opacity',
  REFLECTION: 'reflection',
  EMISSIVE: 'emissive',
  SPECULAR: 'specular',
  BUMP: 'bump',
  LIGHTMAP: 'lightmap',
  REFRACTION: 'refraction',
  CAMERA_COLOR_GRADING: 'cameraColorGrading',

  // PBR textures
  ALBEDO: 'albedo',
  REFLECTIVITY: 'reflectivity',
  METALLIC: 'metallic',
  MICROSURFACE: 'microSurface',
  ENVIRONMENT_BRDF: 'environmentBRDF',

  // PBR renames
  METALLIC_ROUGHNESS: 'metallicRoughness',
  ENVIRONMENT: 'environment',
  NORMAL: 'normal',
  OCCLUSION: 'occlusion',
  SPECULAR_GLOSSINESS: 'specularGlossiness',
};

export default {
  mixins: [AbstractEntity],

  props: {
    type: {
      validator: value => Object.values(TYPES).includes(value),
      default: Object.values(TYPES)[0],
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
