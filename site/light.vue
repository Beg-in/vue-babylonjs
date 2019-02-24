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
  h4 Directional Light Demonstration
  br
  br

  Controls(:inline="true" route="/light/fullscreen")
    Example3
    h5(slot="filename") hemLight.vue
    pre(slot="pug")
      include:hl(lang="pug") ../examples/hemLight.pug
    pre(slot="html")
      include:hl:pug(pretty=true) ../examples/hemLight.pug
  h4  Hemispheric Light Demonstration
  p   The two boxes above is the same boxes from 'Directional Light Demonstration'.
  p   Notice that the color changes on all sides of the boxes with hemispheric light.
  br
  br

  Controls(:inline="true" route="/light/fullscreen")
    Example
    h5(slot="filename") light.vue
    pre(slot="pug")
      include:hl(lang="pug") ../examples/light.pug
    pre(slot="html")
      include:hl:pug(pretty=true) ../examples/light.pug
  h4 Point Light Demonstration
  p  Imagine there is a lightbulb between two spheres,
  p  then the light points to the right side of the left yellow sphere,
  p  and the light also points to left side of the right green sphere.
  br
  br

  //- SPOTLIGHT
  //- Controls(:inline="true" route="/light/fullscreen")
  //-   Example4
  //-   h5(slot="filename") spotLight.vue
  //-   pre(slot="pug")
  //-     include:hl(lang="pug") ../examples/spotLight.pug
  //-   pre(slot="html")
  //-     include:hl:pug(pretty=true) ../examples/spotLight.pug
  //- h4 Spot Light Demonstration
  //- br
  //- br

  include:markdown-it(plugins=['markdown-it-prism']) ../src/light/docs.md
</template>
