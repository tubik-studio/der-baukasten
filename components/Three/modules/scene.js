// Three.js
import { WebGLRenderer, Scene, Color, PCFSoftShadowMap, NeutralToneMapping, SRGBColorSpace } from "three";

// Helpers
import globals from "./globals";
import params from "./params";

export default function scene(canvas) {
    globals.canvas = canvas;

    // Renderer
    globals.renderer = new WebGLRenderer({
        canvas: globals.canvas,
        //antialias: true,
        alpha: true
        //powerPreference: "high-performance"
    });
    globals.renderer.outputColorSpace = SRGBColorSpace;
    globals.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Shadows
    globals.renderer.shadowMap.enabled = true;
    globals.renderer.shadowMap.type = PCFSoftShadowMap;
    globals.renderer.toneMapping = NeutralToneMapping;

    // Scene
    globals.scene = new Scene();
    globals.scene.background = new Color(0x000000);
}
