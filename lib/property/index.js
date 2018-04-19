let util = require('../util');

module.exports = {
  mixins: [require('../entity/abstract')],

  props: {
    name: {
      type: String,
    },

    any: {
      default: null,
    },

    float: {
      validator: util.isFloat,
      default: null,
    },

    color: {
      validator: value => util.color3.validator(value) || util.color4.validator(value),
      default: null,
    },

    vector: {
      validator: util.vecValidator,
      default: null,
    },

    matrix: {
      validator: util.matrix.validator,
      default: null,
    },
  },

  computed: {
    value() {
      if (this.any) {
        return this.any;
      } else if (this.float !== null) {
        return this.float;
      } else if (this.color) {
        if (util.color4.validator(this.color)) {
          return util.toColor4(this.color);
        }
        return util.toColor3(this.color);
      } else if (this.vector) {
        if (util.vec4.validator(this.vector)) {
          return util.toVec4(this.vector);
        } else if (util.vec3.validator(this.vector)) {
          return util.toVec3(this.vector);
        }
        return util.toVec2(this.vector);
      } else if (this.matrix) {
        return util.toMatrix(this.matrix);
      }
      return null;
    },
  },

  methods: {
    set() {
      if (this._$_parent) {
        this._$_parent[this.name] = this.value;
      } else {
        this.$scene[this.name] = this.value;
      }
    },
  },

  watch: {
    value() {
      this.set();
    },
  },

  onParent() {
    this.set();
  },
};
