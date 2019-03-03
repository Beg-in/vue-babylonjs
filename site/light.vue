<script>
import Controls from './controls.vue';
import PointExample from '../examples/light/point.vue';
import DirectionalExample from '../examples/light/directional.vue';
import HemisphericExample from '../examples/light/hemispheric.vue';
import SpotExample from '../examples/light/spot.vue';

export default {
  components: {
    Controls,
    PointExample,
    DirectionalExample,
    HemisphericExample,
    SpotExample,
  },
};
</script>

<template lang="pug">
article
  h2 Light

  h4 Directional Light Demonstration
  Controls(:inline="true" route="/light/fullscreen")
    DirectionalExample
    h5(slot="filename") directional.vue
    pre(slot="pug")
      include:hl(lang="pug") ../examples/light/directional.pug
    pre(slot="html")
      include:hl:pug(pretty=true) ../examples/light/directional.pug

  h4  Hemispheric Light Demonstration
  p   The two boxes below are the same boxes from 'Directional Light Demonstration'.
  p   Notice that the color changes on all sides of the boxes with hemispheric light.
  Controls(:inline="true" route="/light/fullscreen")
    HemisphericExample
    h5(slot="filename") hemispheric.vue
    pre(slot="pug")
      include:hl(lang="pug") ../examples/light/hemispheric.pug
    pre(slot="html")
      include:hl:pug(pretty=true) ../examples/light/hemispheric.pug

  h4 Point Light Demonstration
  p  Imagine there is a lightbulb between two spheres,
  p  then the light points to the right side of the left yellow sphere,
  p  and the light also points to left side of the right green sphere.
  Controls(:inline="true" route="/light/fullscreen")
    PointExample
    h5(slot="filename") point.vue
    pre(slot="pug")
      include:hl(lang="pug") ../examples/light/point.pug
    pre(slot="html")
      include:hl:pug(pretty=true) ../examples/light/point.pug

  //- SPOTLIGHT
  //- h4 Spot Light Demonstration
  //- br
  //- br
  //- Controls(:inline="true" route="/light/fullscreen")
  //-   SpotExample
  //-   h5(slot="filename") spot.vue
  //-   pre(slot="pug")
  //-     include:hl(lang="pug") ../examples/light/spot.pug
  //-   pre(slot="html")
  //-     include:hl:pug(pretty=true) ../examples/light/spot.pug

  include:markdown-it(plugins=['markdown-it-prism']) ../src/light/docs.md
</template>
