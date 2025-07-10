export const useMainStore = defineStore("main", {
    state: () => ({
        loadingProgress: 0,
        threeAnimationFrame: 0,
        isCanvasVisible: true,
        canvasPositionX: -0.051,
        isHeaderDark: false
    }),
    getters: {
        getThreeAnimationProgress: (state) => state.threeAnimationFrame / 1200
    },
    actions: {
        updateLoadingProgress(progress) {
            if (progress < this.loadingProgress) return;
            this.loadingProgress = progress;
        },
        updateThreeAnimationFrame(frame) {
            this.threeAnimationFrame = frame;
        },
        updateCanvasVisibility(isVisible) {
            this.isCanvasVisible = isVisible;
        },
        updateCanvasPositionX(positionX) {
            this.canvasPositionX = positionX;
        },
        toggleHeaderDarkMode(isDark) {
            this.isHeaderDark = isDark;
        }
    }
});
