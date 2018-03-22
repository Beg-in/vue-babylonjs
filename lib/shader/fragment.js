module.exports = {
  mixins: [require('./content')],

  methods: {
    setStore() {
      this.$bus.$emit('setFragment', this.shader);
    },
  },
};
