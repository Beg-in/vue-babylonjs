import { PointLight } from '../babylon';
import AbstractLight from './';

export default {
  mixins: [AbstractLight],

  onScene({ name, position, scene }) {
    return new PointLight(name, position, scene);
  },
};
