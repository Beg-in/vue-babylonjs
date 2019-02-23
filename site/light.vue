<script>
import Example from '../examples/light.vue';
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
  h2 Light

  h4 Example

  Controls(:inline="true" route="/light/fullscreen")
    Example
    h5(slot="filename") light.vue
    pre(slot="pug")
      include:hl(lang="pug") ../examples/light.pug
    pre(slot="html")
      include:hl:pug(pretty=true) ../examples/light.pug

  include:markdown-it(plugins=['markdown-it-prism']) ../src/light/docs.md
</template>
