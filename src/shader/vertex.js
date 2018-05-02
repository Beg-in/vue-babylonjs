import * as Content from './content';

export const mixins = [Content];

export const methods = {
  setStore() {
    this.$bus.$emit('setVertex', this.shader);
  },
};
