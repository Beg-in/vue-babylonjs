import { Observable } from '../babylon';
import { camelize, last } from '../util';

export function registerObservers(scene) {
  let observers = Object.keys(this.$listeners).map(key => {
    let name = key;
    let [first, ...rest] = name;
    if (first === '~') {
      target = 'addOnce';
      name = rest.join('');
    }
    name = camelize(name);
    let target = 'add';
    key = key.replace('~', '');
    if (last(name) === '$') {
      name = [...name];
      name.pop();
      name = name.join('');
      name = `on${name}Observable`;
    } else {
      [first, ...rest] = name;
      name = first.toLowerCase() + rest.join('');
    }
    let observable = null;
    if (this.$entity && this.$entity[name] instanceof Observable) {
      observable = this.$entity[name]
    } else if (scene && scene[name] instanceof Observable) {
      observable = scene[name];
    } else {
      console.warn(`Could not find Observable with name ${name}`)
    }
    let observer = null;
    if (observable) {
      observer = observable[target](() => this.$emit(key, { observable, observer }));
    }
    if (observer) {
      return () => observable.remove(observer);
    }
    return () => {};
  });
  return () => observers.forEach(fn => fn());
}
