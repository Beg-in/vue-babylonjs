import { $vector, BABYLON } from 'vue-babylonjs';
import sprite from './sprite.png';

const ORBIT_RADIUS = 20;

export default {
  data() {
    return {
      box: null,
      // camera: null,
      // rotationOffset: 10,
      sprite,
      alpha: 0,
      faceUV: [...new Array(6).fill()].map((_, i) => $vector(i / 6, 0, (i + 1) / 6, 1 / 4)),
    };
  },

  computed: {
    rotationOffset() {
      return (18 * this.alpha) % 360;
    },

    boxPosition() {
      return [
        ORBIT_RADIUS * Math.cos(this.alpha),
        ORBIT_RADIUS * Math.sin(this.alpha),
        10 * Math.sin(2 * this.alpha),
      ];
    },
  },

  methods: {
    complete({ scene }) {
      let boxes = new BABYLON.SolidParticleSystem('boxes', scene, { updatable: false });
      boxes.addShape(this.box, 400, { positionFunction: particle => {
        particle.position = $vector(
          -50 + Math.random() * 100,
          -50 + Math.random() * 100,
          -50 + Math.random() * 100,
        );
      } });
      boxes.buildMesh();
    },

    // beforeRender() {
    //   this.alpha += 0.01;
    //   this.rotationOffset = (18 * this.alpha) % 360;
    //   this.box.position.x = ORBIT_RADIUS * Math.cos(this.alpha);
    //   this.box.position.y = ORBIT_RADIUS * Math.sin(this.alpha);
    //   this.box.position.z = 10 * Math.sin(2 * this.alpha);
    // },
  },
};
