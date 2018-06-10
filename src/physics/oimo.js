import * as oimo from 'oimo';
import { setup } from '../global';
import { OimoJSPlugin as Plugin } from '../babylon';
import * as AbstractPhysics from './abstract';

export const mixins = [AbstractPhysics];

export const methods = {
  getPhysicsPlugin() {
    setup('OIMO', oimo);
    return Plugin;
  },
};
