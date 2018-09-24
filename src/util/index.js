export const isFloat = value => Number.isFinite(value) && !Number.isNaN(value);

export const isFloatArray = value => Array.isArray(value) && value.every(isFloat);

export const isBetween0and1 = value => isFloat(value) && value <= 1 && value >= 0;

export const id = (size = 12) => {
  let buf = new Uint8Array(size);
  window.crypto.getRandomValues(buf);
  return btoa(String.fromCharCode(...buf)).replace(/\//g, '_').replace(/\+/g, '-');
};

export const capitalize = ([first, ...rest]) => first.toUpperCase() + rest.join('');

export const isPercent = value => {
  value = Number.parseFloat(value);
  return !Number.isNaN(value) && value >= 0 && value <= 100;
};

export const isDisposable = entity => entity && typeof entity.dispose === 'function';

export const createBus = function () {
  let Vue = this.constructor.super;
  return new Vue();
};

export const camelize = str => str.split('-').reduce((result, [first, ...rest]) => result + first.toUpperCase() + rest.join(''), '');

export const last = ([...arr]) => arr.pop();

export const defer = () => {
  let split;
  let promise = new Promise((...args) => {
    split = args;
  });
  let [complete, error] = split;
  Object.assign(promise, { complete, error });
  return promise;
};
