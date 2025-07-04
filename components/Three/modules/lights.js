// Three
import { DirectionalLight, HemisphereLight, AmbientLight } from "three";

// Helpers
import params from "./params";
import globals from "./globals";

export default function initLights() {
    // Light 1
    const lightOne = new DirectionalLight(params.lightOneColor, params.lightOneIntensity);
    lightOne.position.set(-4.4, 0.12, 0.48);
    lightOne.castShadow = true;
    lightOne.shadow.radius = 1;
    lightOne.shadow.mapSize.set(2048, 2048);
    lightOne.shadow.bias = -0.001;
    lightOne.shadow.normalBias = 0.01;

    // Light 2
    const lightTwo = new DirectionalLight(params.lightTwoColor, params.lightTwoIntensity);
    lightTwo.position.set(4.4, -0.5, 2.19);
    lightTwo.castShadow = true;
    lightTwo.shadow.radius = 1;
    lightTwo.shadow.mapSize.set(2048, 2048);
    lightTwo.shadow.bias = -0.001;
    lightTwo.shadow.normalBias = 0.01;

    // Hemispheric light
    globals.hemiLight = new HemisphereLight(
        params.hemiLightColor,
        params.hemiLightGroundColor,
        params.hemiLightIntensity
    );
    globals.hemiLight.position.set(0, 50, 0);

    // Ambient light
    globals.ambientLight = new AmbientLight(params.ambientLightColor, params.ambientLightIntensity);

    // Store lights in globals
    globals.lightOne = lightOne;
    globals.lightTwo = lightTwo;

    // Add lights to the scene
    globals.scene.add(globals.lightOne);
    globals.scene.add(globals.lightTwo);
    globals.scene.add(globals.hemiLight);
    globals.scene.add(globals.ambientLight);
}
