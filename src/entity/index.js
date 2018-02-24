let { TransformNode, Vector3 } = require('babylonjs');
let { vec3, toVec3 } = require('../util');

let { validator } = vec3;

module.exports = {
  mixins: [require('./abstract')],

  props: {
    position: vec3,
    rotation: vec3,
    scaling: {
      validator,
      default: () => Vector3.One(),
    },
  },

  computed: {
    _$_positionVector3() {
      return toVec3(this.position);
    },

    _$_rotationVector3() {
      return toVec3(this.rotation);
    },

    _$_scalingVector3() {
      return toVec3(this.scaling);
    },
  },

  watch: {
    _$_positionVector3() {
      this._$_setPosition();
    },

    _$_rotationVector3() {
      this._$_setRotation();
    },

    _$_scalingVector3() {
      this._$_setScaling();
    },
  },

  methods: {
    _$_setPosition() {
      if (this.$entity && this.$entity.position) {
        this.$entity.position.copyFrom(this._$_positionVector3);
      }
    },

    _$_setRotation() {
      if (this.$entity && this.$entity.rotation) {
        this.$entity.rotation.copyFrom(this._$_rotationVector3);
      }
    },

    _$_setScaling() {
      if (this.$entity && this.$entity.scaling) {
        this.$entity.scaling.copyFrom(this._$_scalingVector3);
      }
    },
  },

  created() {
    Object.assign(this._$_hookArgs, {
      position: this._$_positionVector3,
      rotation: this._$_rotationVector3,
      scaling: this._$_scalingVector3,
    });
  },

  _$_onTransform() {
    if (!this.$entity) {
      this.$entity = new TransformNode(this.name, this.$scene);
    }
    this._$_setPosition();
    this._$_setRotation();
    this._$_setScaling();
    if (!this.$entity.parent) {
      this.$entity.parent = this._$_parent;
    }
  },
};
