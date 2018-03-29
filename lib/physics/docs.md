### Physics

Add physics to an Entity component

#### Details

The BabylonJS [guide to using a physics engine](http://doc.babylonjs.com/how_to/using_the_physics_engine) can be helpful here.

 - Must be a child of the entity you wish to add physics to
 - The physics engine will be initilized automatically when a Physics component is used in the scene
 - By default uses Cannon.js as the physics engine and can be changed to Omio.js on the Scene component with the `physics` attribute
 - Props (attributes) are reactive and can be changed dynamically

#### Usage

```html
<Scene>
  <Box>
    <Physics v-model="myImpostor"></Physics>
  </Box>
</Scene>
```

#### Props

  - `type` (`"box"`|`"cylinder"`|`"heightmap"`|`"mesh"`|`"particle"`|`"plane"`|`"sphere"`) - The kind of physics impostor
  - `mass` (Number) - The object's mass in kg
  - `friction` (Number) - The impostor's friction when colliding against other impostors
  - `restitution` (Number) - The amount of force the body will "give back" when colliding
  - `options` (Object) - `nativeOptions` in BabylonJS (options passed to the underlying physics engine)
  - `ignoreParent` (Boolean) - To avoid using the compound system, set this flag to true (default false)
  - `bidirectional` (Boolean) - whether to consider changes made to the mesh's position and rotation (default true)
