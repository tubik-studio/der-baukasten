import fitty from "fitty";

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.directive("fitty", {
        mounted(el) {
            fitty(el, {
                minSize: 12,
                maxSize: 1024
            });
        }
    });
});
