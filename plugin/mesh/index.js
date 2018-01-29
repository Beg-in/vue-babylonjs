let { MeshBuilder } = require('babylonjs');

let createComponent = constructor => {
  return {
    inject: ['scene'],

    mixins: [require('../entity')],

    props: {
      options: {
        type: Object,
        default: () => ({}),
      }

      methods: {
        init() {
          this.setNode(constructor(this.id, this.options, this.scene));
        },
      },
    },
  };
};

// TODO: add CreateDecal(name, sourceMesh, options)
// TODO: add CreateGroundFromHeightMap(name, url, options, scene)
module.exports = {
  box: createComponent(MeshBuilder.CreateBox),
  cylinder: createComponent(MeshBuilder.CreateCylinder),
  dashedLines: createComponent(MeshBuilder.CreateDashedLines),
  disc: createComponent(MeshBuilder.CreateDisc),
  ground: createComponent(MeshBuilder.CreateGround),
  icoSphere: createComponent(MeshBuilder.CreateIcoSphere),
  lathe: createComponent(MeshBuilder.CreateLathe),
  lines: createComponent(MeshBuilder.CreateLines),
  lineSystem: createComponent(MeshBuilder.CreateLineSystem),
  plane: createComponent(MeshBuilder.CreatePlane),
  polygon: createComponent(MeshBuilder.CreatePolygon),
  polyhedron: createComponent(MeshBuilder.CreatePolyhedron),
  ribbon: createComponent(MeshBuilder.CreateRibbon),
  sphere: createComponent(MeshBuilder.CreateSphere),
  tiledGround: createComponent(MeshBuilder.CreateTiledGround),
  torus: createComponent(MeshBuilder.CreateTorus),
  torusKnot: createComponent(MeshBuilder.CreateTorusKnot),
  tube: createComponent(MeshBuilder.CreateTube),
  extrudePolygon: createComponent(MeshBuilder.ExtrudePolygon),
  extrudeShape: createComponent(MeshBuilder.ExtrudeShape),
  extrudeShapeCustom: createComponent(MeshBuilder.ExtrudeShapeCustom),
}
