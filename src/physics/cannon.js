import '../../vendor/cannon';
import { CannonJSPlugin as Plugin } from '../babylon';
import AbstractPhysics from './abstract';

export default {
  mixins: [AbstractPhysics],

  methods: {
    getPhysicsPlugin() {
      return Plugin;
    },
  },
};
