module.exports = {
  mixins: [require('./content')]

  methods: {
    setStore() {
      this.bus.$emit('setVertex', this.shader);
    },
  },
};
