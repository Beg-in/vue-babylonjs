import * as cannon from 'cannon';
import { CannonJSPlugin as Plugin } from '../babylon';
import * as AbstractPhysics from './abstract';

export const mixins = [AbstractPhysics];

export const methods = {
  getPhysicsPlugin() {
    if (!window.CANNON) {
      window.CANNON = cannon;
    }
    return Plugin;
  },
};
