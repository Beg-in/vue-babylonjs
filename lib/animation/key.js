let { isFloat, isPercent, vec3: { validator } } = require('../util');

module.exports = {
  mixins: [require('../entity/abstract')],

  props: {
    frame: {
      validator: value => isFloat(value) || isPercent(value),
      default: 0,
    },

    value: {
      default: 0,
    },

    inTangent: {
      validator,
      default: null,
    },

    outTangent: {
      validator,
      default: null,
    },
  },

  computed: {
    key() {
      return {
        frame: this.frame,
        value: this.value,
        inTangent: this.inTangent,
        outTangent: this.outTangent,
      };
    },
  },

  methods: {
    setKey() {
      this.$bus.$emit('setKey', {
        name: this.name,
        key: this.key,
      });
    },

    dispose() {
      this.$bus.$emit('disposeKey', this.name);
    },
  },

  watch: {
    key() {
      this.setKey();
    },
  },

  created() {
    this.setKey();
  },

  beforeDestroy() {
    this.dispose();
  },
};
