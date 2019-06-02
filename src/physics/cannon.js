import cannon from 'cannon';
import { CannonJSPlugin as Plugin } from '@babylonjs/core';
import AbstractPhysics from './abstract';

export default {
  mixins: [AbstractPhysics],

  methods: {
    getPhysicsPlugin() {
      return new Plugin(undefined, undefined, cannon);
    },
  },
};
