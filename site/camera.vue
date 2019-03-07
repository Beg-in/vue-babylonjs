<script>
import Example from '../examples/camera/follow.vue';
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
  h2 Camera

  h4 Follow Camera Example

  Controls(:inline="true" route="/animations/fullscreen")
    Example
    h5(slot="filename") follow.vue
    pre(slot="pug")
      include:hl(lang="pug") ../examples/camera/follow.pug
    pre(slot="html")
      include:hl:pug(pretty=true) ../examples/camera/follow.pug
    pre(slot="script")
      include:hl(lang="javascript") ../examples/camera/follow.js

  include:markdown-it(plugins=['markdown-it-prism']) ../src/camera/docs.md
</template>
