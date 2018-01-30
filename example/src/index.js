let Vue = require('vue');
let build = require('begin-build');

Vue.use(require('vue-babylonjs'));

module.exports = build({
  components: { app: require('./app/vue.pug') },
});
