import { id, isDisposable, createBus } from '../util';

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
    prop: '_$_model',
    event: 'change',
  },

  props: {
    _$_model: {
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
      this.$emit('change', this.$entity);
    },

    async _$_onParent(parent) {
      this._$_parent = parent;
      this._$_hookArgs.parent = this._$_parent;
      if (this.$options.onParent) { // Lifecycle Hook
        await this.$options.onParent.call(this, this._$_hookArgs);
      }
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
      this.$event.$emit('change', this.$entity);
    },
  },

  watch: {
    properties: {
      handler() {
        this._$_applyProperties();
      },
      deep: true,
    },

    _$_model() {
      if (this.$entity !== this._$_model) {
        this.$replace(this._$_model);
      }
    },
  },

  beforeCreate() {
    this.$event = createBus.call(this);
    this._$_entityReady = new Promise(resolve => {
      this._$_resolveEntity = resolve;
    });
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

  async mounted() {
    if (this.$options.beforeScene) { // Lifecycle Hook
      this.$entity = await this.$options.beforeScene.call(this, {
        sceneReady: this._$_sceneReady,
        parentReady: this._$_parentReady,
        ...this._$_hookArgs,
      });
    }
    this.$scene = await this._$_sceneReady;
    this._$_hookArgs.scene = this.$scene;
    if (this.$options.onScene) { // Lifecycle Hook
      this.$entity = await this.$options.onScene.call(this, {
        parentReady: this._$_parentReady,
        ...this._$_hookArgs,
      });
    }
    this._$_hookArgs.entity = this.$entity;
    this._$_onParent(await this._$_parentReady);
    this.$bus.$on('change', this._$_onParent.bind(this));
    if (this._$_model) {
      this.$replace(this._$_model);
    } else {
      await this._$_init();
    }
    this._$_resolveEntity(this.$entity);
    if (this.$options.beforeRender) { // Render Loop Hook
      this._$_beforeRender = this.$options.beforeRender.bind(this);
      this.$scene.registerBeforeRender(this._$_beforeRender);
    }
    if (this.$options.afterRender) { // Render Loop Hook
      this._$_afterRender = this.$options.afterRender.bind(this);
      this.$scene.registerAfterRender(this._$_afterRender);
    }
    this._$_applyProperties();
  },

  beforeDestroy() {
    this._$_destroyed = true;
    if (this._$_clearObservers) {
      this._$_clearObservers();
    }
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
