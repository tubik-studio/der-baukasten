import { MeshStandardMaterial, Color } from "three";
import snoiseGLSL from "../shaders/snoise.glsl";
import params from "./params";

function createCustomMaterial(color1, color2) {
    const material = new MeshStandardMaterial({
        metalness: params.metalness,
        roughness: params.roughness
    });

    material.userData.shaderUniforms = {
        uColor1: { value: new Color(color1) },
        uColor2: { value: new Color(color2) },
        bumpScale: { value: params.bumpScale },
        colorNoiseFreq: { value: params.colorNoiseFreq },
        bumpNoiseFreq: { value: params.bumpNoiseFreq }
    };

    material.onBeforeCompile = (shader) => {
        // Attach uniforms
        Object.entries(material.userData.shaderUniforms).forEach(([key, uniform]) => {
            shader.uniforms[key] = uniform;
        });

        // Add vPosition
        shader.vertexShader = `
            varying vec3 vPosition;
            ${shader.vertexShader}
        `.replace(
            `#include <worldpos_vertex>`,
            `#include <worldpos_vertex>
             vPosition = position;`
        );

        // Fragment Shader Modification
        shader.fragmentShader = `
            varying vec3 vPosition;
            uniform vec3 uColor1;
            uniform vec3 uColor2;
            uniform float bumpScale;
            uniform float colorNoiseFreq;
            uniform float bumpNoiseFreq;

            ${snoiseGLSL}

            ${shader.fragmentShader}
        `
            // 1. Color blending based on noise
            .replace(
                `#include <color_fragment>`,
                `#include <color_fragment>
                float noise = (snoise(vPosition * colorNoiseFreq) + 1.0) * 0.5;
                vec3 finalColor = mix(uColor1, uColor2, noise);
                diffuseColor.rgb = finalColor;`
            )
            // 2. Procedural bump normal injection
            .replace(
                `#include <normal_fragment_begin>`,
                `#include <normal_fragment_begin>
                float bumpNoise = snoise(vPosition * bumpNoiseFreq);
                float eps = 0.001;
            
                float n1 = snoise(vPosition + vec3(eps, 0.0, 0.0) * bumpNoiseFreq);
                float n2 = snoise(vPosition + vec3(0.0, eps, 0.0) * bumpNoiseFreq);
                float n3 = snoise(vPosition + vec3(0.0, 0.0, eps) * bumpNoiseFreq);
            
                vec3 grad = normalize(vec3(n1 - bumpNoise, n2 - bumpNoise, n3 - bumpNoise));
            
                normal = normalize(normal + grad * bumpScale);
                `
            );
    };

    return material;
}

// Export your color variants
const red = createCustomMaterial(params.redColor1, params.redColor2);
const blue = createCustomMaterial(params.blueColor1, params.blueColor2);
const green = createCustomMaterial(params.greenColor1, params.greenColor2);
const yellow = createCustomMaterial(params.yellowColor1, params.yellowColor2);

export { red, blue, green, yellow };
