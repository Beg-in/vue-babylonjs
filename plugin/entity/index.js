let { TransformNode } = require('babylonjs');
let { id, vec3, toVec3 } = require('../util');

module.exports = {
  name: 'vue-babylonjs-entity',

  inject: [
    'parentNode',
    'scene',
  ],

  provide() {
    return {
      parentNode: this.node,

      get position() {
        return this.positionVector3;
      },

      get rotation() {
        return this.rotationVector3;
      },

      get scaling() {
        return this.scalingVector3;
      },
    };
  },

  props: {
    id: {
      type: String,
      default: () => id(),
    },
    position: vec3,
    rotation: vec3,
    scaling: vec3,
  },

  computed: {
    positionVector3() {
      return toVec3(this.position);
    },

    rotationVector3() {
      return toVec3(this.rotation);
    },

    scalingVector3() {
      return toVec3(this.scaling);
    },
  },

  watch: {
    positionVector3() {
      this.node.position.copyFrom(this.positionVector3);
    },

    rotationVector3() {
      this.node.rotation.copyFrom(this.rotationVector3);
    },

    scalingVector3() {
      this.node.scaling.copyFrom(this.scalingVector3);
    },
  },

  methods: {
    setNode(node = new TransformNode(this.id, this.scene)) {
      this.node = node;
    },
  },

  created() {
    if (this.init) {
      this.init();
    }
    if (!this.node) {
      this.setNode();
    }
    if (this.parentNode) {
      this.node.setParent(this.parentNode);
    }
    this.node.onDispose(() => {
      if (!this.destroyed) {
        this.$destroy()
      }
    });
  },

  beforeDestroy() {
    this.destroyed = true;
    if (this.node) {
      this.node.dispose();
    }
  },
};
