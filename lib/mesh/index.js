// TODO: add CreateDecal(name, sourceMesh, options)
// TODO: add CreateGroundFromHeightMap(name, url, options, scene)
const TYPES = {
  Box: 'CreateBox',
  Cylinder: 'CreateCylinder',
  DashedLines: 'CreateDashedLines',
  Disc: 'CreateDisc',
  Ground: 'CreateGround',
  IcoSphere: 'CreateIcoSphere',
  Lathe: 'CreateLathe',
  Lines: 'CreateLines',
  LineSystem: 'CreateLineSystem',
  Plane: 'CreatePlane',
  PolygonMesh: 'CreatePolygon',
  Polyhedron: 'CreatePolyhedron',
  Ribbon: 'CreateRibbon',
  Sphere: 'CreateSphere',
  TiledGround: 'CreateTiledGround',
  Torus: 'CreateTorus',
  TorusKnot: 'CreateTorusKnot',
  Tube: 'CreateTube',
  ExtrudePolygon: 'ExtrudePolygon',
  ExtrudeShape: 'ExtrudeShape',
  ExtrudeShapeCustom: 'ExtrudeShapeCustom',
};

module.exports = Object.entries(TYPES).reduce((out, [key, constructor]) => {
  out[key] = {
    mixins: [require('./abstract')],

    onScene({ name, scene, classes: { MeshBuilder } }) {
      return MeshBuilder[constructor](name, this.options, scene);
    },
  };
  return out;
}, {});
