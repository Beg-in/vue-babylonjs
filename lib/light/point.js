module.exports = {
  mixins: [require('./')],

  onScene({ name, position, scene, classes: { PointLight } }) {
    return new PointLight(name, position, scene);
  },
};
