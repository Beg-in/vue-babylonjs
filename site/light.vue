<template lang="pug">
article
  h2 Light
  include:markdown-it(plugins=['markdown-it-prism']) ../src/light/docs.md
</template>
