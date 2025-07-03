import { MeshStandardMaterial, Color } from "three";
import snoiseGLSL from "../shaders/snoise.glsl";

// Common shader code to inject
const injectColorChunk = `
    float noise = (snoise(vPosition * 1200.0) + 1.0) * 0.5;
    vec3 finalColor = mix(uColor1, uColor2, noise);
    diffuseColor.rgb = finalColor;
`;

function createCustomMaterial(color1, color2) {
    const material = new MeshStandardMaterial({
        roughness: 1.0,
        metalness: 0.0
    });

    material.onBeforeCompile = (shader) => {
        // Inject custom uniforms
        shader.uniforms.uColor1 = { value: new Color(color1) };
        shader.uniforms.uColor2 = { value: new Color(color2) };

        // Add your snoise() GLSL and vPosition varying
        shader.vertexShader = `
            varying vec3 vPosition;
            ${shader.vertexShader}
        `.replace(
            `#include <worldpos_vertex>`,
            `#include <worldpos_vertex>
             vPosition = position;`
        );

        shader.fragmentShader = `
            varying vec3 vPosition;
            uniform vec3 uColor1;
            uniform vec3 uColor2;

            ${snoiseGLSL}
            ${shader.fragmentShader}
        `.replace(
            `#include <color_fragment>`,
            `#include <color_fragment>
             ${injectColorChunk}`
        );
    };

    return material;
}

// Export your color variants
const red = createCustomMaterial("#DA350C", "#FF582E");
const blue = createCustomMaterial("#003AFF", "#0074FF");
const green = createCustomMaterial("#00805B", "#00956A");
const yellow = createCustomMaterial("#FF8F2D", "#FFBE40");

export { red, blue, green, yellow };
