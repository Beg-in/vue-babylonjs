import * as BABYLON from './babylon';
import { API as CORE, install as init } from './core';
import { Cannon as Physics } from './physics';
import * as mixins from './mixins';

const API = { ...CORE, BABYLON };

export default {
  install(Vue, options = {}) {
    Object.assign(Vue.prototype, API);
    Object.assign(Vue, API);
    init(Vue, { components: { ...mixins, Physics }, ...options });
  },
  ...API,
};
