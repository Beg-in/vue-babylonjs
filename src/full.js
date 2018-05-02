import { API as CORE, install as init } from './core';
import * as BABYLON from './babylon';
import * as mixins from './mixins';

const API = { ...CORE, BABYLON };

export default {
  install(Vue, options = {}) {
    Object.assign(Vue.prototype, API);
    Object.assign(Vue, API);
    init(Vue, { components: mixins, ...options });
  },
  ...API,
};
