<template lang="pug">
article
  h2 About
  .frow.gutters
    .col-md-1-2
      .frow
        img.founder-image(src="./assets/brian.jpg" alt="Brian")
      .founder-name Brian Jesse
      a.founder-twitter(href="https://twitter.com/Brain_Bacon") @Brain_Bacon
      .founder-title Founder
      .links
        a(href="https://github.com/Beg-in/vue-babylonjs)") GitHub
        a(href="https://github.com/Beg-in/vue-babylonjs/issues/1") Updates / Newsletter
        a(href="https://github.com/Beg-in/vue-babylonjs/blob/master/CHANGELOG.md") Changelog
        a(href="https://github.com/Beg-in/vue-babylonjs/blob/master/CONTRIBUTING.md") Contributing
        a(href="https://beg.in/") From Begin
    .col-md-1-2
      include:markdown-it(plugins=['markdown-it-prism']) ./about.md
</template>
<style lang="sass" scoped>
@import ./variables

.founder-image
  border-radius: 50%
  width: 290px
  height: 290px
  margin: 0 auto

.founder-name
  text-align: center
  margin-top: 16px
  font-size: 38px
  line-height: 120%

.founder-twitter
  display: block
  text-align: center

.links
  margin-top: 90px
  border-top: 1px solid #757575
  max-width: 225px
  margin: 30px auto 0px
  padding-top: 30px
  a
    display: block
    text-align: center

.founder-title
  text-align: center
  font-size: 17px
  font-style: italic
</style>
