// Three.js
import { AnimationMixer } from "three";

// Helpers
import globals from "~/components/Three/modules/globals";

export function populateAnimationMixer(gltf) {
    const animationMixer = new AnimationMixer(gltf.scene);
    globals.animationMixers.push(animationMixer);

    if (gltf.animations && gltf.animations.length) {
        gltf.animations.forEach((clip) => {
            const action = animationMixer.clipAction(clip);
            globals.animationsArray.push(action);
            action.reset().play().paused = true;
        });
    }
}
