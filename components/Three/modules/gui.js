import GUI from "lil-gui";
import Stats from "stats.js";
import { NoToneMapping, LinearToneMapping, ReinhardToneMapping, CineonToneMapping, ACESFilmicToneMapping } from "three";

// Helpers
import * as materials from "./materials";
import globals from "./globals";

function isGuiEnabled(route) {
    return route?.hash === "#debug" || route?.hash === "#gui" || route?.hash === "#stats";
}

function clearGui() {
    document?.querySelector(".lil-gui")?.remove();
}

function clearStats() {
    document?.querySelector(".stats")?.remove();
}

export function initStats(route) {
    if (!isGuiEnabled(route)) return;

    clearStats();

    globals.stats = new Stats();
    globals.stats.showPanel(0); // 0: fps, 1: ms, 2: memory
    console.log(globals.stats);
    globals.stats.dom.classList.add("stats");
    document.body.appendChild(globals.stats.dom);
}

export function startStats() {
    if (globals.stats) {
        globals.stats.begin();
    }
}

export function endStats() {
    if (globals.stats) {
        globals.stats.end();
    }
}

export function initGui(route) {
    if (!isGuiEnabled(route)) return;

    clearGui();

    const gui = new GUI({
        title: "🐞 Debug GUI",
        width: 300
    });

    // Model material
    const ModelFolder = gui.addFolder("Model material");

    // Lights
    const lightsFolder = gui.addFolder("Lights");

    // Point light
    if (globals.pointLight) {
        const pointLightFolder = lightsFolder.addFolder("Point light");
        pointLightFolder.add(globals.pointLight, "visible").name("point light");
        pointLightFolder.addColor(globals.pointLight, "color");
        pointLightFolder.add(globals.pointLight, "intensity").min(0).max(50).step(1);
        pointLightFolder.add(globals.pointLight, "decay").min(0).max(10).step(1);
        pointLightFolder.add(globals.pointLight.position, "x").min(-10).max(10).step(0.1).name("pos x");
        pointLightFolder.add(globals.pointLight.position, "y").min(-10).max(10).step(0.1).name("pos y");
        pointLightFolder.add(globals.pointLight.position, "z").min(-10).max(10).step(0.1).name("pos z");
    }

    // Hemi light
    if (globals.hemiLight) {
        const hemiLightFolder = lightsFolder.addFolder("Hemi light");
        hemiLightFolder.add(globals.hemiLight, "visible").name("hemi light");
        hemiLightFolder.addColor(globals.hemiLight, "color");
        hemiLightFolder.addColor(globals.hemiLight, "groundColor");
        hemiLightFolder.add(globals.hemiLight, "intensity").min(0).max(2).step(0.1);
        hemiLightFolder.add(globals.hemiLight.position, "x").min(-50).max(50).step(1).name("pos x");
        hemiLightFolder.add(globals.hemiLight.position, "y").min(-50).max(50).step(1).name("pos y");
        hemiLightFolder.add(globals.hemiLight.position, "z").min(-50).max(50).step(1).name("pos z");
    }

    // Ambient light
    if (globals.ambientLight) {
        const ambientLightFolder = lightsFolder.addFolder("Ambient light");
        ambientLightFolder.add(globals.ambientLight, "visible").name("ambient light");
        ambientLightFolder.addColor(globals.ambientLight, "color");
        ambientLightFolder.add(globals.ambientLight, "intensity").min(0).max(2).step(0.1);
    }

    // Camera
    const cameraFolder = gui.addFolder("Camera");

    // Renderer
    const rendererFolder = gui.addFolder("Renderer");
    rendererFolder.add(globals.renderer, "toneMapping", {
        No: NoToneMapping,
        Linear: LinearToneMapping,
        Reinhard: ReinhardToneMapping,
        Cineon: CineonToneMapping,
        ACESFilmic: ACESFilmicToneMapping
    });

    // persist GUI state in local storage on changes
    gui.onFinishChange(() => {
        const guiState = gui.save();
        localStorage.setItem("guiState", JSON.stringify(guiState));
    });

    // load GUI state if available in local storage
    const guiState = localStorage.getItem("guiState");
    if (guiState) gui.load(JSON.parse(guiState));

    // reset GUI state button
    const resetGui = () => {
        localStorage.removeItem("guiState");
        gui.reset();
    };
    gui.add({ resetGui }, "resetGui").name("RESET");

    gui.close();
}
