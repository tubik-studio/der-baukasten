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
    // Animation Mixer
    animationMixers: [],
    animationsArray: [],
    // Cursor
    cursorPosition: null,
    // Device Orientation
    deviceOrientation: {
        x: 0, // gamma
        y: 0 // beta
    },
    // Magnetic repulsion effect
    magneticRepulsionEnabled: true
};
