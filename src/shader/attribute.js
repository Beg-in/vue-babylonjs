import Variable from './variable';

export default {
  mixins: [Variable],

  beforeCreate() {
    this.kind = 'attribute';
  },
};
