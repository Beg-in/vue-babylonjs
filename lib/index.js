import * as mixins from './mixins';
import { $vector } from './types/vector';
import { $color } from './types/color';
import { $matrix } from './types/matrix';

const API = { $vector, $color, $matrix };

export const install = (Vue, { components = {} } = {}) => {
  Object.assign(Vue.prototype, API);
  Object.assign(Vue, API);
  Object.entries(components).forEach(entry => Vue.component(...entry));
};

export const core = Object.assign({ install }, API);

export default Object.assign({
  install(Vue, options) {
    install(Vue, Object.assign({ components: mixins }, options));
  },
}, API);

export * from './mixins';
export { $vector, $color, $matrix };
