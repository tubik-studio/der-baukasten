<template>
    <div class="canvas">
        <canvas ref="$refCanvas"></canvas>
    </div>
</template>

<script setup>
    import { useWindowSize } from "@vueuse/core";
    import { useMainStore } from "~/stores/mainStore";

    // Three.js
    import { Clock } from "three";

    // Global variables
    import globals from "./modules/globals";

    // Modules
    import { resizeRendererToDisplaySize } from "./modules/responsiveness";
    import initScene from "./modules/scene";
    import initCamera from "./modules/camera";
    import initLights from "./modules/lights";
    import initControls from "./modules/controls";
    import loadModel from "./modules/model";
    import zoom from "./modules/zoom";
    import { setCursorListener } from "./modules/cursorPosition";
    import { initGui, initStats, startStats, endStats } from "./modules/gui";
    import { updateAnimationMixer } from "./modules/animations.js";
    import { updateMagneticRepulsion } from "./modules/magneticRepulsion";

    // Globals
    const mainStore = useMainStore();
    const nuxtApp = useNuxtApp();

    // Route
    const route = useRoute();

    // Refs
    const $refCanvas = ref(null);

    // Window size
    const { width: windowWidth, height: windowHeight } = useWindowSize();

    function init(callback) {
        // ===== 🖼️ CANVAS, RENDERER, & SCENE =====
        initScene($refCanvas.value);

        // ===== 💡 LIGHTS =====
        initLights();

        // ===== 🎥 CAMERA =====
        initCamera();

        // ===== LOAD THE MAIN MODEL =====
        loadModel();

        // ===== 🕹️ CONTROLS =====
        initControls();

        // ===== 📈 STATS & CLOCK =====
        globals.clock = new Clock();

        // ===== 🐞 DEBUG GUI ====
        initGui(route);

        // ===== 🖱️ CURSOR POSITION =====
        setCursorListener();

        // ===== 📊 STATS ====
        initStats(route);

        // ===== 🧰 CALLBACK =====
        callback();
    }

    function animate() {
        requestAnimationFrame(animate);

        // ===== 🐞 STATS ====
        startStats();

        // Resize the renderer if the canvas size has changed
        if (resizeRendererToDisplaySize(globals.renderer)) {
            // Update zoom
            zoom();
        }

        // Get the passed time since the last frame
        const delta = globals.clock.getDelta();

        // Update the animation mixer from the blender model
        updateAnimationMixer(mainStore.getThreeAnimationProgress, delta);

        // Update magnetic repulsion
        updateMagneticRepulsion(mainStore.threeMagneticRepulsionStrength);

        // Update main components
        globals.cameraControls.update();
        globals.renderer.render(globals.scene, globals.camera);

        // ===== 🐞 STATS ====
        endStats();
    }

    // Initialize the scene when the component is mounted
    onMounted(() => {
        init(() => {
            animate();
        });
    });

    // Scene x position setter
    let xSetter;
    let ySetter;

    onMounted(() => {
        xSetter = nuxtApp.$gsap.quickSetter($refCanvas.value, "x", "px");
        xSetter(mainStore.canvasPositionX * windowWidth.value);
        ySetter = nuxtApp.$gsap.quickSetter($refCanvas.value, "y", "px");
        ySetter(mainStore.canvasPositionY * windowHeight.value);
    });

    watch(
        () => mainStore.canvasPositionX,
        (x) => {
            xSetter(x * windowWidth.value);
        }
    );

    watch(
        () => mainStore.canvasPositionY,
        (y) => {
            ySetter(y * windowHeight.value);
        }
    );
</script>

<style lang="scss" scoped>
    .canvas {
        position: fixed;
        height: 100vh;
        width: 100%;
        inset: 0;

        canvas {
            width: 100%;
            height: 100%;
            outline: none;
        }
    }
</style>
