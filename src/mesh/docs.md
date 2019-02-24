#### Description

Use `MeshBuilder` to constuct a `Mesh` for basic primitive shapes

#### Components

 - Box
 - Cylinder
 - DashedLines
 - Disc
 - Ground
 - IcoSphere
 - Lathe
 - Lines
 - LineSystem
 - Plane
 - PolygonMesh
 - Polyhedron
 - Ribbon
 - Sphere
 - TiledGround
 - Torus
 - TorusKnot
 - Tube
 - ExtrudePolygon
 - ExtrudeShape
 - ExtrudeShapeCustom

#### Details

The [BabylonJS guide to basic shapes](https://doc.babylonjs.com/babylon101/discover_basic_elements) can be helpful here.

 - Inherits properties from the Entity component for transform attributes `position`, `rotation`, and `scaling`
 - Can be colored by using the Material component as a child of the mesh
 - The `Polygon` class from BabylonJS has been renamed to PolygonMesh here since `polygon` is a reserved HTML tag name
 - The `options` attribute is non-reactive, create a new mesh instead of manipulating this object (this will change in the future)

[See the BabylonJS documentaion on the `MeshBuilder` class](https://doc.babylonjs.com/api/classes/babylon.meshbuilder)

#### Usage

```html
<Scene>
  <Box v-model="myBox">
    <Material diffuse="#F00"></Material>
  </Box>
  <Cylinder :position="[1, 0, 1]"></Cylinder>
  <DashedLines></DashedLines>
  <Disc :rotation="[0, Math.PI, 0]"></Disc>
  <Ground></Ground>
  <IcoSphere></IcoSphere>
  <Lathe></Lathe>
  <Lines></Lines>
  <LineSystem></LineSystem>
  <Plane></Plane>
  <PolygonMesh></PolygonMesh>
  <Polyhedron></Polyhedron>
  <Ribbon></Ribbon>
  <Sphere :scaling="[0, 1, 0]"></Sphere>
  <TiledGround></TiledGround>
  <Torus></Torus>
  <TorusKnot></TorusKnot>
  <Tube></Tube>
  <ExtrudePolygon></ExtrudePolygon>
  <ExtrudeShape></ExtrudeShape>
  <ExtrudeShapeCustom></ExtrudeShapeCustom>
</Scene>
```

#### Props

 - `options` (Object) - options passed to [`MeshBuilder`](https://doc.babylonjs.com/api/classes/babylon.meshbuilder)
