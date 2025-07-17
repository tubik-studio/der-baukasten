// Three.js
import { OrthographicCamera, Group } from "three";

// Helpers
import globals from "~/components/Three/modules/globals";
import { populateAnimationMixer } from "./animationMixer";

// Nuxt App
const nuxtApp = useNuxtApp();

export default function camera() {
    const frustumHeight = 0.4; // Adjust this value to control the vertical visible span of the orthographic camera
    const aspect = globals.canvas.clientWidth / globals.canvas.clientHeight;

    globals.camera = new OrthographicCamera(
        (frustumHeight * aspect) / -2, // left
        (frustumHeight * aspect) / 2, // right
        frustumHeight / 2, // top
        frustumHeight / -2, // bottom
        -100, // near
        100 // far
    );

    // Create a group for the camera to allow mouse rotation independently
    globals.cameraGroup = new Group();
    globals.cameraGroup.add(globals.camera);
    globals.scene.add(globals.cameraGroup);

    // Set camera properties
    globals.camera.position.set(10, 10, 50);
    globals.camera.zoom = 1;
    globals.camera.userData.frustumHeight = frustumHeight; // Store for use in resize handling

    nuxtApp.$gltfLoader.load("/three/camera.glb", (gltf) => {
        const scene = gltf.scene;

        // Place the camera and target
        globals.targetPlace = scene.getObjectByName("Camera_Target");
        globals.cameraPlace = scene.getObjectByName("Camera_Move");

        globals.camera.position.set(
            globals.cameraPlace.position.x,
            globals.cameraPlace.position.y,
            globals.cameraPlace.position.z
        );
        globals.cameraControls.target.set(
            globals.targetPlace.position.x,
            globals.targetPlace.position.y,
            globals.targetPlace.position.z
        );

        // Parse the model's animations
        populateAnimationMixer(gltf);
    });
}
