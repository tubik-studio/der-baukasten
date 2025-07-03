// Three
import { PointLight, HemisphereLight, AmbientLight } from "three";

// Helpers
import params from "./params";
import globals from "./globals";

export default function initLights() {
    // Point light
    globals.pointLight = new PointLight(params.pointLightColor, params.pointLightIntensity, 100);
    globals.pointLight.decay = params.pointLightDecay;
    globals.pointLight.position.set(-2, 2, 2);

    // Hemispheric light
    globals.hemiLight = new HemisphereLight(
        params.hemiLightColor,
        params.hemiLightGroundColor,
        params.hemiLightIntensity
    );
    globals.hemiLight.position.set(0, 50, 0);

    // Ambient light
    globals.ambientLight = new AmbientLight(params.ambientLightColor, params.ambientLightIntensity);

    // Add lights to the scene
    globals.scene.add(globals.pointLight);
    globals.scene.add(globals.hemiLight);
    globals.scene.add(globals.ambientLight);
}
