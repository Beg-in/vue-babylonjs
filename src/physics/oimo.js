import 'oimo';
import { OimoJSPlugin } from '../babylon';
import * as AbstractPhysics from './abstract';

export const mixins = [AbstractPhysics];

export const methods = {
  initPhysics() {
    this.$scene.enablePhysics(null, new OimoJSPlugin());
  },
};
