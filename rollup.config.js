import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';

export default {
  input: 'src/index.js',
  output: [{
    format: 'umd',
    name: 'VueBabylonjs',
    file: 'dist/umd.js',
  }, {
    format: 'es',
    file: 'dist/esm.js',
  }],
  plugins: [babel(), resolve()],
};
