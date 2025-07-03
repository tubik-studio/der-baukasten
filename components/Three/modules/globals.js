// This file is used to define global variables for the Three.js
// scene to access them from anywhere in the application.

export default {
    canvas: null,
    renderer: null,
    scene: null,
    ambientLight: null,
    pointLight: null,
    hemiLight: null,
    camera: null,
    cameraControls: null,
    clock: null,
    // Model
    currentLoadedModel: null,
    // Animations
    targetPlace: null,
    cameraPlace: null,
    animationMixers: [],
    animationsArray: []
};
