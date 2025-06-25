import {
    Events,
    TRANSITION_ENTER,
    TRANSITION_ENTER_DONE,
    TRANSITION_LEAVE,
    TRANSITION_LEAVE_DONE
} from "assets/js/Events";

export function usePageTransition(name) {
    const nuxtApp = useNuxtApp();

    const pageTransition = {
        name: name,
        mode: "out-in",
        appear: true,
        css: false,
        onBeforeLeave: (el) => {},
        onLeave: (el, done) => {
            // Freeze the scroll position to prevent jumping
            nuxtApp.$lenis.stop();

            const tl = nuxtApp.$gsap.timeline({
                defaults: {
                    duration: 0.75,
                    ease: "power2.in",
                    clearProps: "opacity"
                },
                onStart: () => {
                    Events.dispatchEvent(TRANSITION_LEAVE);
                },
                onComplete: () => {
                    Events.dispatchEvent(TRANSITION_LEAVE_DONE);
                    done();
                }
            });

            tl.to(
                el,
                {
                    opacity: 0
                },
                0
            );
        },
        onAfterLeave: (el) => {},
        onBeforeEnter: (el) => {
            // Set initial state for entering elements
            nuxtApp.$gsap.set(el, { opacity: 0 });

            // Scroll to the top of the page
            nuxtApp.$lenis.scrollTo(0, {
                immediate: true,
                force: true
            });
        },
        onEnter: (el, done) => {
            // Re-enable Lenis scrolling
            nuxtApp.$lenis.start();

            const tl = nuxtApp.$gsap.timeline({
                defaults: {
                    duration: 0.75,
                    ease: "power2.out",
                    clearProps: "opacity"
                },
                onStart: () => {
                    Events.dispatchEvent(TRANSITION_ENTER);
                },
                onComplete: () => {
                    Events.dispatchEvent(TRANSITION_ENTER_DONE);
                    done();
                }
            });

            tl.to(
                el,
                {
                    opacity: 1
                },
                0
            );
        },
        onAfterEnter: (el) => {}
    };

    // Refresh scroll trigger after suspense resolves
    nuxtApp.hook("app:suspense:resolve", () => {
        setTimeout(() => nuxtApp.$scrollTrigger.refresh(), 300);
    });

    // Return page transition object with callbacks
    return pageTransition;
}
