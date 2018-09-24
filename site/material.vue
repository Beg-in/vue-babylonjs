<script>
import Example from '../examples/material.vue';
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
  h2 Material

  h4 Example

  Controls(:inline="true" route="/material/fullscreen")
    Example
    h5(slot="filename") material.vue
    pre(slot="pug")
      include:hl(lang="pug") ../examples/material.pug
    pre(slot="html")
      include:hl:pug(pretty=true) ../examples/material.pug

  include:markdown-it(plugins=['markdown-it-prism']) ../src/material/docs.md
</template>

