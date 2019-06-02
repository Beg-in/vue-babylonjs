#### Description

Load an asset file from a URL location

#### Details

The BabylonJS [guide to loading files](https://doc.babylonjs.com/how_to/load_from_any_file_type) can be helpful here.

 - Creates a root mesh for all of the assets contained inside the referred file

#### Usage

```html
<Scene>
  <Asset src="https://example.com/example.gltf" v-model="myAssetRoot"></Asset>
</Scene>
```

#### Props

 - `src` (String) - url path to an asset file of type  `gltf`, `obj`, `stl`, or `babylon`
