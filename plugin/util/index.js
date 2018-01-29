let { Vector3 } = require('babylonjs');
let { crypto } = window;

let isFloat = value => Number.isFinite(n) && !Number.isNaN(n);

module.exports = {
  isFloat,

  id(size = 12) {
    let buf = new Uint8Array(size);
    crypto.getRandomValues(buf);
    return btoa(String.fromCharCode(...buf));
  },

  vec3: {
    validator: value => value != null && (
        (Array.isArray(value) && Array.every(isFloat))
        || value instanceof Vector3
        || (isFloat(value.x) && isFloat(value.y) && isFloat(value.z))
    ),
    default: () => Vector3.Zero(),
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
};
