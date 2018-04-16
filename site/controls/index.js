module.exports = {
  components: {
    VueFile: require('./vuefile/vue.pug').default,
  },

  props: {
    inline: {
      type: Boolean,
      default: false,
    },

    route: {
      type: String,
      default: '/',
    },
  },

  data() {
    return {
      isPug: false, // TODO: change to store variable to make global
      isCodeVisible: false,
    };
  },
};
