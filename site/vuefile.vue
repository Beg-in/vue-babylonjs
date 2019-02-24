<script>
export default {
  props: {
    pug: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<template lang="pug" src="./vuefile.pug"></template>

<style lang="sass" scoped>
code
  display: block
  padding: 0
  overflow: visible
  margin: 0
pre
  display: block
  overflow: visible
  padding: 0
  white-space: pre
  word-wrap: normal
</style>
