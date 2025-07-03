// Three
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

// Helpers
import globals from "./globals";

export default function controls() {
    globals.cameraControls = new OrbitControls(globals.camera, globals.canvas);
    globals.cameraControls.enabled = false;
    globals.cameraControls.enableDamping = true;
    globals.cameraControls.autoRotate = false;
    globals.cameraControls.update();
}
