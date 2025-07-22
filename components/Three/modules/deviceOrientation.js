import { useDeviceOrientation } from "@vueuse/core";
import globals from "./globals";

function clipValue(value, min, max) {
    return Math.max(Math.min(value, max), min) || 0;
}

export function setDeviceOrientationListener() {
    const deviceOrientation = useDeviceOrientation();

    watch(
        () => deviceOrientation,
        (value) => {
            globals.deviceOrientation.x = clipValue(value?.gamma.value, -90, 90) || 0;
            globals.deviceOrientation.y = clipValue(value?.beta.value, -90, 90) || 0;
        },
        {
            immediate: true,
            deep: true
        }
    );
}
