#### Description

This is the entry point for the entire 3D scene. All components of this library require this to be an ancestor.

#### Details

 - Automatically creates the HTML Canvas object to be used by BabylonJS
 - If there are no cameras defined in the scene then the BabylonJS default environment will be created
 - Although physics options are defined on the scene, it will not be initialized until a `Physics` component is used
 - The model from this component is the raw BabylonJS scene object. Use this to obtain access to the engine and physics engine (when initialized).

See [the BabylonJS api documentation on the Scene class](https://doc.babylonjs.com/api/classes/babylon.scene) for more details.

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

#### Events
 - `engine` - When the scene object is available
 - `scene` - When the scene object is available
 - `complete` - When all child entities are available
 - All observables from `Scene`, see the Observable documentation for details

#### Props

 - `ambient` (Color) - Ambient lighting color for the scene
 - `fog` (String) - The type of fog to use, see below for valid values:
    - `"none"`
    - `"exp"`
    - `"exp2"`
    - `"linear"`
 - `fogStart` (Number) - Starting distance for fog
 - `fogEnd` (Number) - Ending distance for fog
 - `fogDensity` (Number) - Density of fog for in `"exp"` or `"exp2"` modes
 - `fogColor` (Color) - Color to use for fog
 - `fullscreen` (Boolean) - Enable fullscreen - default `false`
 - `debug` (Boolean) - Enable debug mode - default `false`
 - `environment` (IEnvironmentHelperOptions) - Options for the default environment: [See the interface documentation](https://doc.babylonjs.com/api/interfaces/babylon.ienvironmenthelperoptions)
 - `main` (Color) - Primary color of all the available elements when using the default environment
 - `physics` (String) - Optionally change the physics engine to use, see below for valid values:
    - `"cannon"`
    - `"oimo"`
 - `gravity` (Vector3) - Set the direction of gravity when using the physics engine
