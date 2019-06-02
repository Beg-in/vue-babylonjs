'use strict';

module.exports = require('begin-project/lint/client');
module.exports.rules['import/no-unresolved'] = ['error', { commonjs: true, caseSensitive: true, ignore: ['vue-babylonjs$'] }];
