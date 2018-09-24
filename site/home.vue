<script>
import Example from '../examples/logo.vue';
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
  Controls(:inline="true" route="/home/fullscreen")
    Example
    h5(slot="filename") logo.vue
    pre(slot="pug")
      include:hl(lang="pug") ../examples/logo.pug
    pre(slot="html")
      include:hl:pug(pretty=true) ../examples/logo.pug
    h5(slot="filename2") side.vue
    pre(slot="pug2")
      include:hl(lang="pug") ../examples/side.pug
    pre(slot="html2")
      include:hl:pug(pretty=true) ../examples/side.pug

  include:markdown-it(plugins=['markdown-it-prism'] html=true) ../src/docs.md
</template>
