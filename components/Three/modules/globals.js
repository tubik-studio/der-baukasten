// This file is used to define global variables for the Three.js
// scene to access them from anywhere in the application.

export default {
    canvas: null,
    renderer: null,
    scene: null,
    ambientLight: null,
    lightOne: null,
    lightTwo: null,
    hemiLight: null,
    camera: null,
    cameraGroup: null,
    cameraControls: null,
    clock: null,
    // Model
    currentLoadedModel: null,
    // Animations
    targetPlace: null,
    cameraPlace: null,
    animationMixers: [],
    animationsArray: [],
    // Cursor
    cursorPosition: null,
    // Magnetic repulsion effect
    magneticRepulsionEnabled: true
};
