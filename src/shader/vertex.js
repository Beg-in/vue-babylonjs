import Content from './content';

export default {
  mixins: [Content],

  methods: {
    setStore() {
      this.$bus.$emit('setVertex', this.shader);
    },
  },
};
