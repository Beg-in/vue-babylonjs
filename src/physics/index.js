import { PhysicsImpostor } from '../babylon';
import * as AbstractEntity from '../entity/abstract';
import { capitalize } from '../util';

export const TYPES = {
  BOX: 'box',
  CYLINDER: 'cylinder',
  HEIGHTMAP: 'heightmap',
  MESH: 'mesh',
  PARTICLE: 'particle',
  PLANE: 'plane',
  SPHERE: 'sphere',
};

export const mixins = [AbstractEntity];

export const props = {
  type: {
    validator: value => Object.values(TYPES).includes(value),
    default: Object.values(TYPES)[0],
  },

  mass: {
    type: Number,
    default: 0,
  },

  friction: {
    type: Number,
    default: 0.2,
  },

  restitution: {
    type: Number,
    default: 0.2,
  },

  options: {
    type: Object,
    default: undefined,
  },

  ignoreParent: {
    type: Boolean,
    default: false,
  },

  bidirectional: {
    type: Boolean,
    default: true,
  },
};

export const computed = {
  impostor() {
    return PhysicsImpostor[`${capitalize(this.type)}Impostor`];
  },
};

export const methods = {
  create() {
    let options = {
      mass: this.mass,
      restitution: this.restitution,
      friction: this.friction,
    };
    if (this.options) {
      options.nativeOptions = this.options;
    }
    if (this.ignoreParent) {
      options.ignoreParent = true;
    }
    if (!this.bidirectional) {
      options.disableBidirectionalTransformation = true;
    }
    this.$replace(new PhysicsImpostor(this._$_parent, this.impostor, options, this.$scene));
  },
};

export const watch = {
  type() {
    this.create();
  },

  mass() {
    this.$entity.setMass(this.mass);
  },

  friction() {
    this.$entity.setParam('friction', this.friction);
  },

  restitution() {
    this.$entity.setParam('restitution', this.restitution);
  },

  options: {
    handler() {
      this.$entity.setParam('nativeOptions', this.options);
    },
    deep: true,
  },

  ignoreParent() {
    this.$entity.setParam('ignoreParent', this.ignoreParent);
  },

  disableBidirectionalTransformation() {
    this.$entity.setParam('disableBidirectionalTransformation', !this.bidirectional);
  },
};

export const onScene = function () {
  this.$sceneBus.$emit('physics');
};

export const onParent = function () {
  this.create();
};
