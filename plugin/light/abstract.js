let { vec3, color3, toColor3 } = require('../util');

module.exports = {
  mixins: [require('../entity')],

  props: {
    color: color3,
    specular: color3,
  },

  computed: {
    diffuseColor3() {
      return toColor3(this.color);
    },

    specularColor3() {
      return toColor3(this.specular);
    },
  },

  watch: {
    diffuseColor3() {
      this.node.diffuse.copyFrom(this.diffuseColor3);
    },

    specularColor3() {
      this.node.specular.copyFrom(this.specularColor3);
    },
  },
};
