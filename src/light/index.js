import { color3, toColor3 } from '../types/color';
import * as Entity from '../entity';

export const mixins = [Entity];

export const props = {
  diffuse: color3,
  specular: color3,
};

export const computed = {
  diffuseColor3() {
    return toColor3(this.diffuse);
  },

  specularColor3() {
    return toColor3(this.specular);
  },
};

export const watch = {
  diffuseColor3() {
    this.setDiffuse();
  },

  specularColor3() {
    this.setSpecular();
  },
};

export const methods = {
  setDiffuse() {
    this.$entity.diffuse.copyFrom(this.diffuseColor3);
  },

  setSpecular() {
    this.$entity.specular.copyFrom(this.specularColor3);
  },
};

export const onEntity = function () {
  this.setDiffuse();
  this.setSpecular();
};
