#### Description

Interact with observables exposed by Babylonjs objects

#### Details

The [BabylonJS guide to observables](https://doc.babylonjs.com/how_to/observables) and Vue's [custom events documentation](https://vuejs.org/v2/guide/components-custom-events.html) can be helpful here.

 - Components in this libraray expose observable subscribers as integrated with the Vue event system
 - The implementation is based on custom event's within Vue and uses Vue's `$listeners` property to efficiently register subscribers with their associated Observables.

#### Usage
