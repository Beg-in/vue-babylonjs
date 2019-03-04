<script>
import Example from '../examples/texture.vue';
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
  h2 Texture

  h4 Example

  Controls(:inline="true" route="/animations/fullscreen")
    Example
    h5(slot="filename") texture.vue
    pre(slot="pug")
      include:hl(lang="pug") ../examples/texture.pug
    pre(slot="html")
      include:hl:pug(pretty=true) ../examples/texture.pug

  include:markdown-it(plugins=['markdown-it-prism']) ../src/texture/docs.md
</template>
