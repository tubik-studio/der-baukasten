// Imports
import gsap from "gsap";
import SplitText from "/assets/js/SplitText";
import { Events, TRANSITION_ENTER_DONE } from "~/assets/js/Events";

// Register plugin
gsap.registerPlugin(SplitText);

// Transitions store
const transitions = [];

function addTextTransitions($splitTarget, $scrollTrigger, delay = 0.25) {
    const splitText = new SplitText($splitTarget, {
        type: "lines",
        linesClass: "text-appear__line"
    });

    gsap.set($splitTarget, { alpha: 0 });

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: $scrollTrigger
        }
    });

    tl.set($splitTarget, {
        alpha: 1
    }).from(splitText.lines, {
        y: "2rem",
        alpha: 0,
        duration: 0.75,
        stagger: 0.075,
        ease: "power3.out"
    }, delay);

    transitions.push(tl);
}

function addElementTransitions($target, $scrollTrigger, delay = 0.25) {
    const tr = gsap.to($target, {
        y: 0,
        alpha: 1,
        duration: 0.75,
        stagger: (id) => delay + 0.075 * id,
        ease: "power3.out",
        scrollTrigger: {
            trigger: $scrollTrigger
        }
    });

    transitions.push(tr);
}

function initElementAppears() {
    const $targets = document.querySelectorAll("[data-appear-element]");

    $targets.forEach(($target) => {
        addElementTransitions($target, $target, Number($target.dataset.appearElement) || 0.25);
    });
}

function initTextAppears() {
    const $targets = document.querySelectorAll("[data-appear-text]");

    $targets.forEach(($target) => {
        addTextTransitions($target, $target, Number($target.dataset.appearText) || 0.25);
    });
}

export default defineNuxtPlugin(nuxtApp => {
    nuxtApp.$router.beforeEach((to, from, next) => {
        if (to.path === from.path && transitions.length) return;

        transitions.length ? transitions.forEach((tr) => {
            tr.scrollTrigger.kill();
            tr.kill();
        }) : false;
        transitions.splice(0, transitions.length);

        next();
    });

    nuxtApp.$router.afterEach((to, from) => {
        if (to.path === from.path && transitions.length) return;

        Events.addEventListener(TRANSITION_ENTER_DONE, initTextAppears);
        Events.addEventListener(TRANSITION_ENTER_DONE, initElementAppears);
    });
});