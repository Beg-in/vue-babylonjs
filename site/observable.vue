<script>
import Example from '../examples/observable.vue';
import Controls from './controls.vue';

export default {
  components: {
    Example,
    Controls,
  },
};
</script>

<template lang="pug">
article
  h2 Observable

  h4 Example

  Controls(:inline="true" route="/observable/fullscreen")
    Example
    h5(slot="filename") observable.vue
    pre(slot="pug")
      include:hl(lang="pug") ../examples/observable.pug
    pre(slot="html")
      include:hl:pug(pretty=true) ../examples/observable.pug
    pre(slot="script")
      include:hl(lang="javascript") ../examples/observable.js

  include:markdown-it(plugins=['markdown-it-prism']) ../src/observable/docs.md
</template>
