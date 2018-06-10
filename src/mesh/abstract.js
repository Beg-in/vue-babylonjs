import * as Entity from '../entity';

export const mixins = [Entity];

export const props = {
  options: {
    type: Object,
    default: () => ({}),
  },
};
