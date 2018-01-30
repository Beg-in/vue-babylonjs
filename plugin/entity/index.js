let classes = require('babylonjs');
let { id, vec3, toVec3 } = require('../util');

let { TransformNode, Vector3 } = classes;
let { validator } = vec3;

module.exports = {
  inject: {
    _$_parentReady: {
      from: 'EntityReady',
      default: Promise.resolve(null),
    },
    _$_sceneReady: 'SceneReady',
  },

  provide() {
    return {
      EntityReady: this._$_entityReady,
    };
  },

  props: {
    name: {
      type: String,
      default: () => id(),
    },
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

  beforeCreate() {
    this._$_entityReady = new Promise(resolve => {
      this._$_resolveEntity = resolve;
    });
  },

  async created() {
    let args = {
      classes,
      position: this._$_positionVector3,
      rotation: this._$_rotationVector3,
      scaling: this._$_scalingVector3,
      name: this.name,
    };
    if (this.$options.beforeScene) { // Lifecycle Hook
      await this.$options.beforeScene.call(this, Object.assign({
        sceneReady: this._$_sceneReady,
        parentReady: this._$_parentReady,
      }, args));
    }
    this._$_scene = await this._$_sceneReady;
    args.scene = this._$_scene;
    if (this.$options.onScene) { // Lifecycle Hook
      this.$entity = await this.$options.onScene.call(this, Object.assign({
        parentReady: this._$_parentReady,
      }, args));
    }
    this._$_parent = await this._$_parentReady;
    args.parent = this._$_parent;
    if (this.$options.onParent) { // Lifecycle Hook
      await this.$options.onParent.call(this, args);
    }
    if (!this.$entity) {
      this.$entity = new TransformNode(this.name, this._$_scene);
    }
    this._$_setPosition();
    this._$_setRotation();
    this._$_setScaling();
    if (!this.$entity.parent) {
      this.$entity.parent = this._$_parent;
    }
    this._$_resolveEntity(this.$entity);
    args.entity = this.$entity;
    if (this.$options.onEntity) { // Lifecycle Hook
      await this.$options.onEntity.call(this, args);
    }
    if (this.$options.beforeRender) { // Render Loop Hook
      this._$_beforeRender = this.$options.beforeRender.bind(this);
      this._$_scene.registerBeforeRender(this._$_beforeRender);
    }
    if (this.$options.afterRender) { // Render Loop Hook
      this._$_afterRender = this.$options.afterRender.bind(this);
      this._$_scene.registerAfterRender(this._$_afterRender);
    }
    this.$entity.onDispose = () => {
      if (!this._$_destroyed) {
        this.$destroy()
      }
    };
  },

  beforeDestroy() {
    this._$_destroyed = true;
    if (this.$options.beforeRender) {
      this._$_scene.unregisterBeforeRender(this._$_beforeRender);
    }
    if (this.$options.afterRender) {
      this._$_scene.unregisterAfterRender(this._$_afterRender);
    }
    if (this.$entity && this.$entity.dispose) {
      this.$entity.dispose();
    }
  },

  render(createElement) {
    return createElement('div', this.$slots.default);
  },
};
