import '../../vendor/oimo';
import { OimoJSPlugin as Plugin } from '../babylon';
import AbstractPhysics from './abstract';

export default {
  mixins: [AbstractPhysics],

  methods: {
    getPhysicsPlugin() {
      return Plugin;
    },
  },
};
