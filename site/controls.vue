<script>
import VueFile from './vuefile.vue';

export default {
  components: {
    VueFile,
  },

  props: {
    inline: {
      type: Boolean,
      default: false,
    },

    route: {
      type: String,
      default: '/',
    },
  },

  data() {
    return {
      isPug: false, // TODO: change to store variable to make global
      isCodeVisible: false,
    };
  },
};
</script>

<template lang="pug">
.controls.shadow-dark
  .frow
    .col-xs-1-1
      .controls-container
        button.toggle-code(@click="isCodeVisible = !isCodeVisible" type="button") {{ `${isCodeVisible ? 'Hide' : 'Show' } Code` }}
        router-link(:to="route")
          button.full-screen(v-show="inline" type="button") Full Screen
        slot
    .col-xs-1-1(v-show="isCodeVisible")
      .code-controls
        .frow.justify-start
          button.code-html-button(@click="isPug = false" type="button" :disabled="!isPug") HTML
          button.code-pug-button(@click="isPug = true" type="button" :disabled="isPug") Pug
      .code-container
        .name-container
          slot(name="filename")
        .file-container
          VueFile(:pug="isPug")
            template(slot="vuepug")
              slot(name="pug")
            template(slot="vuehtml")
              slot(name="html")
            template(v-if="$slots.script" slot="vuescript")
              slot(name="script")
        .name-container
          slot(name="filename2")
        .file-container
          VueFile(v-if="$slots.pug2" :pug="isPug")
            template(slot="vuepug")
              slot(name="pug2")
            template(slot="vuehtml")
              slot(name="html2")
            template(v-if="$slots.script2" slot="vuescript")
              slot(name="script2")
</template>

<style lang="sass" scoped>
@import ./variables

.controls
  margin-bottom: 10px
  max-width: 550px

.controls-container
  position: relative

  button
    margin: 7px
    opacity: 0.5
    position: absolute
    &:hover
      opacity: 1
      transition: opacity $animate-speed

  .toggle-code
    right: 0
    top: 0

.code-controls
  background-color: darken($base, 10%)
  padding-top: 7px

  button
    border-bottom-left-radius: 0
    border-bottom-right-radius: 0
    border-color: darken($base, 30%)
    background-color: darken($base, 30%)

    &:disabled
      background: none
      border-color: $base
      background-color: $base

h5
  font-family: "Tajawal"
  margin: 0
  padding: 0

.name-container
  margin: 10px 0

.code-container
  // overflow: auto
  background-color: $base
  padding: 15px

.file-container
  overflow-x: scroll
  -ms-overflow-style: -ms-autohiding-scrollbar
</style>
