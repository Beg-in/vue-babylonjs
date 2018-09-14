<script>
import Example from '../examples/property.vue';
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
  h2 Property

  h4 Example

  Controls(:inline="true" route="/property/fullscreen")
    Example
    h5(slot="filename") properties.vue
    pre(slot="pug")
      include:hl(lang="pug") ../examples/property.pug
    pre(slot="html")
      include:hl:pug(pretty=true) ../examples/property.pug

  include:markdown-it(plugins=['markdown-it-prism']) ../src/property/docs.md
</template>
