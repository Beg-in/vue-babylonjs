export default {
  data() {
    return {
      tick: 1,
      box: null,
      start: 0,
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
    },

    onSphere() {
    },
  },

  mounted() {
    this.start = performance.now();
  },
};
