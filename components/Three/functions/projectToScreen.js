import { Vector3 } from "three";

export default function project3DTo2DScreen(object, camera, canvas) {
    if (!object || !camera || !canvas) return;

    // Create a vector to hold the 3D point
    const vector = object.getWorldPosition(new Vector3(0, 0, 0)).clone();

    // Project the 3D point to normalized device coordinates (NDC)
    // This is done by multiplying the point by the camera's model-view matrix
    // and then by the camera's projection matrix.
    vector.project(camera);

    // Convert normalized device coordinates (NDC) to screen coordinates.
    // NDC range from -1 to +1 in x and y.
    // Screen coordinates range from 0 to canvas.width and 0 to canvas.height.

    const x = (vector.x * 0.5 + 0.5) * canvas.clientWidth;
    const y = (vector.y * -0.5 + 0.5) * canvas.clientHeight; // Y is inverted

    return {
        x: x,
        y: y,
        // z can be useful for depth testing or occlusion
        z: vector.z
    };
}
