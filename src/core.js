import * as earcut from 'earcut';
import * as api from './api';

export const install = (Vue, { components = {} } = {}) => {
  if (!window.earcut) {
    window.earcut = earcut.default || earcut;
  }
  Object.assign(Vue.prototype, api);
  Object.assign(Vue, api);
  Object.entries(components).forEach(entry => Vue.component(...entry));
};

export * from './api';
