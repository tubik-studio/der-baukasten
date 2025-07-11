import Lenis from "lenis";

export default defineNuxtPlugin((nuxtApp) => {
    let lenis = {};

    // Instantiate Lenis
    lenis = new Lenis({
        lerp: 0.05
    });

    // Stop Lenis initially
    lenis.stop();

    // Integrate with GSAP's ticker for smooth animations
    nuxtApp.$gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });

    // Update ScrollTrigger on Lenis scroll events
    lenis.on("scroll", () => {
        nuxtApp.$scrollTrigger.update();
    });

    // Provide the lenis instance to the Nuxt app
    nuxtApp.provide("lenis", lenis);
});
