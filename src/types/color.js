import { Color3, Color4 } from '../babylon';
import { isFloatArray, isBetween0and1 } from '../util';

/* eslint-disable security/detect-unsafe-regex */
export const isHexColor3 = value => /^#?([\da-f]{3}){1,2}$/i.test(value);
export const isHexColor4 = value => /^#?([\da-f]{4}){1,2}$/i.test(value);
/* eslint-enable */

export const colorValidator = (value, type = Color3) => {
  if (value === null) {
    return false;
  }
  if (value instanceof type || (isFloatArray(value) && value.every(isBetween0and1))) {
    return true;
  }
  if (typeof value === 'string') {
    if (type === Color3) {
      return isHexColor3(value);
    }
    return isHexColor4(value);
  }
  if (!isBetween0and1(value.r) || !isBetween0and1(value.g) || !isBetween0and1(value.b)) {
    return false;
  }
  if (type === Color3) {
    return true;
  }
  return isBetween0and1(value.a);
};

export const toColor = (value, Type, transform) => {
  if (value instanceof Type) {
    return value;
  }
  if (Array.isArray(value)) {
    return Type.FromArray(value);
  }
  if (typeof value === 'string') {
    value = value.replace('#', '');
    if (value.length < 6) {
      value = [...value].reduce((o, a) => o.concat([a, a]), []).join('');
    }
    return Type.FromHexString(`#${value.toUpperCase()}`);
  }
  return new Type(...transform(value));
};

export const color3 = {
  validator: colorValidator,
  default: () => Color3.White(),
};

export const toColor3 = value => toColor(value, Color3, ({ r, g, b }) => [r, g, b]);

export const color4 = {
  validator: value => colorValidator(value, Color4),
  default: () => Color3.White().toColor4(),
};

export const toColor4 = value => toColor(value, Color4, ({ r, g, b, a }) => [r, g, b, a]);

export const $color = (...value) => {
  if (Array.isArray(value[0])) {
    [value] = value;
  }
  if (colorValidator(value, Color4)) {
    return toColor4(value);
  }
  return toColor3(value);
};
