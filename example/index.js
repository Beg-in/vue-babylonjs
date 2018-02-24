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
    name: 'animation',
    path: '/animation',
    component: require('./animation/vue.pug'),
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
    redirect: 'animation',
  },
]);
