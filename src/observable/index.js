import { Observable } from '../babylon';
import { camelize, last } from '../util';

export function registerObservers(scene) {
  let observers = Object.keys(this.$listeners).reduce((out, key) => {
    let name = key;
    let [first, ...rest] = name;
    let target = 'add';
    if (first === '~') {
      target = 'addOnce';
      name = rest.join('');
    }
    name = camelize(name);
    key = key.replace('~', '');
    if (last(name) === '$') {
      name = [...name];
      name.pop();
      name = name.join('');
      name = `on${name}Observable`;
    } else {
      return out;
    }
    let observable = null;
    if (this.$entity && this.$entity[name] instanceof Observable) {
      observable = this.$entity[name];
    } else if (scene && scene[name] instanceof Observable) {
      observable = scene[name];
    } else {
      console.warn(`Could not find Observable with name ${name}`)
      return out;
    }
    let observer = null;
    if (observable) {
      observer = observable[target](() => this.$emit(key, { observable, observer }));
    }
    if (observer) {
      out.push(() => observable.remove(observer));
    }
    return out;
  }, []);
  return () => observers.forEach(fn => fn());
}
