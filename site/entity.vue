<script>
import Example from '../examples/entity.vue';
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
  h2 Entity

  h4 Example

  Controls(:inline="true" route="/entity/fullscreen")
    Example
    h5(slot="filename") entity.vue
    pre(slot="pug")
      include:hl(lang="pug") ../examples/entity.pug
    pre(slot="html")
      include:hl:pug(pretty=true) ../examples/entity.pug

  include:markdown-it(plugins=['markdown-it-prism']) ../src/entity/docs.md
</template>
