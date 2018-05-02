import { Vector2, Vector3, Vector4 } from '../babylon';
import { isFloat, isFloatArray } from '../util';

export const vecValidator = (value, type = Vector2) => {
  if (value === null) {
    return false;
  }
  if (value instanceof type || isFloatArray(value)) {
    return true;
  }
  if (!isFloat(value.x) || !isFloat(value.y)) {
    return false;
  }
  if (type === Vector2) {
    return true;
  }
  if (!isFloat(value.z)) {
    return false;
  }
  if (type === Vector3) {
    return true;
  }
  return isFloat(value.w);
};

export const toVec = (value, Type, transform) => {
  if (value instanceof Type) {
    return value;
  }
  if (Array.isArray(value)) {
    return Type.FromArray(value);
  }
  return new Type(...transform(value));
};

export const vec2 = {
  validator: vecValidator,
  default: () => Vector2.Zero(),
};

export const toVec2 = value => toVec(value, Vector2, ({ x, y }) => [x, y]);

export const vec3 = {
  validator: value => vecValidator(value, Vector3),
  default: () => Vector3.Zero(),
};

export const toVec3 = value => toVec(value, Vector3, ({ x, y, z }) => [x, y, z]);

export const vec4 = {
  validator: value => vecValidator(value, Vector4),
  default: () => Vector4.Zero(),
};

export const toVec4 = value => toVec(value, Vector4, ({ w, x, y, z }) => [w, x, y, z]);

export const $vector = (...value) => {
  if (Array.isArray(value[0])) {
    [value] = value;
  }
  if (vecValidator(value, Vector4)) {
    return toVec4(value);
  } else if (vecValidator(value, Vector3)) {
    return toVec3(value);
  }
  return toVec2(value);
};
