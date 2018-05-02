import * as AbstractEntity from '../entity/abstract';
import { isFloat } from '../util';
import { vecValidator, toVec2, vec3, toVec3, vec4, toVec4 } from '../types/vector';
import { color3, toColor3, color4, toColor4 } from '../types/color';
import { matrix, toMatrix } from '../types/matrix';

export const mixins = [AbstractEntity];

export const props = {
  name: {
    type: String,
  },

  any: {
    default: null,
  },

  float: {
    validator: isFloat,
    default: null,
  },

  color: {
    validator: value => color3.validator(value) || color4.validator(value),
    default: null,
  },

  vector: {
    validator: vecValidator,
    default: null,
  },

  matrix: {
    validator: matrix.validator,
    default: null,
  },
};

export const computed = {
  value() {
    if (this.any) {
      return this.any;
    } else if (this.float !== null) {
      return this.float;
    } else if (this.color) {
      if (color4.validator(this.color)) {
        return toColor4(this.color);
      }
      return toColor3(this.color);
    } else if (this.vector) {
      if (vec4.validator(this.vector)) {
        return toVec4(this.vector);
      } else if (vec3.validator(this.vector)) {
        return toVec3(this.vector);
      }
      return toVec2(this.vector);
    } else if (this.matrix) {
      return toMatrix(this.matrix);
    }
    return null;
  },
};

export const methods = {
  set() {
    if (this._$_parent) {
      this._$_parent[this.name] = this.value;
    } else {
      this.$scene[this.name] = this.value;
    }
  },
};

export const watch = {
  value() {
    this.set();
  },
};

export const onParent = function () {
  this.set();
};
