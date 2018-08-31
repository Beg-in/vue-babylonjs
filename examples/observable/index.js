module.exports = {
  data() {
    return {
      tick: 1,
      box: null,
    };
  },

  computed: {
    yScale() {
      return 2 + Math.sin(this.tick * 0.01);
    },
  },

  methods: {
    beforeRender() {
      this.tick++;
    },

    onBox() {
      this.ready();
    },

    ready() {
      console.log('box is now ready', this.box);
    },
  },
};
