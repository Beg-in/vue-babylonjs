let util = require('../util');
module.exports = {
  mixins: [require('../entity/abstract')],

  props: {
    variable: {
      type: String,
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

    matrix2x2: {
      type: Float32Array,
      default: null,
    },

    matrix3x3: {
      type: Float32Array,
      default: null,
    },

    array: {
      validator: util.isFloatArray,
      default: null,
    },
  },

  computed: {
    details() {
      let type;
      let value;
      if (this.float) {
        value = this.float;
        type = 'Float';
        if (util.isFloatArray(this.float)) {
          type = 'Floats';
        }
      } else if (this.color) {
        if (util.color4.validator(this.color)) {
          value = util.toColor4(this.color);
          type = 'Color4';
        } else {
          value = util.toColor3(this.color);
          type = 'Color3';
        }
      } else if (this.vector) {
        if (util.vec4.validator(this.vector)) {
          value = util.toVec4(this.vector);
          type = 'Vector4';
        } else if (util.vec3.validator(this.vector)) {
          value = util.toVec3(this.vector);
          type = 'Vector3';
        } else {
          value = util.toVec2(this.vector);
          type = 'Vector2';
        }
      } else if (this.matrix) {
        value = util.toMatrix(this.matrix);
        type = 'Matrix';
      } else if (this.matrix2x2) {
        value = this.matrix2x2;
        type = 'Matrix2x2';
      } else if (this.matrix3x3) {
        value = this.matrix3x3;
        type = 'Matrix3x3';
      } else if (this.array) {
        value = this.array;
        type = 'Array2';
        if (value.length > 2) {
          type = 'Array3';
        }
      }
      return {
        kind: this.kind,
        variable: this.variable,
        type,
        value,
      };
    },
  },

  methods: {
    register() {
      this.$bus.$emit('registerVariable', this.details);
    },
    set() {
      this.$bus.$emit('setVariable', this.details);
    },
    dispose() {
      this.$bus.$emit('disposeVariable', this.details);
    },
  },

  watch: {
    details() {
      this.set();
    },
  },

  created() {
    this.register();
    this.$bus.$on('create', () => {
      this.set();
    });
  },

  onScene() {
    return this.details;
  },

  beforeDistroy() {
    this.dispose();
  },
};
