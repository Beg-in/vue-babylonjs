import * as api from './api';
import { init } from './global';

export const install = (Vue, { components = {} } = {}) => {
  init();
  Object.assign(Vue.prototype, api);
  Object.assign(Vue, api);
  Object.entries(components).forEach(entry => Vue.component(...entry));
};

export * from './api';
