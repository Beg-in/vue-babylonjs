<template lang="pug">
article
  h2 Texture
  include:markdown-it(plugins=['markdown-it-prism']) ../src/texture/docs.md
</template>
