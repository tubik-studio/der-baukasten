// GSAP
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import DrawSVGPlugin from "gsap/DrawSVGPlugin";
import SplitText from "gsap/SplitText";
import ScrambleTextPlugin from "gsap/ScrambleTextPlugin";

// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin, SplitText, ScrambleTextPlugin);

// Vertical resizes on mobile won't trigger a ScrollTrigger.refresh()
ScrollTrigger.config({
    ignoreMobileResize: true
});

// Inject plugin into app
export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.provide("gsap", gsap);
    nuxtApp.provide("scrollTrigger", ScrollTrigger);
    nuxtApp.provide("splitText", SplitText);
    nuxtApp.provide("scrambleText", ScrambleTextPlugin);
});
