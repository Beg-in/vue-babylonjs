'use strict';

let prism = require('prismjs');
let loadLanguages = require('prismjs/components/index.js');

loadLanguages(['pug']);

module.exports = ({ config, pug }) => {
  let { module: { rules } } = config;

  rules.forEach(rule => {
    if (rule.loader === 'babel-loader') {
      rule.exclude = /node_modules\/(?!(begin-|babylonjs))/;
    }
  });

  rules.push({
    test: /\.(glsl|frag|vert)$/,
    loaders: ['raw-loader', 'glslify-loader'],
  });

  pug.options.filters = {
    hl(text, { lang = 'markup' } = {}) {
      if (text[0] === '\n') {
        text = text.substring(1);
      }
      return `<code lang="${lang}">${prism.highlight(text, prism.languages[lang], lang)}</code>`;
    },
  };

  return config;
};
