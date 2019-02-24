<script>
import Example from '../examples/physics.vue';
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
  h2 Physics

  h4 Example

  Controls(:inline="true" route="/physics/fullscreen")
    Example
    h5(slot="filename") physics.vue
    pre(slot="pug")
      include:hl(lang="pug") ../examples/physics.pug
    pre(slot="html")
      include:hl:pug(pretty=true) ../examples/physics.pug
    pre(slot="script")
      include:hl(lang="javascript") ../examples/physics.js

  include:markdown-it(plugins=['markdown-it-prism']) ../src/physics/docs.md
</template>
