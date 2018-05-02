import * as Variable from './variable';

export const mixins = [Variable];

export const beforeCreate = function () {
  this.kind = 'attribute';
};
