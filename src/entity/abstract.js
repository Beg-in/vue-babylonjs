import { id, isDisposable, createBus, defer } from '../util';
import { registerObservers } from '../observable';

export default {
  inject: {
    _$_sceneReady: 'SceneReady',

    _$_parentReady: {
      from: 'EntityReady',
      default: Promise.resolve(null),
    },

    $bus: {
      from: 'EntityBus',
      default() {
        return createBus.call(this);
      },
    },

    $sceneBus: {
      from: 'SceneBus',
      default() {
        return createBus.call(this);
      },
    },
  },

  provide() {
    return {
      EntityReady: this._$_entityReady,
      EntityBus: this.$event,
    };
  },

  model: {
    prop: '_$_input',
    event: '_$_output',
  },

  props: {
    _$_input: {
      type: Object,
      default: null,
    },

    name: {
      type: String,
      default: id,
    },

    properties: {
      type: Object,
      default: null,
    },
  },

  methods: {
    _$_applyProperties() {
      if (this.$entity && this.properties) {
        Object.assign(this.$entity, this.properties);
      }
    },

    async _$_init() {
      this._$_clearObservers = registerObservers.call(this, this.$scene);
      if (this.$options._$_onTransform) { // Private Lifecycle Hook
        await this.$options._$_onTransform.call(this);
      }
      if (this.$options.onEntity) { // Lifecycle Hook
        await this.$options.onEntity.call(this, this._$_hookArgs);
      }
      if (isDisposable(this.$entity)) {
        this.$entity.onDispose = () => {
          if (!this._$_destroyed) {
            this.$destroy();
          }
        };
      }
      this.$emit('_$_output', this.$entity);
      this.$event.$emit('change', this.$entity);
      this.$emit('entity', this._$_hookArgs);
    },

    async _$_onParent(parent) {
      this._$_parent = parent;
      this._$_hookArgs.parent = this._$_parent;
      if (this.$options.onParent) { // Lifecycle Hook
        await this.$options.onParent.call(this, this._$_hookArgs);
      }
      this.$emit('parent', this._$_hookArgs);
    },

    async $replace(entity) {
      if (this._$_clearObservers) {
        this._$_clearObservers();
      }
      if (isDisposable(this.$entity)) {
        this._$_destroyed = true;
        this.$entity.dispose();
        this._$_destroyed = false;
      }
      this.$entity = entity;
      await this._$_init();
    },

    register({ name }) {
      this._$_children[name] = defer();
    },

    complete({ name, entity }) {
      this._$_children[name].complete({ name, entity });
    },
  },

  watch: {
    properties: {
      handler() {
        this._$_applyProperties();
      },
      deep: true,
    },

    _$_input() {
      if (this.$entity !== this._$_input) {
        this.$replace(this._$_input);
      }
    },
  },

  beforeCreate() {
    this.$event = createBus.call(this);
    this._$_entityReady = defer();
  },

  created() {
    this._$_hookArgs = {
      name: this.name,
    };
    if (this.$options.events) {
      Object.entries(this.$options.events).forEach(([name, fn]) => {
        this.$event.$on(name, fn.bind(this));
      });
    }
  },

  beforeMount() {
    this._$_children = {};
    this.$event.$on('register', this.register);
    this.$event.$on('complete', this.complete);
    this.$bus.$emit('register', { name: this.name });
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
    let sceneArgs = Object.assign({
      parentReady: this._$_parentReady,
    }, this._$_hookArgs);
    this.$emit('scene', sceneArgs);
    if (this.$options.onScene) { // Lifecycle Hook
      this.$entity = await this.$options.onScene.call(this, sceneArgs);
    }
    this._$_hookArgs.entity = this.$entity;
    this._$_onParent(await this._$_parentReady);
    this.$bus.$on('change', this._$_onParent.bind(this));
    if (this._$_input) {
      this.$replace(this._$_input);
    } else {
      await this._$_init();
    }
    if (this.$options.beforeRender) { // Render Loop Hook
      this._$_beforeRender = this.$options.beforeRender.bind(this);
      this.$scene.registerBeforeRender(this._$_beforeRender);
    }
    if (this.$options.afterRender) { // Render Loop Hook
      this._$_afterRender = this.$options.afterRender.bind(this);
      this.$scene.registerAfterRender(this._$_afterRender);
    }
    this._$_entityReady.complete(this.$entity);
    this.$bus.$emit('complete', { name: this.name, entity: this.$entity });
    this._$_applyProperties();
    let children = await Promise.all(Object.values(this._$_children));
    children = children.reduce((out, { name, entity }) => {
      out[name] = entity;
      return out;
    }, {});
    this._$_hookArgs.children = children;
    this.$emit('complete', this._$_hookArgs);
  },

  beforeDestroy() {
    this._$_destroyed = true;
    if (this._$_clearObservers) {
      this._$_clearObservers();
    }
    this.$emit('dispose');
    if (isDisposable(this.$entity)) {
      this.$entity.dispose();
    }
    if (this._$_beforeRender) {
      this.$scene.unregisterBeforeRender(this._$_beforeRender);
    }
    if (this._$_afterRender) {
      this.$scene.unregisterAfterRender(this._$_afterRender);
    }
  },

  render(createElement) {
    return createElement('div', this.$slots.default);
  },
};
