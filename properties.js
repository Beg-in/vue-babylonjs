'use strict';

module.exports = {
  production: {
    build: {
      domain: 'beg-in.github.io',
      main: './site/index.js',
      cdn: 'https://beg-in.github.io/vue-babylonjs/',
      root: 'https://beg-in.github.io/vue-babylonjs/',
      title: 'Vue-BabylonJS Documentation site',
      color: '#42b883',
      dist: 'docs',
      config() {
        let prism = require('prismjs');
        let loadLanguages = require('prismjs/components/index');
        let basic = require('begin-build/config/basic');
        let vue = require('begin-build/config/vue');
        let path = require('path');

        return Object.assign({}, basic, {
          local() {
            loadLanguages(['pug', 'bash']);
            let hl = (text, { lang = 'markup' } = {}) => {
              if (text[0] === '\n') {
                text = text.substring(1);
              }
              return `<code lang="${lang}">${prism.highlight(text, prism.languages[lang], lang)}</code>`;
            };

            return {
              module: {
                rules: {
                  $build: Array,
                  scripts: {
                    exclude: /node_modules\/(?!(begin-|babylonjs))/,
                  },
                  markup: {
                    use: {
                      $build: Array,
                      pug: {
                        options: {
                          filters: {
                            hl,
                          },
                          data: {
                            hl,
                          },
                        },
                      },
                    },
                  },
                  shaders: {
                    test: /\.(glsl|frag|vert)$/,
                    use: {
                      $build: Array,
                      raw: 'raw-loader',
                      glsl: 'glslify-loader',
                    },
                  },
                },
              },
              resolve: {
                alias: {
                  'vue-babylonjs$': path.join(__dirname, 'src/index.js'),
                },
              },
            };
          },
          vue,
        });
      },
    },
  },
};
