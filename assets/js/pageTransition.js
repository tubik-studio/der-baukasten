import {
    Events,
    TRANSITION_ENTER,
    TRANSITION_ENTER_DONE,
    TRANSITION_LEAVE,
    TRANSITION_LEAVE_DONE
} from "assets/js/Events";

const pageTransition = {
    name: "default",
    mode: "out-in",
    css: false,
    onBeforeEnter: () => {
        Events.dispatchEvent(TRANSITION_ENTER);
    },
    onEnter: (el, done) => {
        const nuxtApp = useNuxtApp();

        nuxtApp.$gsap.from(el, {
            alpha: 0,
            y: 10,
            duration: 0.5,
            clearProps: "all",
            onComplete: () => {
                done();
            }
        });
    },
    onAfterEnter: () => {
        Events.dispatchEvent(TRANSITION_ENTER_DONE);
    },
    onBeforeLeave: () => {
        Events.dispatchEvent(TRANSITION_LEAVE);
    },
    onLeave: (el, done) => {
        const nuxtApp = useNuxtApp();

        nuxtApp.$gsap.to(el, {
            alpha: 0,
            duration: 0.5,
            onComplete: () => {
                done();
            }
        });
    },
    onAfterLeave: () => {
        Events.dispatchEvent(TRANSITION_LEAVE_DONE);
    }
};

export default pageTransition;