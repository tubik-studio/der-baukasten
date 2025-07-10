import { Vector2, Raycaster, Plane, Vector3 } from "three";
import globals from "./globals";

// --- Parameters ---
const params = {
    // How far the mouse's influence reaches
    radius: 0.2,
    // A factor for how quickly the objects move. Higher is faster.
    lerpFactor: 0.03
};

// --- Module State ---
const mouse = new Vector2();
const raycaster = new Raycaster();
const plane = new Plane(new Vector3(0, 0, 1), 0);
const mouse3D = new Vector3();

const meshes = [];
const originalPositions = new Map();

// --- Core Functions ---

/**
 * Finds all meshes in the loaded model and stores them and their initial positions.
 */
export function initMagneticRepulsion() {
    if (!globals.currentLoadedModel) return;

    cleanupMagneticRepulsion();

    globals.currentLoadedModel.traverse((child) => {
        if (child.isMesh) {
            meshes.push(child);
            originalPositions.set(child.id, child.position.clone());
        }
    });

    window.addEventListener("mousemove", onMouseMove);
}

/**
 * This function should be called in your main animation loop (requestAnimationFrame).
 */
export function updateMagneticRepulsion(pushStrength) {
    if (!meshes.length) return;

    // Project mouse screen coordinates to 3D world space
    raycaster.setFromCamera(mouse, globals.camera);
    raycaster.ray.intersectPlane(plane, mouse3D);

    meshes.forEach((mesh) => {
        const originalPos = originalPositions.get(mesh.id);

        const meshWorldPosition = new Vector3();
        mesh.getWorldPosition(meshWorldPosition);

        const distance = meshWorldPosition.distanceTo(mouse3D);

        // By default, the target is the original position
        let targetPosition = originalPos.clone();

        if (distance < params.radius) {
            // --- Repel Logic ---
            const repulsionVector = new Vector3().subVectors(meshWorldPosition, mouse3D).normalize();
            const pushInfluence = 1 - distance / params.radius;

            // Set target
            targetPosition.x = originalPos.x + repulsionVector.x * pushInfluence * pushStrength;
            targetPosition.y = originalPos.y + repulsionVector.y * pushInfluence * pushStrength;
            targetPosition.z = originalPos.z + repulsionVector.z * pushInfluence * pushStrength;
        }

        // --- Apply Movement ---
        // Lerp to the target position. Since only the Z value of the target changes,
        // the object will only move along the Z-axis.
        mesh.position.lerp(targetPosition, params.lerpFactor);
    });
}

/**
 * Cleans up listeners and stored data.
 */
export function cleanupMagneticRepulsion() {
    window.removeEventListener("mousemove", onMouseMove);
    meshes.length = 0;
    originalPositions.clear();
}

// --- Event Handlers ---

function onMouseMove(event) {
    const canvas = globals.renderer.domElement;
    const rect = canvas.getBoundingClientRect();

    mouse.x = ((event.clientX - rect.left) / canvas.clientWidth) * 2 - 1;
    mouse.y = -((event.clientY - rect.top) / canvas.clientHeight) * 2 + 1;
}
