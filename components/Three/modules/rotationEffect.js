import globals from "~/components/Three/modules/globals";

function lerp(start, end, alpha) {
    return start * (1 - alpha) + end * alpha;
}

export function updateRotationEffect(strength, lerpFactor = 0.025) {
    if (globals.cursorPosition && globals.cameraGroup && globals.currentLoadedModel) {
        const main = globals?.currentLoadedModel?.getObjectByName("Main_Bricks");
        const rooster = globals?.currentLoadedModel?.getObjectByName("Mega_Rooster");
        const storky = globals?.currentLoadedModel?.getObjectByName("Mega_Storky");

        const targetX = globals.cursorPosition.y * strength;
        const targetY = globals.cursorPosition.x * strength;

        if (main) {
            main.rotation.x = lerp(main.rotation.x, targetX, lerpFactor);
            main.rotation.y = lerp(main.rotation.y, targetY, lerpFactor);
        }

        if (rooster) {
            rooster.rotation.x = lerp(rooster.rotation.x, targetX, lerpFactor);
            rooster.rotation.y = lerp(rooster.rotation.y, targetY, lerpFactor);
        }

        if (storky) {
            storky.rotation.x = lerp(storky.rotation.x, targetX, lerpFactor);
            storky.rotation.y = lerp(storky.rotation.y, targetY, lerpFactor);
        }
    }
}
