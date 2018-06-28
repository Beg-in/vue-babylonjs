<script>
import Example from '../examples/asset.vue';
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
    h2 Asset

    h4 Example

    Controls(:inline="true" route="/asset/fullscreen")
      Example
      h5(slot="filename") asset.vue
      pre(slot="pug")
        include:hl(lang="pug") ../examples/asset.pug
      pre(slot="html")
        include:hl:pug(pretty=true) ../examples/asset.pug

    include:markdown-it(plugins=['markdown-it-prism']) ../src/asset/docs.md
</template>
