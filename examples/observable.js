import { defer } from '../../src/util';

export default {
  data() {
    return {
      deferredBox: defer(),
      deferredSphere: defer(),
      box: null,
      sphere: null,
      tick: 1,
    };
  },

  computed: {
    scale() {
      let a = 2 + Math.cos(this.tick * 0.01);
      let b = 2 + Math.sin(this.tick * 0.01);
      return {
        box: [a, b, 1],
        sphere: [b, a, 1],
      };
    },
  },

  methods: {
    beforeRender() {
      this.tick++;
    },

    onBox() {
      this.deferredBox.resolve();
    },

    onSphere(sphere) {
      this.sphere = sphere;
      this.deferredSphere.resolve();
    },

    async init() {
      await Promise.all([this.deferredBox, this.deferredSphere]);
    },
  },

  mounted() {
    this.init();
  },
};
