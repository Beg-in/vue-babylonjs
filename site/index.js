/* eslint-disable import/no-unresolved, import/no-webpack-loader-syntax, import/first */
import 'file-loader?name=CNAME!./CNAME';
import Vue from 'vue';
import build from 'begin-build';
import { create, register } from 'begin-build/router';
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
import asset from './asset.vue';

register([
  ...Object.entries({
    home,
    installation,
    asset,
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
