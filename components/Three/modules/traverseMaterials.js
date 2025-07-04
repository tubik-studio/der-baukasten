import * as materials from "./materials";

import { MeshStandardMaterial } from "three";

export default function traverseMaterials(child) {
    if (child.type === "Mesh" && child.material) {
        child.material = materials[child.material.name.toLowerCase()] || child.material;
        //child.material = new MeshStandardMaterial({ color: 0xff0000 });
        child.castShadow = true;
        child.receiveShadow = true;
    }
}
