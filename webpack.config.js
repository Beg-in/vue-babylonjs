let path = require('path');

module.exports = () => {
  let config = {
    entry: './lib/index.js',

    module: {
      rules: [{
        test: /js\.$/,
        loader: 'babel-loader',
        options: {
          presets: [['env', { targets: { browsers: ['last 2 versions'] }, useBuiltIns: true }]],
        },
      }],
    }
  };

  return [];
};
