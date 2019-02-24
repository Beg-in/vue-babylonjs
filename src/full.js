import * as BABYLON from './babylon';
import { install as init } from './core';
import { Cannon as Physics } from './physics';
import * as mixins from './mixins';

export function install(Vue, options = {}) {
  Object.assign(Vue.prototype, { BABYLON });
  Object.assign(Vue, { BABYLON });
  init(Vue, Object.assign({ components: Object.assign({ Physics }, mixins) }, options));
}

export { BABYLON };
export * from './api';
