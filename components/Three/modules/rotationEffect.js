import globals from "~/components/Three/modules/globals";

function lerp(start, end, alpha) {
    return start * (1 - alpha) + end * alpha;
}

const targetX = ref(0);
const targetY = ref(0);

export function updateRotationEffect(strength, cursorPosition, deviceOrientation, lerpFactor = 0.025) {
    if (globals.cameraGroup && globals.currentLoadedModel) {
        const main = globals?.currentLoadedModel?.getObjectByName("Main_Bricks");
        const rooster = globals?.currentLoadedModel?.getObjectByName("Mega_Rooster_Rotation");
        const storky = globals?.currentLoadedModel?.getObjectByName("Mega_Storky_Rotation");

        if (deviceOrientation.x !== 0 || deviceOrientation.y !== 0) {
            targetX.value = ((deviceOrientation.x - 45) / 90) * strength * -2;
            targetY.value = (deviceOrientation.y / 90) * strength * -2;
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
