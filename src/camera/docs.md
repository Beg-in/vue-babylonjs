#### Description

This component will define a camera in a scene

#### Details

The [BabylonJS guide to cameras](https://doc.babylonjs.com/babylon101/cameras) can be helpful here.

 - Can be defined anywhere as a descendant of the Scene component
 - Can be transformed (moved/rotated) by using a parent Entity

#### Usage

```html
<Scene>
  <Camera v-model="myCamera"></Camera>
</Scene>
```

#### Props

 - `type` (String) - The type of camera to use, see below for valid values:
    - `"universal"`
    - `"free"`
    - `"follow"`
    - `"arcRotate"`
    - `"arcFollow"`
    - `"deviceOrientation"`
    - `"touch"`
    - `"gamepad"`
 - `position` (Vector3) - Starting position for the camera
 - `target` (Vector3) - Targets the camera to a particular position
 - `alpha` (Number) - alpha (radians) the longitudinal rotation for `"arcRotate"` and `"arcFollow"` type cameras
 - `beta` (Number) - beta (radians) the latitudinal rotation for `"arcRotate"` and `"arcFollow"` type cameras
 - `radius` (Number) - The distance from the target for `"arcRotate"` and `"arcFollow"` type cameras
