let { DirectionalLight } = require('babylonjs');
let { vec3, toVec3 } = require('../util');

module.exports = {
  mixins: [require('./abstract')],

  props: {
    direction: vec3,
  },

  computed: {
    directionVector3() {
      return toVec3(this.direction);
    },
  },

  watch: {
    directionVector3() {
      this.node.direction.copyFrom(this.directionVector3);
    },
  },

  methods: {
    init() {
      this.setNode(new DirectionalLight(this.id, this.directionVector3, this.scene));
    },
  },
};
