let { Vector3, Color3 } = require('babylonjs');
let { crypto } = window;

let isFloat = value => Number.isFinite(value) && !Number.isNaN(value);
let isBetween0and1 = value => value <= 1 && value >= 0;
let isHexColor = value => /^#?([\da-fA-F]{3}){1,2}$/.test(value);

module.exports = {
  isFloat,
  isBetween0and1,
  isHexColor,

  id(size = 12) {
    let buf = new Uint8Array(size);
    crypto.getRandomValues(buf);
    return btoa(String.fromCharCode(...buf));
  },

  vec3: {
    validator: value => value != null && (
        (Array.isArray(value) && value.every(isFloat))
        || value instanceof Vector3
        || (isFloat(value.x) && isFloat(value.y) && isFloat(value.z))
    ),
    default: () => Vector3.Zero(),
  },

  color3: {
    validator: value => value != null
      && ((Array.isArray(value) && value.every(isFloat) && value.every(isBetween0and1))
        || value instanceof Color3
        || (typeof value === 'string' && isHexColor(value))
        || (isFloat(value.r) && isBetween0and1(value.r)
          && isFloat(value.g) && isBetween0and1(value.g)
          && isFloat(value.b) && isBetween0and1(value.b))
    ),
    default: () => Color3.White(),
  },

  toVec3(value) {
    if (value instanceof Vector3) {
      return value;
    }
    if (Array.isArray(value)) {
      return Vector3.FromArray(value);
    }
    let { x, y, z } = value;
    return new Vector3(x, y, z);
  },

  toColor3(value) {
    if (value instanceof Color3) {
      return value;
    }
    if (Array.isArray(value)) {
      return Color3.FromArray(value);
    }
    if (typeof value === 'string') {
      return Color3.FromHexString(value);
    }
    let { r, g, b } = value;
    return new Color3(r, g, b);
  },
};
