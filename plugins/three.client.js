import { LoadingManager, TextureLoader } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";

// ===== Loading Manager =====
const loadingManager = new LoadingManager();

// ===== DRACO Loader =====
const dracoLoader = new DRACOLoader(loadingManager);

// Specify a path to a folder containing WASM/JS decoding libraries.
dracoLoader.setDecoderPath("/draco/");

// Optional: Pre-fetch Draco WASM/JS module.
dracoLoader.preload();

// ===== GLTF Loader =====
const gltfLoader = new GLTFLoader(loadingManager);

// Set the DRACO loader for the GLTF loader
gltfLoader.setDRACOLoader(dracoLoader);

// ===== Texture Loader =====
const textureLoader = new TextureLoader(loadingManager);

// Inject plugin into app
export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.provide("loadingManager", loadingManager);
    nuxtApp.provide("gltfLoader", gltfLoader);
    nuxtApp.provide("dracoLoader", dracoLoader);
    nuxtApp.provide("textureLoader", textureLoader);
});
