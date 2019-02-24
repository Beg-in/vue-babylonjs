import cannon from 'cannon';
import { CannonJSPlugin as Plugin } from '../babylon';
import AbstractPhysics from './abstract';

export default {
  mixins: [AbstractPhysics],

  methods: {
    getPhysicsPlugin() {
      if (!window.CANNON) {
        window.CANNON = cannon;
      }
      return Plugin;
    },
  },
};
