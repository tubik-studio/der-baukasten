import globals from "./globals";
import traverseOptions from "./traverseOptions";
import * as materials from "./materials";

export default function traverseMaterials(child) {
    if (child.type === "Mesh" && child.material) {
        switch (child.material.name) {
            case "Red":
                child.material = materials.red;
                break;
            case "Blue":
                child.material = materials.blue;
                break;
            case "Green":
                child.material = materials.green;
                break;
            case "Yellow":
                child.material = materials.yellow;
                break;
        }
        //console.log(child.material);
        //child.material = materials.red;
    }
}
