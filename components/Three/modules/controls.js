// Three
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

// Helpers
import globals from "./globals";

export default function controls() {
    globals.cameraControls = new OrbitControls(globals.camera, globals.canvas);
    //globals.cameraControls.enabled = false;
    controls.enableDamping = true; // For smooth movement
    controls.dampingFactor = 0.05; // Adjust for desired smoothness
    controls.minDistance = 1; // Set reasonable limits
    controls.maxDistance = 10; // Set reasonable limits
    controls.enablePan = false;
    controls.enableZoom = false;
    controls.enableRotate = false;
    globals.cameraControls.update();
}
