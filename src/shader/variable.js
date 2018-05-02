import * as AbstractEntity from '../entity/abstract';
import { isFloat, isFloatArray } from '../util';
import { vecValidator, toVec2, vec3, toVec3, vec4, toVec4 } from '../types/vector';
import { color3, toColor3, color4, toColor4 } from '../types/color';
import { matrix, toMatrix } from '../types/matrix';

export const mixins = [AbstractEntity];

export const props = {
  variable: {
    type: String,
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

  matrix2x2: {
    type: Float32Array,
    default: null,
  },

  matrix3x3: {
    type: Float32Array,
    default: null,
  },

  array: {
    validator: isFloatArray,
    default: null,
  },
};

export const computed = {
  details() {
    let type;
    let value;
    if (this.float !== null) {
      value = this.float;
      type = 'Float';
      if (isFloatArray(this.float)) {
        type = 'Floats';
      }
    } else if (this.color) {
      if (color4.validator(this.color)) {
        value = toColor4(this.color);
        type = 'Color4';
      } else {
        value = toColor3(this.color);
        type = 'Color3';
      }
    } else if (this.vector) {
      if (vec4.validator(this.vector)) {
        value = toVec4(this.vector);
        type = 'Vector4';
      } else if (vec3.validator(this.vector)) {
        value = toVec3(this.vector);
        type = 'Vector3';
      } else {
        value = toVec2(this.vector);
        type = 'Vector2';
      }
    } else if (this.matrix) {
      value = toMatrix(this.matrix);
      type = 'Matrix';
    } else if (this.matrix2x2) {
      value = this.matrix2x2;
      type = 'Matrix2x2';
    } else if (this.matrix3x3) {
      value = this.matrix3x3;
      type = 'Matrix3x3';
    } else if (this.array) {
      value = this.array;
      type = 'Array2';
      if (value.length > 2) {
        type = 'Array3';
      }
    }
    return {
      kind: this.kind,
      variable: this.variable,
      type,
      value,
    };
  },
};

export const methods = {
  register() {
    this.$bus.$emit('registerVariable', this.details);
  },
  set() {
    this.$bus.$emit('setVariable', this.details);
  },
  dispose() {
    this.$bus.$emit('disposeVariable', this.details);
  },
};

export const watch = {
  details() {
    this.set();
  },
};

export const onScene = function () {
  return this.details;
};

export const onParent = function () {
  this.register();
  this.set();
};

export const beforeDistroy = function () {
  this.dispose();
};
