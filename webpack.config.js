'use strict';

let prism = require('prismjs');
let loadLanguages = require('prismjs/components/index.js');
loadLanguages(['pug']);

module.exports = ({ config, pug }) => {
  let { module: { rules } } = config;
  rules.push({
    test: /\.(glsl|frag|vert)$/,
    loaders: ['raw-loader', 'glslify-loader'],
  });

  pug.options.filters = {
    hl(text, { lang = 'markup' } = {}) {
      prism.highlight(text, prism.languages[lang], lang);
    },
  };

  return config;
};
