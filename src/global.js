import * as earcut from 'earcut';

export function setup(name, lib) {
  if (!window[name]) {
    window[name] = lib.default || lib;
  }
}

export function init() {
  setup('earcut', earcut);
}
