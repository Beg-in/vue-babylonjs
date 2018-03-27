# Vue-BabylonJS API documentation

## Getting started

[See README](https://github.com/Beg-in/vue-babylonjs)

## Important things to know

 - [Types for props](#types)
 - [Retrieving BabylonJS Objects](#types)

### Types for props (attributes)

**Vue bindings are important when using this library.**

Always use `v-bind:property` or the shorthand `:property` on attributes to components that expect non-string values!

<a name="types"></a>
#### Vector

Vectors can be any of the following:

 - An Array of 2, 3, or 4 Numbers between 0 and 1
 - A call to the `$vector` helper using Numbers between 0 and 1
 - An Object from the `Vector2`, `Vector3`, or `Vector4` classes in BabylonJS

Template:

```html
<Box :position="[1, 0, 1]"></Box>
<Box :position="$vector(0, 1, 0)"></Box>
<Sphere :position="myArray"></Sphere>
<Cylinder :position="myVector"></Cylinder>
```

Script:

```js
let { Vector3 } = require('vue-babylonjs/classes');

module.exports = {
  data() {
    return {
      myArray: [1, 0, 1],
      myVector: new Vector3(0, 1, 0),
    };
  },
};
```

#### Color

Colors can be any of the following:

 - An Array of 3 or 4 Numbers between 0 and 1
 - A call to the `$color` helper using Numbers between 0 and 1
 - An Object from the `Color3` or `Color4` classes in BabylonJS
 - A HTML color code String with an optional alpha channel (case insenisitive)

Template:

```html
<Material :color="[1, 0, 1]"></Material>
<Material :color="$color(0, 1, 0)"></Material>
<Material :color="myArray"></Material>
<Material :color="myColor"></Material>

<!-- html color codes (note string type does not use binding syntax!) -->
<Material color="#f1f"></Material>
<Material color="#f1f1f1"></Material>

<!-- color codes with alpha channel (Color4) -->
<Material color="#f1f1"></Material>
<Material color="#f1f1f1f1"></Material>
```

Script:

```js
let { Color3 } = require('vue-babylonjs/classes');

module.exports = {
  data() {
    return {
      myArray: [1, 0, 1],
      myColor3: new Color3(0, 1, 0),
    };
  },
};
```

#### Matrix

Matricies can be any of the following:

 - An Array of Numbers
 - A call to the `$matrix` helper with Numbers as arguments
 - An Object from the `Matrix` class in BabylonJS

Template:

```html
<Uniform :matrix3x3="[1, 2, 3, 4, 5, 6, 7, 8, 9]"></Uniform>
<Uniform :matrix4x4="$matrix(1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6)"></Uniform>
<Uniform :matrix3x3="myArray"></Uniform>
<Uniform :matrix3x3="myMatrix"></Uniform>
```

Script:

```js
let { Matrix } = require('vue-babylonjs/classes');

module.exports = {
  data() {
    return {
      myArray: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      myMatrix: new Matrix(0, 1, 0),
    };
  },
};
```

