import * as AbstractEntity from '../entity/abstract';
import { isFloat, isPercent } from '../util';
import { vec3 } from '../types/vector';

const { validator } = vec3;

export const mixins = [AbstractEntity];

export const props = {
  frame: {
    validator: value => isFloat(value) || isPercent(value),
    default: 0,
  },

  value: {
    default: 0,
  },

  inTangent: {
    validator,
    default: null,
  },

  outTangent: {
    validator,
    default: null,
  },
};

export const computed = {
  key() {
    return {
      frame: this.frame,
      value: this.value,
      inTangent: this.inTangent,
      outTangent: this.outTangent,
    };
  },
};

export const methods = {
  setKey() {
    this.$bus.$emit('setKey', {
      name: this.name,
      key: this.key,
    });
  },

  dispose() {
    this.$bus.$emit('disposeKey', this.name);
  },
};

export const watch = {
  key() {
    this.setKey();
  },
};

export const created = function () {
  this.setKey();
};

export const beforeDestroy = function () {
  this.dispose();
};
