<script>
import Example from '../examples/light.vue';
import Controls from './controls.vue';
import Example2 from '../examples/directionalLight.vue';
import Example3 from '../examples/hemLight.vue';
import Example4 from '../examples/spotLight.vue';

export default {
  components: {
    Example,
    Controls,
    Example2,
    Example3,
    Example4,
  },
};
</script>

<template lang="pug">
article
  h2 Light

  h4 Example

  

  Controls(:inline="true" route="/light/fullscreen")
    Example2
    h5(slot="filename") directionalLight.vue
    pre(slot="pug")
      include:hl(lang="pug") ../examples/directionalLight.pug
    pre(slot="html")
      include:hl:pug(pretty=true) ../examples/directionalLight.pug
  h3 Directional Light Demonstration

  

  Controls(:inline="true" route="/light/fullscreen")
    Example3
    h5(slot="filename") hemLight.vue
    pre(slot="pug")
      include:hl(lang="pug") ../examples/hemLight.pug
    pre(slot="html")
      include:hl:pug(pretty=true) ../examples/hemLight.pug
  h3  Hemispheric Light Demonstration


  

  Controls(:inline="true" route="/light/fullscreen")
    Example
    h5(slot="filename") light.vue
    pre(slot="pug")
      include:hl(lang="pug") ../examples/light.pug
    pre(slot="html")
      include:hl:pug(pretty=true) ../examples/light.pug
    pre(slot="script")
      include:hl(lang="javascript") ../examples/animation.js
  h3 Point Light Demonstration

  

  Controls(:inline="true" route="/light/fullscreen")
    Example4
    h5(slot="filename") spotLight.vue
    pre(slot="pug")
      include:hl(lang="pug") ../examples/spotLight.pug
    pre(slot="html")
      include:hl:pug(pretty=true) ../examples/spotLight.pug
    pre(slot="script")
      include:hl(lang="javascript") ../examples/animation.js
  h3 Spot Light Demonstration        

  include:markdown-it(plugins=['markdown-it-prism']) ../src/light/docs.md
</template>
