<script>
import MeshExample from '../examples/mesh.vue';
import ScaleExample from '../examples/scale.vue';
import Controls from './controls.vue';

export default {
  components: {
    MeshExample,
    ScaleExample,
    Controls,
  },
};
</script>

<template lang="pug">
article
  h2 Mesh

  h4 Example

  Controls(:inline="true" route="mesh/fullscreen")
    MeshExample
    h5(slot="filename") mesh.vue
    pre(slot="pug")
      include:hl(lang="pug") ../examples/mesh.pug
    pre(slot="html")
      include:hl:pug(pretty=true) ../examples/mesh.pug

  p All Shapes Inherit from Entity Component
  Controls(:inline="true" route="scale/fullscreen")
    ScaleExample
    h5(slot="filename") scale.vue
    pre(slot="pug")
      include:hl(lang="pug") ../examples/scale.pug
    pre(slot="html")
      include:hl:pug(pretty=true) ../examples/scale.pug

  include:markdown-it(plugins=['markdown-it-prism']) ../src/mesh/docs.md
</template>
