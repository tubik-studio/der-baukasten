export default defineNuxtPlugin(() => {
    window.addEventListener("load", () => {
        history.scrollRestoration = "manual";
        window.scrollTo({ top: 0, left: 0 });
    });
});
