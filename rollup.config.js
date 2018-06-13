import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import { fileSync as find } from 'find';

const name = 'VueBabylonjs';
const plugins = [
  resolve(),
  babel({
    runtimeHelpers: true,
    plugins: ['external-helpers', 'transform-runtime'],
    ignore: 'node_modules/!(babylonjs)',
  }),
  commonjs({
    include: 'node_modules/**'
  }),
];
// const FILES = find(/.*\/.+\/.+\.js$/, './src').reduce((out, file) => ({
//   ...out,
//   [file.replace(/src\//, '').replace(/\.js$/, '')]: file,
// }), {});
const globals = {
  earcut: 'earcut',
  oimo: 'OIMO',
  cannon: 'CANNON',
};

export default [{
  input: 'src/index.js',
  output: {
    format: 'es',
    file: 'dist/esm.js',
    globals,
  },
  plugins,
}, {
  input: 'src/full.js',
  output: {
    format: 'umd',
    name,
    file: 'dist/umd.js',
    globals,
  },
  plugins,
// }, {
//   input: {
//     index: 'src/core.js',
//     ...FILES,
//   },
//   experimentalCodeSplitting: true,
//   output: {
//     format: 'cjs',
//     dir: './lib',
//     globals,
//   },
//   plugins,
}];
