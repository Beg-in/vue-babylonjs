let { PointLight } = require('babylonjs');

module.exports = {
  mixins: [require('./abstract')],

  methods: {
    init() {
      this.setNode(new PointLight(this.id, this.positionVector3, this.scene));
    },
  },
};
