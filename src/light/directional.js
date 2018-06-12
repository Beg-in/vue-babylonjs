import { DirectionalLight } from '../babylon';
import AbstractLight from './';
import { vec3, toVec3 } from '../types/vector';

export default {
  mixins: [AbstractLight],

  props: {
    direction: { ...vec3 },
  },

  computed: {
    directionVector3() {
      return toVec3(this.direction);
    },
  },

  watch: {
    directionVector3() {
      this.setDirection();
    },
  },

  methods: {
    setDirection() {
      this.$entity.direction.copyFrom(this.directionVector3);
    },
  },

  onScene({ name, scene }) {
    return new DirectionalLight(name, this.directionVector3, scene);
  },
};
