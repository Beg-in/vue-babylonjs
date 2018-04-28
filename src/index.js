import * as mixins from './mixins';
import { $vector } from './types/vector';
import { $color } from './types/color';
import { $matrix } from './types/matrix';

const API = { $vector, $color, $matrix };

export const init = (Vue, { components = {} } = {}) => {
  Object.assign(Vue.prototype, API);
  Object.assign(Vue, API);
  Object.entries(components).forEach(entry => Vue.component(...entry));
};

export const core = { install: init, ...API };

export const install = (Vue, options) => {
  init(Vue, { components: mixins, ...options });
};

export default { install, ...API };

export * from './mixins';
export { $vector, $color, $matrix };
