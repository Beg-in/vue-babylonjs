#### Description

This component will apply an animation to an Entity component

#### Details

The [BabylonJS guide to animations](http://doc.babylonjs.com/babylon101/animations) can be helpful here.

 - Must be a child component of an existing Entity
 - Properties are in the format `myObject.myProperty`

See [the BabylonJS api documentation on the Animation class](http://doc.babylonjs.com/api/classes/babylon.animation)

#### Usage

```html
<Scene>
  <Entity>
    <Animation v-model="myModel"
               property="position.x"
               :start="1"
               :end="10"
               :duration="5">
    </Animation>
  </Entity>
</Scene>
```

#### Props

 - `type` (String) - The type of property to animate, see below for valid values:
    - `"float"`
    - `"vector2"`
    - `"vector3"`
    - `"size"`
    - `"quaternion"`
    - `"matrix"`
    - `"color3"`
 - `mode` (String) - The loop mode of the animation, see below for valid values:
    - `"cycle"`
    - `"relative"`
    - `"constant"`
 - `property` (String) - Path to the property to animate with dots (`.`)
 - `fps` (Number) - the frames-per-second of the animation (default 60)
 - `from` (Number) - Frame number to begin animating on
 - `to` (Number) - Frame number to end animating on
 - `duration` (Number) - Length of the animation in seconds
 - `start` (Number) - Starting value of the property that is being animated
 - `end` (Number) - Ending value of the property that is being animated
 - `loop` (Boolean) - Whether to loop the animation (default true)
 - `speedRatio` (Number) - The speed ratio of this animation
 - `animatable` (Object) - A specific animation object from BabylonJS
 - `blending` (Boolean) - enable interpolation FROM the current object's state (default false)
 - `blendingSpeed` (Number) - speed of blending interpolation
 - `easing` (String) - easing function name, see below for valid values:
    - `"circle"`
    - `"back"`
    - `"bounce"`
    - `"cubic"`
    - `"elastic"`
    - `"exponential"`
    - `"power"`
    - `"quadratic"`
    - `"quartic"`
    - `"quintic"`
    - `"sine"`
    - `"bezierCurve"`
 - `easingMode` (String) - mode of the easing function, see below for valid values:
    - `"in"`
    - `"out"`
    - `"inout"`
 - `amplitude` (Number) - For the `"back"` easing function
 - `bounces` (Number) - For the `"bounce"` easing function
 - `bounciness` (Number) - For the `"bounce"` easing function
 - `oscillations` (Number) - For the `"elastic"` easing function
 - `springiness` (Number) - For the `"elastic"` easing function
 - `exponent` (Number) - For the `"exponential"` easing function
 - `power` (Number) - For the `"power"` easing function
 - `x1` (Number) - For the `"bezierCurve"` easing function
 - `y1` (Number) - For the `"bezierCurve"` easing function
 - `x2` (Number) - For the `"bezierCurve"` easing function
 - `y2` (Number) - For the `"bezierCurve"` easing function

### Key

This component represents a keyframe for an Animation component

#### Details

 - Must be a child component of an existing Animation component

#### Usage

```html
<Scene>
  <Entity>
    <Animation property="position.x" :duration="3">
      <Key frame="0%" :value="1"></Key>
      <Key frame="20%" :value="5"></Key>
      <Key frame="100%" :value="10"></Key>
    </Animation>
  </Entity>
<Scene>
```

#### Props

 - `frame` (Number|String) - what frame number this keyframe represents or a string percentage (`XX%`) of the duration
 - `value` (any) - the value to set the property to at this keyframe
 - `inTangent` (Vector3) - Optional spline interpolation mode
 - `outTangent` (Vector3) - Optional spline interpolation mode
