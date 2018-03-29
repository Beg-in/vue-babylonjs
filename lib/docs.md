## Important things to know

### Types for props (attributes)

**Vue bindings are important when using this library**

Always use `v-bind:property` or the shorthand `:property` on attributes to components that expect non-string values!

The following BabylonJS types have specific helpers in this plugin:

 - `Color3` and `Color4` as a unified `Color` API
 - `Vector2`, `Vector3`, and `Vector4` as a unified `Vector` API
 - `Matrix`

[See the documentation for these helpers for more information](#util)

### Retrieving BabylonJS Objects

Most components in this plugin support Vue's model-binding syntax.

#### Notes

 - Use the attribute `v-model` on components 
 - `v-model` does not require binding syntax
 - bind it to a property in your data object
 - Use `null` for your initial value in your data object
 - The model will not be immediately available, so do not expect populated data in lifecycle hooks
 - Use a watch function to be notified when the data property is populated and initeract with the object from there
 - The `v-model` value on some components may change during the lifecycle of the scene, so plan your watchers accordingly

#### Example

##### Template:

```html
<Scene v-model="myScene">
  <Entity v-model="myEntity">
    <Box v-model="myBox"></Box>
  </Entity>
</Scene>
```

##### Script:

```js
module.exports = {
  data() {
    return {
      myScene: null,
      myEntity: null,
      myBox: null,
    };
  },

  watch: {
    myScene() {
      // myScene is now available from the component
      // do something with it here or call a method to use it from here
    },

    myEntity() {
      // myEntity is now available from the component
      // do something with it here or call a method to use it from here
    },

    myBox() {
      // myBox is now available from the component
      // do something with it here or call a method to use it from here
    },
  },
};
```

[See the Entity documentation for more information](#entity)
