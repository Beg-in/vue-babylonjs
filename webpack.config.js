'use strict';

module.exports = ({ config }) => {
  let { module: { rules } } = config;
  rules.push({
    test: /\.(glsl|frag|vert)$/,
    loaders: ['raw-loader', 'glslify-loader'],
  });
  return config;
};
