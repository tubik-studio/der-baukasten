function setListener(nuxtApp) {
    document.addEventListener("click", (e) => {
        const link = e.target.closest("a");

        if (!link) return;

        const hash = link.hash;
        if (!hash || !hash.startsWith("#")) return;

        e.preventDefault();

        if (hash === "#") {
            console.warn("Section name is not specified");
            return;
        }

        const $section = document.querySelector(hash);
        const scrollValue = $section.getBoundingClientRect().top + window.scrollY;

        nuxtApp.$lenis.value.scrollTo(scrollValue, {
            lerp: 0.1,
            offset: -100,
            force: true
        });
    });
}

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.hook("app:suspense:resolve", () => {
        setTimeout(() => setListener(nuxtApp), 350);
    });
});
