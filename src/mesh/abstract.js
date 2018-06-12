import Entity from '../entity';

export default {
  mixins: [Entity],

  props: {
    options: {
      type: Object,
      default: () => ({}),
    },
  },
};
