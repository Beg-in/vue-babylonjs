<style lang="sass" src="./global.sass"></style>
<style lang="sass" src="./highlight.sass"></style>

<script>
import Logo from './assets/github.svg';

export default {
  components: {
    Logo,
  },

  data() {
    return {
      sidebar: false,
    };
  },
};
</script>

<template lang="pug">
#viewport.height-100.width-100
  .frow.visible-sm.visible-xs
    .hamburger(@click.prevent="sidebar = !sidebar" type="button")
      div
      div
      div
    h1 Vue-BabylonJS
  .frow.width-100
    .col-md-1-5.height-100(:class="{ 'sidebar-hidden': !sidebar }")
      .sidebar
        nav.height-100(@click="sidebar = false")
          .hidden-sm.hidden-xs
            h1
              router-link(to="/home") Vue-BabylonJS
          ul
            li
              .folder-name Introduction
            router-link(tag="li" to="/home")
              a Home
            router-link(tag="li" to="/installation")
              a Installation
            router-link(tag="li" to="/about")
              a About
            li
              .folder-name API
            router-link(tag="li" to="/animation")
              a Animation
            router-link(tag="li" to="/asset")
              a Asset
            router-link(tag="li" to="/camera")
              a Camera
            router-link(tag="li" to="/entity")
              a Entity
            router-link(tag="li" to="/light")
              a Light
            router-link(tag="li" to="/material")
              a Material
            router-link(tag="li" to="/mesh")
              a Mesh
            router-link(tag="li" to="/observable")
              a Observable
            router-link(tag="li" to="/physics")
              a Physics
            router-link(tag="li" to="/property")
              a Property
            router-link(tag="li" to="/scene")
              a Scene
            router-link(tag="li" to="/shader")
              a Shader
            router-link(tag="li" to="/texture")
              a Texture
            router-link(tag="li" to="/types")
              a Types
            .frow
              external.github-logo(href="https://github.com/Beg-in/vue-babylonjs") #[Logo]
          p &copy; {{new Date().getFullYear()}} Brian Jesse
    .col-md-4-5.height-100(:class="{ 'sidebar-hidden': sidebar }")
      main
        router-view
</template>

<style lang="sass" scoped>
@import ./variables

#viewport
  color: $dark-color

main
  margin: 20px

.frow.visible-sm.visible-xs
  h1
    margin-top: 10px
  .hamburger
    background-color: $light-color
    position: fixed
    top: 0
    left: 0
    z-index: 4
    padding: 5px
    margin: 5px
    height: 40px
    width: 40px
    border-radius: 0
    border: none
    &:hover,
    &:focus,
    &:active
      background-color: $light-color
    &:hover
      border: none
      div
        background-color: darken($main-color, 10%)
    div
      width: 30px
      height: 5px
      margin-bottom: 5px
      background: $main-color

@media (max-width: 991px)
  .sidebar-hidden
    display: none

.sidebar
  position: relative
  width: inherit

nav
  background-color: darken($light-color, 5%)
  padding: 15px
  position: fixed
  width: inherit
  color: $dark-color
  text-decoration: none
  overflow-y: scroll
  -ms-overflow-style: -ms-autohiding-scrollbar
  h1 a
    font-size: 35px
    color: $dark-color
    text-decoration: none
    &:hover
      color: lighten($dark-color, 25%)
      text-decoration: none
  ul
    margin: 0
    padding: 0
  li
    padding-left: 15px
    &.router-link-active
      a
        color: $light-color
        text-decoration: none
        background-color: lighten($dark-color, 50%)
        border-radius: 3px
  .folder-name
    padding-top: 15px
    font-weight: bold
    border-bottom: 2px solid $main-color
    line-height: 80%
    margin-bottom: 5px
  ul a
    display: block
    color: $dark-color
    padding-left: 10px
    padding-top: 5px
    margin-left: 5px
    color: darken($gray-dark, 10%)
      // background: lighten($third-color, 10%)
    &:hover
      text-decoration: none
      background-color: lighten($dark-color, 70%)
      border-radius: 3px
  .github-logo
    margin-top: 30px
    width: 45px
    display: block
  p
    text-align: center
  ul
    list-style: none
</style>
