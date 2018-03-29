### Scene

This is the entry point for the entire 3D scene. All components of this library require this to be an ancestor.

#### Details

 - Automatically creates the HTML Canvas object to be used by BabylonJS
 - If there are no cameras defined in the scene then the BabylonJS default environment will be created
 - Although physics options are defined on the scene, it will not be initialized until a `Physics` component is used
 - The model from this component is the raw BabylonJS scene object. Use this to obtain access to the engine and physics engine (when initialized).

See [the BabylonJS api documentation on the Scene class](http://doc.babylonjs.com/api.html?scene) for more details.

#### Usage

```html
<Scene v-model="myModel">
  <!-- here is where you put other components in this library -->
</Scene>
```

By default the canvas will use all available space from the parent element. Use the following CSS to fill the entire page with the canvas object:

```css
html, body {
  margin: 0;
  padding: 0;
  height: 100%;
}
```

#### Props

 - `ambient` (Color) - Ambient lighting color for the scene
 - `fog` (`"none"`|`"exp"`|`"exp2"`|`"linear"`) - The type of fog to use
 - `fogStart` (Number) - Starting distance for fog
 - `fogEnd` (Number) - Ending distance for fog
 - `fogDensity` (Number) - Density of fog for in `"exp"` or `"exp2"` modes
 - `fogColor` (Color) - Color to use for fog
 - `fullscreen` (Boolean) - Enable fullscreen - default `false`
 - `debug` (Boolean) - Enable debug mode - default `false`
 - `environment` (IEnvironmentHelperOptions) - Options for the default environment: [See the interface documentation](http://doc.babylonjs.com/classes/interfaces/babylon.ienvironmenthelperoptions)
 - `main` (Color) - Primary color of all the available elements when using the default environment
 - `physics` (`"cannon"`|`"oimo"`) - Optionally change the physics engine to use
 - `gravity` (Vector3) - Set the direction of gravity when using the physics engine
