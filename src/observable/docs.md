#### Description

Interact with observables exposed by Babylonjs objects

#### Details

The [BabylonJS guide to observables](https://doc.babylonjs.com/how_to/observables) and Vue's [custom events documentation](https://vuejs.org/v2/guide/components-custom-events.html) can be helpful here.

 - Components in this libraray expose observable subscribers as integrated with the Vue event system
 - Attributes in the form `@some-name$` will become an observer using the `onSomeNameObservable` property on the underlying Babylonjs object.
 - The listener will attempt to find a matching observable on the underlying object and in the event that one does not exist will attempt to match one on the parent scene.
 - Use the `.once` modifier on the listner attribute to only run the listner function once.
 - The implementation is based on custom events within Vue and uses Vue's `$listeners` property to efficiently register subscribers with their associated Observables.

#### Usage

For your convenience here is a mapping of listner attribute to BabylonJS Observable on all of the current Scene class observables.

**Scene observables checked during each renderLoop (in the order they are checked)**

| Event Prop | Scene Object Observable Name |
| --- | --- |
| `@before-animations$` | onBeforeAnimationsObservable |
| `@after-animations$` | onAfterAnimationsObservable |
| `@before-physics$` | onBeforePhysicsObservable |
| `@after-physics$` | onAfterPhysicsObservable |
| `@before-render$` | onBeforeRenderObservable |
| `@before-render-targets-render$` | onBeforeRenderTargetsRenderObservable |
| `@after-render-targets-render$` | onAfterRenderTargetsRenderObservable |
| `@before-camera-render$` | onBeforeCameraRenderObservable |
| `@before-active-meshes-evaluation$` | onBeforeActiveMeshesEvaluationObservable |
| `@after-active-meshes-evaluation$` | onAfterActiveMeshesEvaluationObservable |
| `@before-particles-rendering$` | onBeforeParticlesRenderingObservable |
| `@after-particles-rendering$` | onAfterParticlesRenderingObservable |
| `@before-draw-phase$` | onBeforeDrawPhaseObservable |
| `@after-draw-phase$` | onAfterDrawPhaseObservable |
| `@after-camera-render$` | onAfterCameraRenderObservable |
| `@after-render$` | onAfterRenderObservable |

**Other Scene observables**

| Event Prop | Scene Object Observable Name |
| --- | --- |
| `@before-rendering-group$` | onBeforeRenderingGroupObservable |
| `@after-rendering-group$` | onAfterRenderingGroupObservable |
| `@before-sprites-rendering$` | onBeforeSpritesRenderingObservable |
| `@after-sprites-rendering$` | onAfterSpritesRenderingObservable |
| `@before-step$` | onBeforeStepObservable |
| `@after-step$` | onAfterStepObservable |
| `@new-camera-added$` | onNewCameraAddedObservable |
| `@camera-removed$` | onCameraRemovedObservable |
| `@data-loaded$` | onDataLoadedObservable |
| `@dispose$` | onDisposeObservable |
| `@new-geometry-added$` | onNewGeometryAddedObservable |
| `@geometry-removed$` | onGeometryRemovedObservable |
| `@pre-keyboard$` | onPreKeyboardObservable |
| `@keyboard$` | onKeyboardObservable |
| `@new-light-added$` | onNewLightAddedObservable |
| `@light-removed$` | onLightRemovedObservable |
| `@new-mesh-added$` | onNewMeshAddedObservable |
| `@mesh-removed$` | onMeshRemovedObservable |
| `@new-transform-node-added$` | onNewTransformNodeAddedObservable |
| `@transform-node-removed$` | onTransformNodeRemovedObservable |
| `@pre-pointer$` | onPrePointerObservable |
| `@pointer$` | onPointerObservable |
| `@ready$` | onReadyObservable |
