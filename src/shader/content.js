import * as AbstractEntity from '../entity/abstract';

export const mixins = [AbstractEntity];

export const inject = {
  ShaderName: {
    default: null,
  },
};

export const data = function () {
  return {
    text: null,
  };
};

export const props = {
  name: {
    type: String,
    validator() {
      return value => value || this.ShaderName;
    },
  },

  content: {
    type: String,
    default: null,
  },
};

export const computed = {
  uid() {
    return this.name || this.ShaderName;
  },

  value() {
    return this.content || this.text;
  },

  shader() {
    return {
      name: this.uid,
      value: this.value,
    };
  },
};

export const watch = {
  shader() {
    this.setStore();
  },
};

export const mounted = function () {
  this.text = this.$refs.content.textContent;
  this.setStore();
};

export const render = function (createElement) {
  return createElement('div', {
    ref: 'content',
  }, this.$slots.default);
};
