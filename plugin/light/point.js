module.exports = {
  mixins: [require('./abstract')],

  onScene({ name, position, scene, classes: { PointLight } }) {
    return new PointLight(name, position, scene);
  },
};
