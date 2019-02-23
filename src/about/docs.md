
#### What?
Vue-BabylonJS is a 3D graphics component plugin for Vue.js powered by BabylonJS. Vue-BabylonJS draws inspiration from A-Frame, but can be more performant with the exclusion of DOM manipulation and has closer ties to JavaScript through property binding syntax in Vue. Compared to ReactVR which uses A-Frame, Vue-BabylonJS has the potential for higher performance, more organized and decoupled components, and a higher-quality rendering engine.



#### Why?

We use BabylonJS because it is the most efficient, most feature-rich, and most modern WebGL graphics library available. The addition of Vue makes the engine reactive and development becomes easier to reason about and organize. Out-of-the-box mobile support and sensible defaults make getting started a breeze.

The underlying engine is easily accessible to give pros the tools to tweak every aspect of BabylonJS. The organizational structure of the library is a Component-Entity-System and the Entity component contains many powerful features such a matrix transformation to allow for interaction with the Scene graph like a group of HTML divs. Powerful tools are available such as an integrated reactive property system that enables modifying 3D objects within templates and a Shader component that makes adding WebGL shaders easy.
