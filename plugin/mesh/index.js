let { MeshBuilder } = require('babylonjs');

// TODO: add CreateDecal(name, sourceMesh, options)
// TODO: add CreateGroundFromHeightMap(name, url, options, scene)
module.exports = Object.entries({
  Box: MeshBuilder.CreateBox,
  Cylinder: MeshBuilder.CreateCylinder,
  DashedLines: MeshBuilder.CreateDashedLines,
  Disc: MeshBuilder.CreateDisc,
  Ground: MeshBuilder.CreateGround,
  IcoSphere: MeshBuilder.CreateIcoSphere,
  Lathe: MeshBuilder.CreateLathe,
  Lines: MeshBuilder.CreateLines,
  LineSystem: MeshBuilder.CreateLineSystem,
  Plane: MeshBuilder.CreatePlane,
  Polygon: MeshBuilder.CreatePolygon,
  Polyhedron: MeshBuilder.CreatePolyhedron,
  Ribbon: MeshBuilder.CreateRibbon,
  Sphere: MeshBuilder.CreateSphere,
  TiledGround: MeshBuilder.CreateTiledGround,
  Torus: MeshBuilder.CreateTorus,
  TorusKnot: MeshBuilder.CreateTorusKnot,
  Tube: MeshBuilder.CreateTube,
  ExtrudePolygon: MeshBuilder.ExtrudePolygon,
  ExtrudeShape: MeshBuilder.ExtrudeShape,
  ExtrudeShapeCustom: MeshBuilder.ExtrudeShapeCustom,
}).reduce((out, [name, constructor]) => {
  out[name] = {
    mixins: [require('./abstract')],

    methods: {
      init() {
        this.setNode(constructor(this.id, this.options, this.scene));
      },
    },
  };
  return out;
}, {});
