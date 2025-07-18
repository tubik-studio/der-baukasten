// Three
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

// Helpers
import globals from "./globals";

export default function initControls() {
    const controls = new OrbitControls(globals.camera, globals.canvas);
    //globals.cameraControls.enabled = false;
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.minDistance = 1;
    controls.maxDistance = 10;
    controls.enablePan = false;
    controls.enableZoom = false;
    controls.enableRotate = false;
    controls.update();
    globals.cameraControls = controls;
}
