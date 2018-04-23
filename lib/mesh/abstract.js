import AbstractEntity from '../entity/abstract';

export default {
  mixins: [AbstractEntity],

  props: {
    options: {
      type: Object,
      default: () => ({}),
    },
  },
};
