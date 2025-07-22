import globals from "~/components/Three/modules/globals";

function lerp(start, end, alpha) {
    return start * (1 - alpha) + end * alpha;
}

export function updateRotationEffect(strength, cursorPosition, deviceOrientation, lerpFactor = 0.025) {
    if (globals.cameraGroup && globals.currentLoadedModel) {
        const main = globals?.currentLoadedModel?.getObjectByName("Main_Bricks");
        const rooster = globals?.currentLoadedModel?.getObjectByName("Mega_Rooster");
        const storky = globals?.currentLoadedModel?.getObjectByName("Mega_Storky");

        const targetX = ref(0);
        const targetY = ref(0);

        if (deviceOrientation) {
            const leftToRight = deviceOrientation.gamma.value;
            const frontToBack = deviceOrientation.beta.value;

            if (leftToRight !== 0 && frontToBack !== 0) {
                targetX.value = leftToRight * strength;
                targetY.value = frontToBack * strength;
            }
        } else {
            targetX.value = cursorPosition.y * strength;
            targetY.value = cursorPosition.x * strength;
        }

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
