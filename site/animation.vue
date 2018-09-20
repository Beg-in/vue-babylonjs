<script>
import Example from '../examples/animation.vue';
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
  h2 Animations

  h4 Example

  Controls(:inline="true" route="/animations/fullscreen")
    Example
    h5(slot="filename") animation.vue
    pre(slot="pug")
      include:hl(lang="pug") ../examples/animation.pug
    pre(slot="html")
      include:hl:pug(pretty=true) ../examples/animation.pug
    pre(slot="script")
      include:hl(lang="javascript") ../examples/animation.js

  include:markdown-it(plugins=['markdown-it-prism']) ../src/animation/docs.md
</template>
