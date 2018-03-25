let { Vector2, Vector3, Vector4, Color3, Color4, Matrix } = require('babylonjs');

let { crypto } = window;
let isFloat = value => Number.isFinite(value) && !Number.isNaN(value);
let isFloatArray = value => Array.isArray(value) && value.every(isFloat);
let isBetween0and1 = value => isFloat(value) && value <= 1 && value >= 0;

/* eslint-disable security/detect-unsafe-regex */
let isHexColor3 = value => /^#?([\da-f]{3}){1,2}$/i.test(value);
let isHexColor4 = value => /^#?([\da-f]{4}){1,2}$/i.test(value);
/* eslint-enable */

let vecValidator = (value, type = Vector2) => {
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

let toVec = (value, Type, transform) => {
  if (value instanceof Type) {
    return value;
  }
  if (Array.isArray(value)) {
    return Type.FromArray(value);
  }
  return new Type(...transform(value));
};
let toVec2 = value => toVec(value, Vector2, ({ x, y }) => [x, y]);
let toVec3 = value => toVec(value, Vector3, ({ x, y, z }) => [x, y, z]);
let toVec4 = value => toVec(value, Vector4, ({ w, x, y, z }) => [w, x, y, z]);

let colorValidator = (value, type = Color3) => {
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

let toColor = (value, Type, transform) => {
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
let toColor3 = value => toColor(value, Color3, ({ r, g, b }) => [r, g, b]);
let toColor4 = value => toColor(value, Color4, ({ r, g, b, a }) => [r, g, b, a]);

let toMatrix = value => {
  if (value instanceof Matrix) {
    return value;
  }
  return Matrix.FromArray(value);
};

module.exports = {
  isFloat,
  isFloatArray,
  isBetween0and1,
  vecValidator,

  id(size = 12) {
    let buf = new Uint8Array(size);
    crypto.getRandomValues(buf);
    return btoa(String.fromCharCode(...buf)).replace(/\//g, '_').replace(/\+/g, '-');
  },

  $vector(value) {
    if (vecValidator(value, Vector4)) {
      return toVec4(value);
    } else if (vecValidator(value, Vector3)) {
      return toVec3(value);
    }
    return toVec2(value);
  },

  vec2: {
    validator: vecValidator,
    default: () => Vector2.Zero(),
  },
  toVec2,

  vec3: {
    validator: value => vecValidator(value, Vector3),
    default: () => Vector3.Zero(),
  },
  toVec3,

  vec4: {
    validator: value => vecValidator(value, Vector4),
    default: () => Vector4.Zero(),
  },
  toVec4,

  $color(value) {
    if (colorValidator(value, Color4)) {
      return toColor4(value);
    }
    return toColor3(value);
  },

  color3: {
    validator: colorValidator,
    default: () => Color3.White(),
  },
  toColor3,

  color4: {
    validator: value => colorValidator(value, Color4),
    default: () => Color3.White().toColor4(),
  },
  toColor4,

  $matrix: toMatrix,

  matrix: {
    validator: value => value !== null && (isFloatArray(value) || value instanceof Matrix),
    default: () => Matrix.Zero(),
  },
  toMatrix,

  capitalize([first, ...rest]) {
    return first.toUpperCase() + rest.join('');
  },

  isPercent(value) {
    value = Number.parseFloat(value);
    return !Number.isNaN(value) && value >= 0 && value <= 100;
  },

  isDisposable(entity) {
    return entity && typeof entity.dispose === 'function';
  },
};
