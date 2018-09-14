<script>
import Example from '../examples/shader.vue';
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
  h2 Shader

  h4 Example

  Controls(:inline="true" route="/shader/fullscreen")
    Example
    h5(slot="filename") shader.vue
    pre(slot="pug")
      include:hl(lang="pug") ../examples/shader.pug
    pre(slot="html")
      include:hl:pug(pretty=true) ../examples/shader.pug
    pre(slot="script")
      include:hl(lang="javascript") ../examples/shader.js

  include:markdown-it(plugins=['markdown-it-prism']) ../src/shader/docs.md
</template>
