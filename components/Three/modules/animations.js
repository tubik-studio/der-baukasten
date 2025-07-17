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

    if (globals.cursorPosition) {
        if (globals.cameraGroup) {
            globals.cameraGroup.rotation.x = globals.cursorPosition.y * 0.02;
            globals.cameraGroup.rotation.y = globals.cursorPosition.x * 0.04;
        }

        globals.cameraControls.target.set(
            targetPlace.position.x + globals.cursorPosition.x * 0.001,
            targetPlace.position.y + globals.cursorPosition.y * 0.001,
            targetPlace.position.z
        );
    }

    // globals.cameraControls.target.set(targetPlace.position.x, targetPlace.position.y, targetPlace.position.z);
    globals.cameraControls.update();
}

// ===== EXPORTS =====
export { updateAnimationMixer };
