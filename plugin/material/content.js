module.exports = {
  inject: {
    bus: 'ShaderBus',
    ShaderName: {
      default: null,
    }
  },

  props: {
    name: {
      type: String,
      validator(value) {
        return value || this.ShaderName;
      },
    },

    value: {
      type: String,
      default: null,
    },
  },

  computed: {
    uid() {
      return this.name || this.ShaderName;
    },

    content() {
      if (this.value) {
        return this.value;
      }
      return this.$el.text;
    },

    shader() {
      return {
        name: this.uid,
        value: this.content,
      };
    },
  },

  watch: {
    shader() {
      this.setStore();
    },
  },
};
