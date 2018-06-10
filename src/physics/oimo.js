import * as oimo from 'oimo';
import { OimoJSPlugin as Plugin } from '../babylon';
import * as AbstractPhysics from './abstract';

export const mixins = [AbstractPhysics];

export const methods = {
  getPhysicsPlugin() {
    if (!window.OIMO) {
      window.OIMO = oimo;
    }
    return Plugin;
  },
};
