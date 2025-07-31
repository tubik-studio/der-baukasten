import { Vector2, ShaderMaterial } from "three";
import { EffectComposer, RenderPass, EffectPass, ShaderPass, SMAAEffect, SMAAPreset } from "postprocessing";

// Globals
import globals from "./globals";

// Shaders - Make sure these files have the correct code from above!
import vertexShader from "../shaders/vertex.glsl";
import fragmentShader from "../shaders/fragment.glsl";

// --- ADD THIS FOR DEBUGGING ---
console.log("Vertex Shader Loaded:", vertexShader);
console.log("Fragment Shader Loaded:", fragmentShader);

// Create the ShaderMaterial in a constant. This makes it easy to access later.
const glitchMaterial = new ShaderMaterial({
    uniforms: {
        tDiffuse: { value: null },
        uMouseVelocity: { value: new Vector2(0, 0) },
        uBlockSize: { value: 50.0 }, // The number of horizontal blocks
        uIntensity: { value: 0.8 } // Master intensity for the effect
    },
    vertexShader: vertexShader,
    fragmentShader: fragmentShader
});

// Pass the material instance to the ShaderPass.
const glitchPass = new ShaderPass(glitchMaterial);

export default function initComposer() {
    globals.composer = new EffectComposer(globals.renderer);

    globals.composer.addPass(new RenderPass(globals.scene, globals.camera));
    globals.composer.addPass(glitchPass);
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
    mouseVelocity.multiplyScalar(0.93);

    if (Math.abs(mouseVelocity.x) < 0.0001) {
        mouseVelocity.x = 0;
    }

    // **CORRECTED UPDATE**
    // Update the uniform on the material instance directly.
    // This is safer than accessing `glitchPass.fullscreenMaterial`.
    glitchMaterial.uniforms.uMouseVelocity.value.x = mouseVelocity.x;
}
