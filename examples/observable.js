export default {
  data() {
    return {
      box: null,
      sphere: null,
      time: performance.now(),
      frames: 0,
    };
  },

  computed: {
    scale() {
      let a = 2 + Math.cos(this.time * 0.001);
      let b = 2 + Math.sin(this.time * 0.001);
      return {
        box: [a, b, 1],
        sphere: [b, a, 1],
      };
    },
  },

  methods: {
    beforeRender() {
      this.time = performance.now();
    },

    onSphere(event) {
      console.log('onSphere', event);
      // the entity event includes entity reference
      this.sphere = event.entity;
    },

    complete(event) {
      console.log('complete', event);
      console.log('box', this.box);
      console.log('sphere', this.sphere);
    },
  },
};
