import { Vector2, ShaderMaterial, Uniform } from "three";
import { EffectComposer, RenderPass, EffectPass, ShaderPass, SMAAEffect, SMAAPreset } from "postprocessing";

// Globals
import globals from "./globals";

// Shaders - Make sure these files have the correct code from above!
import vertexShader from "../shaders/vertex.glsl";
import fragmentShader from "../shaders/fragment.glsl";

// Create the ShaderMaterial in a constant. This makes it easy to access later.
const glitchMaterial = new ShaderMaterial({
    uniforms: {
        tDiffuse: new Uniform(null), // Will be provided by ShaderPass
        pixelSize: new Uniform(8.0), // The initial size of the pixels. Adjust as needed.
        resolution: new Uniform(new Vector2(window.innerWidth, window.innerHeight)) // Initial resolution
    },
    vertexShader: vertexShader,
    fragmentShader: fragmentShader
});

export default function initComposer() {
    globals.composer = new EffectComposer(globals.renderer);

    globals.composer.addPass(new RenderPass(globals.scene, globals.camera));
    globals.composer.addPass(new ShaderPass(glitchMaterial), "tDiffuse");
    globals.composer.addPass(
        new EffectPass(
            globals.camera,
            new SMAAEffect({
                preset: SMAAPreset.ULTRA
            })
        )
    );
}

// --- Mouse Velocity Logic ---
const mouseVelocity = new Vector2();
window.addEventListener("mousemove", (event) => {
    mouseVelocity.x += event.movementX * 0.01;
});

// --- Update Function ---
export function updateGlitch() {
    // mouseVelocity.multiplyScalar(0.93);
    //
    // if (Math.abs(mouseVelocity.x) < 0.0001) {
    //     mouseVelocity.x = 0;
    // }
    // **CORRECTED UPDATE**
    // Update the uniform on the material instance directly.
    // This is safer than accessing `glitchPass.fullscreenMaterial`.
    //glitchMaterial.uniforms.uMouseVelocity.value.x = mouseVelocity.x;
}
