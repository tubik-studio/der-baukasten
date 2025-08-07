import { Vector2 } from "three";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { SSAARenderPass } from "three/examples/jsm/postprocessing/SSAARenderPass.js";
import { ShaderPass } from "three/addons/postprocessing/ShaderPass.js";
import { OutputPass } from "three/addons/postprocessing/OutputPass.js";

// Globals
import globals from "./globals";

// Shaders
import vertexShader from "../shaders/vertex.glsl";
import fragmentShader from "../shaders/fragment.glsl";

// Activity tracking
let activity = 0;
let lastMoveTime = performance.now();

// Glitch effect pass
const glitchPass = new ShaderPass({
    uniforms: {
        tDiffuse: { value: null },
        uMouse: { value: new Vector2() },
        uMouseVelocity: { value: new Vector2() },
        uActivity: { value: 0.0 },
        uResolution: { value: new Vector2(window.innerWidth, window.innerHeight) },
        uBlockSize: { value: 28.0 },
        uRadius: { value: 150.0 },
        uTime: { value: 0.0 }
    },
    vertexShader: vertexShader,
    fragmentShader: fragmentShader
});

export default function initComposer() {
    globals.composer = new EffectComposer(globals.renderer);

    // SSAA render pass to improve the quality of the scene
    const renderPass = new SSAARenderPass(globals.scene, globals.camera, 4); // 4 samples
    globals.composer.addPass(renderPass);

    // Test glitch pass
    //globals.composer.addPass(glitchPass);

    // Output pass to correct the colors
    const outputPass = new OutputPass();
    globals.composer.addPass(outputPass);

    // Update uniforms on mouse move
    let lastMouse = new Vector2();
    let velocity = new Vector2();

    window.addEventListener("mousemove", (e) => {
        const now = performance.now();
        const newMouse = new Vector2(e.clientX, window.innerHeight - e.clientY);

        velocity.copy(newMouse).sub(lastMouse).multiplyScalar(0.1);
        lastMouse.copy(newMouse);

        glitchPass.uniforms.uMouse.value.copy(newMouse);
        glitchPass.uniforms.uMouseVelocity.value.copy(velocity);

        activity = 1.0; // full intensity on move
        lastMoveTime = now;
    });
}

export function updateGlitch(delta) {
    // Linear decay
    activity = Math.max(0, activity - delta * 1.5);
    glitchPass.uniforms.uActivity.value = activity;
    glitchPass.uniforms.uTime.value += 0.05;
}
