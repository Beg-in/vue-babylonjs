<template lang="pug">
article
  h2 Types
  include:markdown-it(plugins=['markdown-it-prism']) ../src/types/docs.md
</template>
