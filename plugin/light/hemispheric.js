module.exports = {
  mixins: [require('./directional')],

  onScene({ name, scene, classes: { HemisphericLight }}) {
    return new HemisphericLight(name, this.directionVector3, scene);
  },
};
