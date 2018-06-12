import Content from './content';

export default {
  mixins: [Content],

  methods: {
    setStore() {
      this.$bus.$emit('setFragment', this.shader);
    },
  },
};
