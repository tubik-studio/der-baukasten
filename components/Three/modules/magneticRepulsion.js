import { Raycaster, Plane, Vector3 } from "three";
import globals from "./globals";

// Parameters
const params = {
    // How far the mouse's influence reaches
    radius: 1,
    // A factor for how quickly the objects move. Higher is faster.
    lerpFactor: 0.03
};

// Module State
const raycaster = new Raycaster();
const plane = new Plane(new Vector3(0, 0, 1), 0);
const mouse3D = new Vector3();

const meshes = [];
const originalPositions = new Map();

// Finds all meshes in the loaded model and stores them and their initial positions.
export function initMagneticRepulsion() {
    if (!globals.currentLoadedModel) return;

    cleanupMagneticRepulsion();

    globals.currentLoadedModel.traverse((child) => {
        if (child.isMesh) {
            meshes.push(child);
            originalPositions.set(child.id, child.position.clone());
        }
    });
}

export function updateMagneticRepulsion(pushStrength) {
    if (!meshes.length) return;

    // Project mouse screen coordinates to 3D world space
    raycaster.setFromCamera(globals.cursorPosition, globals.camera);
    raycaster.ray.intersectPlane(plane, mouse3D);

    meshes.forEach((mesh) => {
        const originalPos = originalPositions.get(mesh.id);

        const meshWorldPosition = new Vector3();
        mesh.getWorldPosition(meshWorldPosition);

        const distance = meshWorldPosition.distanceTo(mouse3D);

        // By default, the target is the original position
        let targetPosition = originalPos.clone();

        if (distance < params.radius) {
            // Repel Logic
            const repulsionVector = new Vector3().subVectors(meshWorldPosition, mouse3D).normalize();
            const pushInfluence = 1 - distance / params.radius;

            // Set target
            targetPosition.x = originalPos.x + repulsionVector.x * pushInfluence * pushStrength;
            targetPosition.y = originalPos.y + repulsionVector.y * pushInfluence * pushStrength;
            targetPosition.z = originalPos.z + repulsionVector.z * pushInfluence * pushStrength;
        }

        // Apply Movement
        mesh.position.lerp(targetPosition, params.lerpFactor);
    });
}

// Cleans up stored data.
export function cleanupMagneticRepulsion() {
    meshes.length = 0;
    originalPositions.clear();
}
