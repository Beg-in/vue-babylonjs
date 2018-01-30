let { HemisphericLight } = require('babylonjs');

module.exports = {
  mixins: [require('./directional')],

  methods: {
    init() {
      this.setNode(new HemisphericLight(this.id, this.directionVector3, this.scene));
    },
  },
};
