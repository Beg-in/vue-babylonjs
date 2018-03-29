### Texture

A texture to use on a Material component

#### Details

 - Must be a child of the Material component
 - Properties of this component are reactive and will automatically update the parent Material

#### Usage

```html
<Scene>
  <Material>
    <Texture v-model="myTexture"></Texture>
  </Material>
</Scene>
```

#### Props

 - `type` (String) - type name with "Texture" automatically added, see valid values below:
    - `"diffuse"` when in PBRMaterial mode, automatically renamed to `albedoTexture`
    - `"ambient"`
    - `"opacity"`
    - `"reflection"`
    - `"emissive"`
    - `"specular"`
    - `"bump"`
    - `"lightmap"`
    - `"refraction"`
    - `"cameraColorGrading"`
    - `"albedo"` (PBRMaterial)
    - `"reflectivity"` (PBRMaterial)
    - `"metallic"` (PBRMaterial)
    - `"microSurface"` (PBRMaterial)
    - `"environmentBRDF"` (PBRMaterial)
    - `"metallicRoughness"` (PBRMaterial) automatically renamed to `metallicTexture`
    - `"environment"` (PBRMaterial) automatically renamed to `reflectionTexture`
    - `"normal"` (PBRMaterial) automatically renamed to `bumpTexture`
    - `"occlusion"` (PBRMaterial) automatically renamed to `ambientTexture`
    - `"specularGlossiness"` (PBRMaterial) automatically renamed to `reflectivityTexture`
 - `property` (String) - when not using the `type` prop, the name of the texture property to set on the Material
 - `src` (String) - the uri location of the image src for this texture
 - `value` (Texture) - when not using the `src` prop use a BabylonJS texture object
