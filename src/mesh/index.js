import { MeshBuilder } from '../babylon';
import AbstractMesh from './abstract';

const prepare = fn => ({
  mixins: [AbstractMesh],

  onScene({ name, scene }) {
    return fn(name, this.options, scene);
  },
});

// TODO: add CreateDecal(name, sourceMesh, options)
// TODO: add CreateGroundFromHeightMap(name, url, options, scene)
export const Box = prepare(MeshBuilder.CreateBox);
export const Cylinder = prepare(MeshBuilder.CreateCylinder);
export const DashedLines = prepare(MeshBuilder.CreateDashedLines);
export const Disc = prepare(MeshBuilder.CreateDisc);
export const Ground = prepare(MeshBuilder.CreateGround);
export const IcoSphere = prepare(MeshBuilder.CreateIcoSphere);
export const Lathe = prepare(MeshBuilder.CreateLathe);
export const Lines = prepare(MeshBuilder.CreateLines);
export const LineSystem = prepare(MeshBuilder.CreateLineSystem);
export const Plane = prepare(MeshBuilder.CreatePlane);
export const PolygonMesh = prepare(MeshBuilder.CreatePolygon);
export const Polyhedron = prepare(MeshBuilder.CreatePolyhedron);
export const Ribbon = prepare(MeshBuilder.CreateRibbon);
export const Sphere = prepare(MeshBuilder.CreateSphere);
export const TiledGround = prepare(MeshBuilder.CreateTiledGround);
export const Torus = prepare(MeshBuilder.CreateTorus);
export const TorusKnot = prepare(MeshBuilder.CreateTorusKnot);
export const Tube = prepare(MeshBuilder.CreateTube);
export const ExtrudePolygon = prepare(MeshBuilder.ExtrudePolygon);
export const ExtrudeShape = prepare(MeshBuilder.ExtrudeShape);
export const ExtrudeShapeCustom = prepare(MeshBuilder.ExtrudeShapeCustom);
