let Vue = require('vue');
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
    $bus: {
      from: 'EntityBus',
      default: new Vue(),
    },
  },

  provide() {
    return {
      EntityReady: this._$_entityReady,
      EntityBus: this.$event,
    };
  },

  props: {
    name: {
      type: String,
      default: () => id(),
    },
  },

  beforeCreate() {
    this.$event = new Vue();
    this._$_entityReady = new Promise(resolve => {
      this._$_resolveEntity = resolve;
    });
  },

  created() {
    this._$_hookArgs = {
      classes,
      name: this.name,
    };
    if (this.$options.events) {
      Object.entries(this.$options.events).forEach(([name, fn]) => {
        this.$event.$on(name, fn.bind(this));
      });
    }
  },

  async mounted() {
    if (this.$options.beforeScene) { // Lifecycle Hook
      this.$entity = await this.$options.beforeScene.call(this, Object.assign({
        sceneReady: this._$_sceneReady,
        parentReady: this._$_parentReady,
      }, this._$_hookArgs));
    }
    this.$scene = await this._$_sceneReady;
    this._$_hookArgs.scene = this.$scene;
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
      this.$scene.registerBeforeRender(this._$_beforeRender);
    }
    if (this.$options.afterRender) { // Render Loop Hook
      this._$_afterRender = this.$options.afterRender.bind(this);
      this.$scene.registerAfterRender(this._$_afterRender);
    }
  },

  beforeDestroy() {
    if (this.$options.beforeRender) {
      this.$scene.unregisterBeforeRender(this._$_beforeRender);
    }
    if (this.$options.afterRender) {
      this.$scene.unregisterAfterRender(this._$_afterRender);
    }
  },

  render(createElement) {
    return createElement('div', this.$slots.default);
  },
};
