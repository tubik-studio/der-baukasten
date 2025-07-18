import globals from "~/components/Three/modules/globals";

function lerp(start, end, alpha) {
    return start * (1 - alpha) + end * alpha;
}

export function updateRotationEffect(strength, lerpFactor = 0.025) {
    if (globals.cursorPosition && globals.cameraGroup) {
        // globals.cameraGroup.rotation.x = globals.cursorPosition.y * strength;
        // globals.cameraGroup.rotation.y = globals.cursorPosition.x * strength;

        const targetX = globals.cursorPosition.y * strength;
        const targetY = globals.cursorPosition.x * strength;

        globals.cameraGroup.rotation.x = lerp(globals.cameraGroup.rotation.x, targetX, lerpFactor);
        globals.cameraGroup.rotation.y = lerp(globals.cameraGroup.rotation.y, targetY, lerpFactor);
    }
}
