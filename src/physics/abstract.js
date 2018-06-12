import { PhysicsImpostor, Vector3 } from '../babylon';
import AbstractEntity from '../entity/abstract';
import { capitalize } from '../util';

let physicsEngine;

const TYPES = {
  BOX: 'box',
  CYLINDER: 'cylinder',
  HEIGHTMAP: 'heightmap',
  MESH: 'mesh',
  PARTICLE: 'particle',
  PLANE: 'plane',
  SPHERE: 'sphere',
};

export default {
  mixins: [AbstractEntity],

  inject: {
    gravity: {
      from: 'SceneGravity',
      default: new Vector3(0, -9.81, 0),
    },
  },

  props: {
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
  },

  computed: {
    impostor() {
      return PhysicsImpostor[`${capitalize(this.type)}Impostor`];
    },
  },

  methods: {
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

  },

  watch: {
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
  },

  onScene({ scene }) {
    if (!physicsEngine) {
      let Plugin = this.getPhysicsPlugin();
      physicsEngine = scene.enablePhysics(this.gravity, new Plugin());
    }
  },

  onParent() {
    this.create();
  },
};
