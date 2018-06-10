import * as cannon from 'cannon';
import { setup } from '../global';
import { CannonJSPlugin as Plugin } from '../babylon';
import * as AbstractPhysics from './abstract';

export const mixins = [AbstractPhysics];

export const methods = {
  getPhysicsPlugin() {
    setup('CANNON', cannon);
    return Plugin;
  },
};
