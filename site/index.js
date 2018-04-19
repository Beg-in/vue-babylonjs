let Vue = require('vue');
let build = require('begin-build');
let { create, register } = require('begin-build/router');
Vue.use(require('../'));

let app = require('./app/vue.pug');
// debugger;

let router = create({
  mode: 'hash',
  base: '/vue-babylonjs/',
});

module.exports = build({
  router,
  components: { app: app.default },
});

register([
  {
    name: 'home',
    path: '/home',
    component: require('./home/vue.pug').default,
  }, {
    // name: 'home-fullscreen',
    // path: '/home/fullscreen',
    // component: require('./home/fullscreen/vue.pug').default,
  // }, {
    name: 'animation',
    path: '/animation',
    component: require('./animation/vue.pug').default,
  }, {
    name: 'camera',
    path: '/camera',
    component: require('./camera/vue.pug').default,
  }, {
    name: 'entity',
    path: '/entity',
    component: require('./entity/vue.pug').default,
  }, {
    name: 'light',
    path: '/light',
    component: require('./light/vue.pug').default,
  }, {
    name: 'material',
    path: '/material',
    component: require('./material/vue.pug').default,
  }, {
    name: 'mesh',
    path: '/mesh',
    component: require('./mesh/vue.pug').default,
  }, {
    name: 'physics',
    path: '/physics',
    component: require('./physics/vue.pug').default,
  }, {
    name: 'scene',
    path: '/scene',
    component: require('./scene/vue.pug').default,
  }, {
    name: 'shader',
    path: '/shader',
    component: require('./shader/vue.pug').default,
  }, {
    name: 'texture',
    path: '/texture',
    component: require('./texture/vue.pug').default,
  }, {
    name: 'types',
    path: '/types',
    component: require('./types/vue.pug').default,
  }, {
    path: '*',
    redirect: '/home',
  },
]);
