/* eslint-disable import/first */
import Vue from 'vue';
import build from 'begin-build';
import { create, register } from 'begin-build/router';
/* eslint-disable import/no-unresolved */
import vb from 'vue-babylonjs';

Vue.use(vb);

import app from './app.vue';

let router = create({
  mode: 'hash',
  base: '/vue-babylonjs/',
});

export default build({
  router,
  components: { app },
});

import home from './home.vue';
import installation from './installation.vue';
import animation from './animation.vue';
import camera from './camera.vue';
import entity from './entity.vue';
import light from './light.vue';
import material from './material.vue';
import mesh from './mesh.vue';
import observable from './observable.vue';
import physics from './physics.vue';
import property from './property.vue';
import scene from './scene.vue';
import shader from './shader.vue';
import texture from './texture.vue';
import types from './types.vue';
import about from './about.vue';

register([
  ...Object.entries({
    home,
    installation,
    animation,
    camera,
    entity,
    light,
    material,
    mesh,
    observable,
    physics,
    property,
    scene,
    shader,
    texture,
    types,
    about,
  }).map(([name, component]) => ({
    name,
    path: `/${name}`,
    component,
  })), {
    path: '*',
    redirect: '/home',
  },
]);
