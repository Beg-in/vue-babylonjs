#### Details

 - This must be a child of a Mesh component
 - It is important to use a unique name value when using this component to leverage shader caching inside of the BabylonJS `ShadersStore`
 - Not using the `name` attribute when recommended may lead to memory leaks!
 - There are several ways to define your vertex and fragment code try to follow the recommendations for each use-case
 - Pick one method of each loading vertex and fragment code
 - You can mix-and-match methods of loading
 - Create reusable components with Vue to share your shader materials with several different meshes

#### Usage

```html
<Scene>
  <Box>
    <Shader name="some_unique_value" v-model="myMaterial"></Shader>
  </Box>
</Scene>
```

#### Props

 - `name` (String) - A unique id value to assign to this shader
 - `vertex` (String) - vertex name in shader store (recommended for independently resuable shader files) using this and `fragment` together  this does not require a `name` attribute
 - `vertexElement` (String) - vertex script id (Not recommended, use the Vertex component)
 - `vertexShader` (String) - raw vertex shader code (USE THE `name` prop for safe caching!)
 - `fragment` (String) - fragment name in shader store (recommended for independently resuable shader files) using this and `vertex` together does not require a `name` attribute
 - `fragmentElement` (String) - fragment script id (Not recommended, use the Fragment component)
 - `fragmentShader` (String) - raw fragment shader code (USE THE `name` prop for safe caching!)
 - `shader` (String) - shader and fragment name in shader store (recommended for resuable shader files) using this does not require a `name` attribute
 - `src` (String) - path to an fx file on your server (Only recommended when using the webpack file plugin, using a CDN, or in specific environments)

### Shader Content

Use a separate component to define your shader code

#### Components

 - Vertex
 - Fragment

#### Details

 - Must be a child of a Shader component
 - When using only separate Vertex and/or Fragment components it is not necessary to provide a name to the parent Shader, but is necessary to provide to this component
 - If the parent has a name then it is not necessary to provide a name to this component, both Vertex and Fragment components will inherit the name
 - Names can be shared if the Fragment and Vertex components are children of the same Shader component, but in this case you should probably provide the name to the Shader component instead
 - When writing in the Pug langage, it is possible to provide body text of these components by using the dot (`.`) operator as the parent element
 - Body content is not reactive at the moment since Vue does not watch these changes by default
 - It is only recommended to use body content shader code in the prototyping phase

#### Usage

```html
<Scene>
  <Box>
    <Shader>
      <Vertex name="some_unique_value" :content="someVertexCodeString"></Vertex>
      <Fragment name="some_possibly_different_unique_value">
        // Body content fragment code here
      </Fragment>
    </Shader>
  </Box>
</Scene>
```

#### Props

 - `name` (String) - A unique id value to assign to this shader
 - `content` (String) - The text content of the code instead of the body content of this element

#### Shader Variables

Set a vairable for your shader code

#### Components

 - Uniform
 - Attribute

#### Details

 - Must be a child of a Shader component
 - Specific variable value types are converted automatically
 - Use only one appropriate attribute to define the type of your variable
 - Always use the `variable` attribute to define what your variable is named in your shader code
 - Variables are reactive and will update the Shader automatically when changed

#### Usage

```html
<Scene>
  <Box>
    <Shader name="some_unique_value">
      <Uniform variable="myUniformName" :float="1"></Uniform>
      <Attribute variable="myAttributeName" :float="2"></Attribute>
      <Uniform variable="myColorName" color="#F00"></Attribute>
      <Uniform variable="myThirdColorName" :color="[1, 0, 1, 0.5]"></Attribute>
      <Uniform variable="myVectorName" :vector="[1, 0, 1]"></Attribute>
      <Uniform variable="myMatrixName" :matrix="myMatrix"></Attribute>
      <Uniform variable="my2DMatrixName" :matrix2x2="my2DMatrix"></Attribute>
      <Uniform variable="my3DMatrixName" :matrix3x3="my3DMatrix"></Attribute>
      <Uniform variable="myArrayName" :array="[1, 2, 3]"></Attribute>
    </Shader>
  </Box>
</Scene>
```

#### Props

 - `variable` (String) - [required] the name of the variable in GLSL code
 - `float` (Number) - a Float value to pass into the shader
 - `color` (Color3|Color4) - a Color value to pass into the shader
 - `vector` (Vector2|Vector3|Vector4) - a Vector value to pass into the shader
 - `matrix` (Matrix) - a Matrix value to pass into the shader
 - `matrix2x2` (Matrix) - a 2D Matrix value to pass into the shader
 - `matrix3x3` (Matrix) - a 3D Matrix value to pass into the shader
 - `array` (Array) - an Array value to pass into the shader
