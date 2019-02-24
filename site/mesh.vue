<template lang="pug">
article
  h2 Mesh
  include:markdown-it(plugins=['markdown-it-prism']) ../src/mesh/docs.md
</template>
