import { $vector } from './types/vector';
import { $color } from './types/color';
import { $matrix } from './types/matrix';

export const API = { $vector, $color, $matrix };

export const install = (Vue, { components = {} } = {}) => {
  Object.assign(Vue.prototype, API);
  Object.assign(Vue, API);
  Object.entries(components).forEach(entry => Vue.component(...entry));
};

export { $vector, $color, $matrix };
