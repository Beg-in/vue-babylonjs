<template lang="pug">
article
  h2 Installation
  p
    h5 Notes:
    ul
      li Both an NPM package and CDN options are available for installation.
      li It is recommended to use the NPM package with a build tool such as #[external(href="https://webpack.js.org/") Webpack] to optimize your usage of the plugin.
      li All dependencies (Babylon.js, Earcut, Cannon, and Oimo) are included with the package (minus Vue).
      li The global variable exposed by the library is #[code VueBaybylonjs] when using the CDN or UMD package without a module system.
  h5 From NPM
  pre
    :hl(lang="bash")
      $ npm install vue-babylonjs
  p #[strong or] (using Yarn):
  pre
    :hl(lang="bash")
      $ yarn add vue-babylonjs
  p Use the library like this in your script:
  pre
    :hl(lang="js")
      let Vue = require('vue');
      Vue.use(require('vue-babylonjs'));
  p #[strong or] (Using ES Modules):
  pre
    :hl(lang="js")
      import Vue from 'vue';
      import vb from 'vue-babylonjs';
      Vue.use(vb);
  ul
    li The main file provided by this NPM package is a UMD module that will export properly for CommonJS, Web, or AMD environments.
    li A module is also provided for ES Module support for the tree-shaking use-case.
    li See more in the Usage section below for information on how to leverage tree-shaking with ES Modules.

  p
    external(href="https://glitch.com/edit/#!/vue-babylonjs-starter") See the complete starter example on Glitch

  h5 Via CDN
  p Get the latest version of Vue-BabylonJS from #[external(href="https://www.jsdelivr.com", title="jsDelivr cdn") jsDelivr]:
  pre
    code!= hl(`<script src="https://cdn.jsdelivr.net/npm/vue-babylonjs@${properties.public.version}"></script>`)
  p
  p When the script has loaded you can use the library in a script like this:
  pre
    :hl(lang="js")
      Vue.use(window.VueBabylonjs);
  ul
    li The CDN version includes all of the Components available in this library.
    li This includes a Physics component that only uses Cannon.js and omits Oimo.js.

  h2 Usage
  h5 Basics
  p All installation methods can be initialized with the following Vue template
  pre
    :hl
      <Scene>
        <Box :position="[0, 0, 5]"></Box>
      </Scene>
  p #[strong or] (using Pug):
  pre
    :hl(lang="pug")
      Scene
        Box(:position="[0, 0, 5]")
  h5 Advanced ES Module support
  ul
    li You can import specific portions of the library to leverage tree-shaking in compatible build tools, e.g. Webpack.
    li All components, including the mesh components, are exported individually from the ES Module.
    li A special #[code plugin] export contains the installation logic for this plugin without any components.
    li The export #[code BABYLON] contains all of the classes exported by Babylon.js.
    li The #[code default] export contains installation logic that will include all components, effectively bypassing any tree-shaking functionality.
    li The #[code components] option of the installation mechanism also allows for renaming components.
    li Physics components are individually exported per their underlying library as #[code Cannon] and #[code Oimo].
  p Example usage of cherry-picking components with the ES Module functionality:
  pre
    :hl(lang="js")
      import Vue from 'vue';
      import { plugin, Scene, Box, Cannon } from 'vue-babylonjs';
      Vue.use(plugin, { components: { Scene, Box, Physics: Cannon } });
  p You can also use individual exports as mixins or in specific components:
  Initialization in script:
  pre
    :hl(lang="js")
      import { plugin } from 'vue-babylonjs';
      Vue.use(plugin);
  Usage in component:
  pre
    :hl(lang="js")
      import { Entity, Scene, Box } from 'vue-babylonjs';
      export default {
        mixins: [Entity],
        components: { Scene, Box },
      };
</template>
