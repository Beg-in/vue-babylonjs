'use strict';

module.exports = require('begin-project/lint/client');
module.exports.extends = ['plugin:vue/strongly-recommended'];
module.exports.overrides = [{ files: ['*.vue'], rules: { indent: 'off' } }]
