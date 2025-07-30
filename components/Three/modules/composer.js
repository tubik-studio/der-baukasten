import { Vector2 } from "three";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { ShaderPass } from "three/addons/postprocessing/ShaderPass.js";
import { OutputPass } from "three/addons/postprocessing/OutputPass.js";
import { FXAAShader } from "three/addons/shaders/FXAAShader.js";

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
    // globals.composer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    // globals.composer.setSize(window.innerWidth, window.innerHeight);

    const renderPass = new RenderPass(globals.scene, globals.camera);
    globals.composer.addPass(renderPass);

    globals.composer.addPass(glitchPass);

    //
    const outputPass = new OutputPass();
    globals.composer.addPass(outputPass);

    //globals.composer.addPass(new ShaderPass(FXAAShader));

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
