module.exports = {
  mixins: [require('./variable')],

  beforeCreate() {
    this.kind = 'uniform';
  },
};
