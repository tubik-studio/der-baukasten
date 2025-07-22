import globals from "~/components/Three/modules/globals";

function lerp(start, end, alpha) {
    return start * (1 - alpha) + end * alpha;
}

function clipValue(value, min, max) {
    return Math.max(Math.min(value, max), min) || 0;
}

const targetX = ref(0);
const targetY = ref(0);

export function updateRotationEffect(strength, cursorPosition, deviceOrientation, lerpFactor = 0.025) {
    if (globals.cameraGroup && globals.currentLoadedModel) {
        const main = globals?.currentLoadedModel?.getObjectByName("Main_Bricks");
        const rooster = globals?.currentLoadedModel?.getObjectByName("Mega_Rooster");
        const storky = globals?.currentLoadedModel?.getObjectByName("Mega_Storky");

        const leftToRight = clipValue(deviceOrientation?.gamma?.value, -90, 90) || 0;
        const frontToBack = clipValue(deviceOrientation?.beta?.value, -90, 90) || 0;

        if (leftToRight !== 0 || frontToBack !== 0) {
            targetX.value = ((frontToBack - 45) / 90) * strength * -2;
            targetY.value = (leftToRight / 90) * strength * -2;
        } else {
            targetX.value = cursorPosition.y * strength;
            targetY.value = cursorPosition.x * strength;
        }

        if (main) {
            main.rotation.x = lerp(main.rotation.x, targetX.value, lerpFactor);
            main.rotation.y = lerp(main.rotation.y, targetY.value, lerpFactor);
        }

        if (rooster) {
            rooster.rotation.x = lerp(rooster.rotation.x, targetX.value, lerpFactor);
            rooster.rotation.y = lerp(rooster.rotation.y, targetY.value, lerpFactor);
        }

        if (storky) {
            storky.rotation.x = lerp(storky.rotation.x, targetX.value, lerpFactor);
            storky.rotation.y = lerp(storky.rotation.y, targetY.value, lerpFactor);
        }
    }
}
