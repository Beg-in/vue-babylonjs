let classes = require('babylonjs');
let { id } = require('../util');

let { Node } = classes;

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
  },

  beforeCreate() {
    this._$_entityReady = new Promise(resolve => {
      this._$_resolveEntity = resolve;
    });
  },

  created() {
    this._$_hookArgs = {
      classes,
      name: this.name,
    }
  },

  async mounted() {
    if (this.$options.beforeScene) { // Lifecycle Hook
      this.$entity = await this.$options.beforeScene.call(this, Object.assign({
        sceneReady: this._$_sceneReady,
        parentReady: this._$_parentReady,
      }, this._$_hookArgs));
    }
    this._$_scene = await this._$_sceneReady;
    this._$_hookArgs.scene = this._$_scene;
    if (this.$options.onScene) { // Lifecycle Hook
      this.$entity = await this.$options.onScene.call(this, Object.assign({
        parentReady: this._$_parentReady,
      }, this._$_hookArgs));
    }
    this._$_hookArgs.entity = this.$entity;
    this._$_parent = await this._$_parentReady;
    this._$_hookArgs.parent = this._$_parent;
    if (this.$options.onParent) { // Lifecycle Hook
      await this.$options.onParent.call(this, this._$_hookArgs);
    }
    if (this.$options._$_onTransform) { // Private Lifecycle Hook
      await this.$options._$_onTransform.call(this);
    }
    this._$_resolveEntity(this.$entity);
    if (this.$options.onEntity) { // Lifecycle Hook
      await this.$options.onEntity.call(this, this._$_hookArgs);
    }
    if (this.$options.beforeRender) { // Render Loop Hook
      this._$_beforeRender = this.$options.beforeRender.bind(this);
      this._$_scene.registerBeforeRender(this._$_beforeRender);
    }
    if (this.$options.afterRender) { // Render Loop Hook
      this._$_afterRender = this.$options.afterRender.bind(this);
      this._$_scene.registerAfterRender(this._$_afterRender);
    }
  },

  beforeDestroy() {
    if (this.$options.beforeRender) {
      this._$_scene.unregisterBeforeRender(this._$_beforeRender);
    }
    if (this.$options.afterRender) {
      this._$_scene.unregisterAfterRender(this._$_afterRender);
    }
  },

  render(createElement) {
    return createElement('div', this.$slots.default);
  },
};
