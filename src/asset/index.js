import '@babylonjs/loaders';
import { SceneLoader } from '../babylon';
import Entity from '../entity';

export default {
  mixins: [Entity],

  props: {
    src: {
      type: String,
      default: null,
    },
  },

  watch: {
    src() {
      this.loadAssetContainer();
    },
  },

  methods: {
    async loadAssetContainer() {
      if (!this.src) {
        return;
      }
      await this._$_sceneReady;
      let assetContainer = await SceneLoader.LoadAssetContainerAsync(this.src);
      await this._$_parentReady;
      this.$replace(assetContainer.createRootMesh());
      assetContainer.addAllToScene();
    },
  },

  mounted() {
    this.loadAssetContainer();
  },
};
