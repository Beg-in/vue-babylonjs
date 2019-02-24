<script>
import Example from '../examples/mesh.vue';
import Example2 from '../examples/scale.vue';
import Controls from './controls.vue';

export default {
  components: {
    Example,
    Example2,
    Controls,
  },
};
</script>

<template lang="pug">
article
  h2 Mesh
  
  h4 Example

  h6 Various Meshes
  Controls(:inline="true" route="mesh/fullscreen")
    Example
    h5(slot="filename") mesh.vue
    pre(slot="pug")
      include:hl(lang="pug") ../examples/mesh.pug
    pre(slot="html")
      include:hl:pug(pretty=true) ../examples/mesh.pug
      
  h6 All Shapes Inherit from Entity Component
  Controls(:inline="true" route="scale/fullscreen")
    Example2
    h5(slot="filename") scale.vue
    pre(slot="pug")
      include:hl(lang="pug") ../examples/scale.pug
    pre(slot="html")
      include:hl:pug(pretty=true) ../examples/scale.pug  


  include:markdown-it(plugins=['markdown-it-prism']) ../src/mesh/docs.md
</template>
