#### Description

Define lighting in a scene

#### Components

 - DirectionalLight
 - HemisphericLight
 - PointLight
 - SpotLight

#### Details

The [BabylonJS guide to lights](https://doc.babylonjs.com/babylon101/lights) can be helpful here.

 - Can be defined anywhere as a descendant of the Scene component
 - Can be transformed (position) with an ancestor Entity component

#### Usage

```html
<Scene>
  <DirectionalLight v-model="myLight"></DirectionalLight>
  <HemisphericLight diffuse="#F00"></HemisphericLight>
  <PointLight specular="#0F0"></PointLight>
  <SpotLight></SpotLight>
</Scene>
```

#### Props

All Lights:

 - `diffuse` (Color3) - Gives the basic color to an object
 - `specular` (Color3) - Produces a highlight color on an object

DirectionalLight, HemisphericLight, and SpotLight:

 - `direction` (Vector3) - direction of the light

SpotLight:

 - `angle` (Number) - in radians, defines the size (field of illumination) of the spotlight's conical beam
 - `exponent` (Number) - defines the speed of the decay of the light with distance (reach)
