import * as AbstractEntity from '../entity/abstract';

export const mixins = [AbstractEntity];

export const props = {
  options: {
    type: Object,
    default: () => ({}),
  },
};
