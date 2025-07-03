import globals from "./globals";

export function resizeRendererToDisplaySize(renderer, labelRenderer) {
    const canvas = renderer.domElement;
    const clientWidth = Math.floor(canvas?.clientWidth * window.devicePixelRatio);
    const clientHeight = Math.floor(canvas?.clientHeight * window.devicePixelRatio);
    const width = canvas?.width;
    const height = canvas?.height;
    const aspect = canvas.clientWidth / canvas.clientHeight;
    const needResize = width !== clientWidth || height !== clientHeight;

    if (needResize) {
        // Resize
        if (renderer) {
            renderer.setSize(canvas?.clientWidth, canvas?.clientHeight, false);
        }

        if (labelRenderer) {
            labelRenderer.setSize(canvas?.clientWidth, canvas?.clientHeight);
        }

        // Update OrthographicCamera properties on resize
        if (globals.camera) {
            const frustumHeight = globals.camera.userData.frustumHeight;

            if (typeof frustumHeight === "number") {
                globals.camera.left = (frustumHeight * aspect) / -2;
                globals.camera.right = (frustumHeight * aspect) / 2;
                globals.camera.top = frustumHeight / 2;
                globals.camera.bottom = frustumHeight / -2;
                globals.camera.updateProjectionMatrix();
            }
        }
    }

    return needResize;
}
