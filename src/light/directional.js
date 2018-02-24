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
      this.setDirection();
    },
  },

  methods: {
    setDirection() {
      this.$entity.direction.copyFrom(this.directionVector3);
    },
  },

  onScene({ name, scene, classes: { DirectionalLight } }) {
    return new DirectionalLight(name, this.directionVector3, scene);
  },
};
