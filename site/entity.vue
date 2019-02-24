<template lang="pug">
article
  h2 Entity
  include:markdown-it(plugins=['markdown-it-prism']) ../src/entity/docs.md
</template>
