let { TransformNode } = require('babylonjs');
let { id, vec3, toVec3 } = require('../util');

module.exports = {
  render(createElement) {
    return createElement(this.$slots.default);
  },

  inject: {
    Parent: {
      from: 'Entity',
      default: null,
    },
    Scene: 'Scene',
  },

  provide() {
    return {
      Entity: this.node,
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
    setNode(node = new TransformNode(this.id, this.Scene)) {
      this.node = node;
    },
  },

  mounted() {
    if (this.init) {
      this.init();
    }
    if (!this.node) {
      this.setNode();
    }
    if (this.Parent) {
      this.node.setParent(this.Parent);
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
