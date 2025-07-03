// Helpers
import globals from "./globals";
import { populateAnimationMixer } from "./animationMixer";
import traverseMaterials from "./traverseMaterials";
import zoom from "./zoom";

// Nuxt App
const nuxtApp = useNuxtApp();

export default function model() {
    // Remove a previously loaded model and clean up its resources
    if (globals.currentLoadedModel) {
        globals.scene.remove(globals.currentLoadedModel);
        globals.currentLoadedModel = null;
    }

    // Load the new GLTF model
    nuxtApp.$gltfLoader.load(
        "three/model.glb",
        (gltf) => {
            globals.currentLoadedModel = gltf.scene;

            // Traverse the loaded model and apply materials
            globals.currentLoadedModel.traverse((child) => {
                traverseMaterials(child);
            });

            // Parse the model's animations
            populateAnimationMixer(gltf);

            // Add the loaded model to the scene
            globals.scene.add(globals.currentLoadedModel);

            // Zoom
            zoom();
        },
        undefined,
        (error) => {
            console.error("An error happened while loading the GLTF model:", error);
        }
    );
}
