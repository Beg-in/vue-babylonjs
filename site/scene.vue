<script>
import Example from '../examples/scene.vue';
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
  h2 Scene

  h4 Example

  Controls(:inline="true" route="/scene/fullscreen")
    Example
    h5(slot="filename") scene.vue
    pre(slot="pug")
      include:hl(lang="pug") ../examples/scene.pug
    pre(slot="html")
      include:hl:pug(pretty=true) ../examples/scene.pug

  include:markdown-it(plugins=['markdown-it-prism']) ../src/scene/docs.md
</template>
