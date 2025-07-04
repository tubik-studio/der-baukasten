import GUI from "lil-gui";
import Stats from "stats.js";
import {
    NoToneMapping,
    LinearToneMapping,
    ReinhardToneMapping,
    CineonToneMapping,
    ACESFilmicToneMapping,
    AgXToneMapping,
    NeutralToneMapping
} from "three";

// Helpers
import * as materials from "./materials";
import globals from "./globals";
import params from "./params";

function addColorUniform(guiFolder, shaderUniforms, uniformKey, label) {
    const colorProxy = { [uniformKey]: `#${shaderUniforms[uniformKey].value.getHexString()}` };

    guiFolder
        .addColor(colorProxy, uniformKey)
        .name(label)
        .onChange((val) => {
            shaderUniforms[uniformKey].value.set(val);
        });
}

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
    const ModelFolder = gui.addFolder("Material");

    ModelFolder.add(params, "metalness")
        .name("Metalness")
        .min(0)
        .max(1)
        .step(0.01)
        .onChange((val) => {
            materials.red.metalness = val;
            materials.green.metalness = val;
            materials.blue.metalness = val;
            materials.yellow.metalness = val;
        });

    ModelFolder.add(params, "roughness")
        .name("Roughness")
        .min(0)
        .max(1)
        .step(0.01)
        .onChange((val) => {
            materials.red.roughness = val;
            materials.green.roughness = val;
            materials.blue.roughness = val;
            materials.yellow.roughness = val;
        });

    ModelFolder.add(params, "colorNoiseFreq")
        .name("Material Color Noise")
        .min(0)
        .max(2000)
        .step(50)
        .onChange((val) => {
            materials.red.userData.shaderUniforms.colorNoiseFreq.value = val;
            materials.green.userData.shaderUniforms.colorNoiseFreq.value = val;
            materials.blue.userData.shaderUniforms.colorNoiseFreq.value = val;
            materials.yellow.userData.shaderUniforms.colorNoiseFreq.value = val;
        });

    ModelFolder.add(params, "bumpNoiseFreq")
        .name("Material Bumps Noise")
        .min(0)
        .max(2000)
        .step(50)
        .onChange((val) => {
            materials.red.userData.shaderUniforms.bumpNoiseFreq.value = val;
            materials.green.userData.shaderUniforms.bumpNoiseFreq.value = val;
            materials.blue.userData.shaderUniforms.bumpNoiseFreq.value = val;
            materials.yellow.userData.shaderUniforms.bumpNoiseFreq.value = val;
        });

    ModelFolder.add(params, "bumpScale")
        .name("Material Bumps Scale")
        .min(0)
        .max(1)
        .step(0.01)
        .onChange((val) => {
            materials.red.userData.shaderUniforms.bumpScale.value = val;
            materials.green.userData.shaderUniforms.bumpScale.value = val;
            materials.blue.userData.shaderUniforms.bumpScale.value = val;
            materials.yellow.userData.shaderUniforms.bumpScale.value = val;
        });

    // Colors
    const ColorsFolder = gui.addFolder("Colors");

    addColorUniform(ColorsFolder, materials.red.userData.shaderUniforms, "uColor1", "Red Color 1");
    addColorUniform(ColorsFolder, materials.red.userData.shaderUniforms, "uColor2", "Red Color 2");

    addColorUniform(ColorsFolder, materials.blue.userData.shaderUniforms, "uColor1", "Blue Color 1");
    addColorUniform(ColorsFolder, materials.blue.userData.shaderUniforms, "uColor2", "Blue Color 2");

    addColorUniform(ColorsFolder, materials.green.userData.shaderUniforms, "uColor1", "Green Color 1");
    addColorUniform(ColorsFolder, materials.green.userData.shaderUniforms, "uColor2", "Green Color 2");

    addColorUniform(ColorsFolder, materials.yellow.userData.shaderUniforms, "uColor1", "Yellow Color 1");
    addColorUniform(ColorsFolder, materials.yellow.userData.shaderUniforms, "uColor2", "Yellow Color 2");

    // Lights
    const lightsFolder = gui.addFolder("Lights");

    // Light One
    if (globals.lightOne) {
        const lightOneFolder = lightsFolder.addFolder("Light 1");
        lightOneFolder.add(globals.lightOne, "visible").name("Light 1");
        lightOneFolder.addColor(globals.lightOne, "color");
        lightOneFolder.add(globals.lightOne, "intensity").min(0).max(50).step(1);
        lightOneFolder.add(globals.lightOne.position, "x").min(-20).max(20).step(0.01).name("pos x");
        lightOneFolder.add(globals.lightOne.position, "y").min(-20).max(20).step(0.01).name("pos y");
        lightOneFolder.add(globals.lightOne.position, "z").min(-20).max(20).step(0.01).name("pos z");
    }

    // Light Two
    if (globals.lightTwo) {
        const lightTwoFolder = lightsFolder.addFolder("Light 2");
        lightTwoFolder.add(globals.lightTwo, "visible").name("Light 2");
        lightTwoFolder.addColor(globals.lightTwo, "color");
        lightTwoFolder.add(globals.lightTwo, "intensity").min(0).max(50).step(1);
        lightTwoFolder.add(globals.lightTwo.position, "x").min(-20).max(20).step(0.01).name("pos x");
        lightTwoFolder.add(globals.lightTwo.position, "y").min(-20).max(20).step(0.01).name("pos y");
        lightTwoFolder.add(globals.lightTwo.position, "z").min(-20).max(20).step(0.01).name("pos z");
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
    // const cameraFolder = gui.addFolder("Camera");

    // Renderer
    const rendererFolder = gui.addFolder("Renderer");
    rendererFolder.add(globals.renderer, "toneMapping", {
        No: NoToneMapping,
        Linear: LinearToneMapping,
        Reinhard: ReinhardToneMapping,
        Cineon: CineonToneMapping,
        ACESFilmic: ACESFilmicToneMapping,
        AgX: AgXToneMapping,
        Neutral: NeutralToneMapping
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
