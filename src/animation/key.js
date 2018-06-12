import AbstractEntity from '../entity/abstract';
import { isFloat, isPercent } from '../util';
import { vec3 } from '../types/vector';

const { validator } = vec3;

export default {
  mixins: [AbstractEntity],

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
