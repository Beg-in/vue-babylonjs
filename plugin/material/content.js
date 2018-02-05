module.exports = {
  mixins: [require('../entity/abstract')],

  inject: {
    ShaderName: {
      default: null,
    },
  },

  data() {
    return {
      text: null,
    };
  },

  props: {
    name: {
      type: String,
      validator(value) {
        return value || this.ShaderName;
      },
    },

    content: {
      type: String,
      default: null,
    },
  },

  computed: {
    uid() {
      return this.name || this.ShaderName;
    },

    value() {
      return this.content || this.text;
    },

    shader() {
      return {
        name: this.uid,
        value: this.value,
      };
    },
  },

  watch: {
    shader() {
      this.setStore();
    },
  },

  mounted() {
    this.text = this.$refs.content.textContent;
    this.setStore();
  },

  render(createElement) {
    return createElement('div', {
      ref: 'content',
    }, this.$slots.default);
  },
};
