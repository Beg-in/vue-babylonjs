// TODO: add CreateDecal(name, sourceMesh, options)
// TODO: add CreateGroundFromHeightMap(name, url, options, scene)
module.exports = Object.entries({
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
  Polygon: 'CreatePolygon',
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
}).reduce((out, [key, constructor]) => {
  out[key] = {
    mixins: [require('./abstract')],

    onScene({ name, scene, classes: { MeshBuilder } }) {
      return MeshBuilder[constructor](name, this.options, scene);
    },
  };
  return out;
}, {});
