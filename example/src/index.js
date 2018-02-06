let Vue = require('vue');
let build = require('begin-build');

Vue.use(require('vue-babylonjs'));

module.exports = build({
  components: { app: require('./app/vue.pug') },
  base: '/vue-babylonjs/',
  router: {
    routes: [{
      name: 'animation',
      path: '/animation',
      component: require('./animation/vue.pug'),
    }, {
      name: 'shader',
      path: '/shader',
      component: require('./shader/vue.pug'),
    }, {
      path: '*',
      redirect: 'animation',
    }],
  },
});
