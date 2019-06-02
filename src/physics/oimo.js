import * as oimo from 'oimo';
import { OimoJSPlugin as Plugin } from '@babylonjs/core';
import AbstractPhysics from './abstract';

export default {
  mixins: [AbstractPhysics],

  methods: {
    getPhysicsPlugin() {
      return new Plugin(undefined, oimo);
    },
  },
};
