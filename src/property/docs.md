#### Description

Change a value in an Entity's underlying BabylonJS object

#### Details

 - This system was developed to allow for manipulation to properties outside the scope of this Plugin
 - This plugin will not specify every possible property for every class in BabylonJS, use this Property system or obtain a reference to the underlying BabylonJS object in your Vue component script and consult the BabylonJS API documentation
 - These values are reactive, but check the BabylonJS class for the object you are manipulating to be sure this will actually change in the Scene
 - Use only one of the `any`, `float`, `color`, `vector`, or `matrix` props (attributes)

#### Usage

```html
<Scene>
  <Property name="someSceneProperty" :any="{ aProperty: 'a value' }"></Property>
</Scene>
```

#### Props

 - `name` (String) - the name of the property to set
 - `any` (any) - a value of any type to set
 - `float` (Number) - a number value to set
 - `color` (Color) - a Color from a helper or BabylonJS to set
 - `vector` (Vector) - a Vector from a helper or BabylonJS to set
 - `matrix` (Matrix) - a Matrix from a helper or BabylonJS to set
