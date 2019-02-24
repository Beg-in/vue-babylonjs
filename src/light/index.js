import { color3, toColor3 } from '../types/color';
import Entity from '../entity';

export default {
  mixins: [Entity],

  props: {
    diffuse: color3,
    specular: color3,
  },

  computed: {
    diffuseColor3() {
      return toColor3(this.diffuse);
    },

    specularColor3() {
      return toColor3(this.specular);
    },
  },

  watch: {
    diffuseColor3() {
      this.setDiffuse();
    },

    specularColor3() {
      this.setSpecular();
    },
  },

  methods: {
    setDiffuse() {
      this.$entity.diffuse.copyFrom(this.diffuseColor3);
    },

    setSpecular() {
      this.$entity.specular.copyFrom(this.specularColor3);
    },
  },

  onEntity() {
    this.setDiffuse();
    this.setSpecular();
  },
};
