export const useCursorStore = defineStore("cursor", {
    state: () => ({
        isEnabled: true,
        isVisible: false,
        isLoading: false,
        position: { x: 0, y: 0 },
        alpha: 0,
        scale: 1,
        icon: "",
        iconTheme: "dark",
        theme: "default",
        snapId: "",
        snapTarget: ""
    }),
    getters: {},
    actions: {
        setCursorType(type) {
            this.type = type;
        },
        setCursorPosition({ x, y }) {
            this.position = { x, y };
        },
        setCursorScale(scale) {
            this.scale = scale;
        },
        setCursorAlpha(alpha) {
            this.alpha = alpha;
        },
        setCursorVisibility(mode) {
            this.isVisible = mode;
        },
        setCursorLoading(mode) {
            this.isLoading = mode;
        },
        setCursorIcon(icon) {
            this.icon = icon;
        },
        setCursorIconTheme(theme) {
            this.iconTheme = theme;
        },
        setCursorTheme(theme) {
            this.theme = theme; // default, light, dark
        },
        setCursorSnapId(id) {
            this.snapId = id;
        },
        setCursorSnapTarget(id) {
            this.snapTarget = id;
        },
        enableCursor() {
            this.isEnabled = true;
        },
        disableCursor() {
            this.isEnabled = false;
        },
        updateCursorPosition(position) {
            this.setCursorPosition(position);
        },
        changeCursorVisibility(isVisible) {
            this.setCursorVisibility(isVisible);
            this.setCursorAlpha(isVisible ? 1 : 0);
        },
        changeCursorType(type) {
            this.setCursorType(type);

            if (type === "default") {
                this.setCursorScale(1);
            } else if (type === "hover") {
                this.setCursorScale(3);
            } else if (type === "hide") {
                this.setCursorScale(0);
            } else if (type === "drag") {
                this.setCursorScale(3);
            }
        },
        changeCursorIcon(icon) {
            this.setCursorIcon(icon);
        },
        changeCursorIconTheme(theme) {
            this.setCursorIconTheme(theme);
        },
        changeCursorSnapId(id) {
            this.setCursorSnapId(id);
        }
    }
});
