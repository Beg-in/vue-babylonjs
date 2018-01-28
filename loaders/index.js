'use strict';

let rawLoader = require.resolve('raw-loader');
let glslifyLoader = require.resolve('glslify-loader');

module.exports = ({ config }) => {
  let { module: { rules } } = config;
  rules.push({
    test: /\.(glsl|frag|vert)$/,
    loaders: [rawLoader, glslifyLoader],
  });
  return config;
};
