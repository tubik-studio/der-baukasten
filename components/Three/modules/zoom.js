import globals from "~/components/Three/modules/globals";

export default function zoom() {
    const canvas = globals.renderer.domElement;
    const aspect = canvas.clientWidth / canvas.clientHeight;

    // Zoom
    const zoomLevel = Math.min(1, Math.max(1 + (aspect - 1.8) * 0.4, 0.75));

    if (globals.camera) {
        globals.camera.zoom = zoomLevel;
        globals.camera.updateProjectionMatrix();
    }

    if (globals.device) {
        globals.device.scale.set(zoomLevel, zoomLevel, zoomLevel);
    }
}
