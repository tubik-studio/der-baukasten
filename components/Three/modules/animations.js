import globals from "~/components/Three/modules/globals";

// ===== ANIMATION MIXER FROM THE BLENDER =====
function updateAnimationMixer(progress, delta) {
    if (!globals.animationsArray.length || !globals.camera) return;

    const { cameraPlace, targetPlace } = globals;

    if (globals.animationMixers.length !== 0) {
        globals.animationMixers.forEach((mixer) => {
            mixer.update(delta);
        });
    }

    globals.animationsArray.forEach((action) => {
        action.time = progress * 20;
    });

    globals.camera.position.set(cameraPlace.position.x, cameraPlace.position.y, cameraPlace.position.z);
    globals.cameraControls.target.set(targetPlace.position.x, targetPlace.position.y, targetPlace.position.z);
    globals.cameraControls.update();
}

// ===== EXPORTS =====
export { updateAnimationMixer };
