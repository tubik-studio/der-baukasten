// GSAP
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import DrawSVGPlugin from "assets/js/DrawSVGPlugin";
import SplitText from "assets/js/SplitText";
import ScrambleTextPlugin from "assets/js/ScrambleTextPlugin";

// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(DrawSVGPlugin);
gsap.registerPlugin(SplitText);
gsap.registerPlugin(ScrambleTextPlugin);

// Vertical resizes on mobile won't trigger a ScrollTrigger.refresh()
ScrollTrigger.config({
    ignoreMobileResize: true
});

// Inject plugin into app
export default defineNuxtPlugin(nuxtApp => {
    nuxtApp.provide('gsap', gsap);
    nuxtApp.provide('scrollTrigger', ScrollTrigger);
    nuxtApp.provide('splitText', SplitText);
    nuxtApp.provide('scrambleText', ScrambleTextPlugin);
});