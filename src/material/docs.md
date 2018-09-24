#### Description

Apply a material to a mesh

#### Details

The [BabylonJS guide to materials](https://doc.babylonjs.com/babylon101/materials) can be helpful here.

 - Must be a child of a Mesh component
 - Both StandardMaterial and PBRMaterial classes are available to use through the Material component
 - The component unifies as many properties as possible to make PBRMaterial as easy to use as possible
 - When a `glossiness`, `metallic`, or `roughness` property is used, the component will switch to PBRMaterial
 - Texture properties can be used on Material using a Texture component

#### Usage

```html
<Scene>
  <Box>
    <Material v-model="myMaterial" diffuse="#F00"></Material>
  </Box>
</Scene>
```

#### Props

 - `diffuse` (Color3) - The basic color of the material as viewed under a light
 - `specular` (Color3) - The highlight given to the material by a light
 - `emissive` (Color3) - The color of the material as if self lit
 - `ambient` (Color3) - The color of the material lit by the environmental background lighting
 - `reflection` (Color3) - For PBRMaterial reflection color
 - `alpha` (Number) - Transparency of the material
 - `metallic` (Number) - For PBRMaterial specifies the metallic scalar value of the material
 - `roughness` (Number) - For PBRMaterial specifies the roughness scalar value of the material
 - `glossiness` (Number) - For PBRMaterial how sharp the reflection is
 - `indexOfRefraction` (Number) - For PBRMaterial index of refraction with transparency
