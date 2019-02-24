'use strict';

module.exports = require('begin-project/lint');
module.exports.rules['no-underscore-dangle'] = 0;
module.exports.rules['security/detect-object-injection'] = 0;
module.exports.rules['import/no-extraneous-dependencies'] = 0;
module.exports.rules['global-require'] = 0;
module.exports.parserOptions = { sourceType: 'module' };
module.exports.rules.strict = 0;
