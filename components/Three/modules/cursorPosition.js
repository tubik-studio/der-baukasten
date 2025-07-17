import globals from "./globals";
import { Vector2 } from "three";

export function setCursorListener() {
    globals.cursorPosition = new Vector2();

    window.addEventListener("mousemove", (e) => {
        globals.cursorPosition.x = (e.clientX / window.innerWidth) * 2 - 1;
        globals.cursorPosition.y = (e.clientY / window.innerHeight) * 2 - 1;
    });
}
