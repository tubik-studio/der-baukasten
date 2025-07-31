// Three.js
import { WebGLRenderer, Scene, Color, PCFSoftShadowMap, SRGBColorSpace, NoToneMapping } from "three";

// Helpers
import globals from "./globals";
import params from "./params";

export default function scene(canvas) {
    globals.canvas = canvas;

    // Renderer
    globals.renderer = new WebGLRenderer({
        canvas: globals.canvas,
        antialias: false,
        stencil: false,
        depth: false,
        alpha: true
    });
    globals.renderer.outputColorSpace = SRGBColorSpace;
    globals.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Shadows
    globals.renderer.shadowMap.enabled = true;
    globals.renderer.shadowMap.type = PCFSoftShadowMap;
    globals.renderer.toneMapping = NoToneMapping;

    // Scene
    globals.scene = new Scene();
    globals.scene.background = new Color(0x000000);
}
