let Vue = require('vue');
let build = require('begin-build');
let { create, register } = require('begin-build/router');
Vue.use(require('../'));

let router = create({
  base: '/vue-babylonjs/',
});

module.exports = build({
  router,
  components: { app: require('./app/vue.pug') },
});

register([
  {
    name: 'home',
    path: '/home',
    component: require('./home/vue.pug'),
  }, {
    name: 'scene',
    path: '/scene',
    component: require('./scene/vue.pug'),
  }, {
    name: 'animation',
    path: '/animation',
    component: require('./animation/vue.pug'),
  }, {
    name: 'material',
    path: '/material',
    component: require('./material/vue.pug'),
  }, {
    name: 'shader',
    path: '/shader',
    component: require('./shader/vue.pug'),
  }, {
    name: 'properties',
    path: '/properties',
    component: require('./properties/vue.pug'),
  }, {
    path: '*',
    redirect: '/home',
  },
]);
