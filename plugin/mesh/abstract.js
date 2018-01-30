module.exports = {
  mixins: [require('../entity')],

  props: {
    options: {
      type: Object,
      default: () => ({}),
    },
  },
};
