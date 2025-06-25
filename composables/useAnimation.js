// Imports
import { Events, TRANSITION_ENTER, TRANSITION_ENTER_DONE, TRANSITION_LEAVE_DONE } from "assets/js/Events";

function cleanUpTransitions(transitions) {
    // Kill transitions and scroll triggers on page leave
    if (transitions && transitions.length) {
        transitions.forEach((target) => {
            if (!target) return;
            if (target.scrollTrigger) {
                target.scrollTrigger.kill();
            }

            target.kill();
        });

        transitions.length = 0;
    }
}

export function useAnimation({ onEnter = () => {}, onEnterDone = () => {} }) {
    const nuxtApp = useNuxtApp();
    const transitions = [];

    // Enter animation callback with bind params
    const bindCallbackEnter = onEnter.bind(
        {},
        {
            transitions,
            $gsap: nuxtApp.$gsap,
            $scrollTrigger: nuxtApp.$scrollTrigger,
            $splitText: nuxtApp.$splitText
        }
    );

    // EnterDone animation callback with bind params
    const bindCallbackEnterDone = onEnterDone.bind(
        {},
        {
            transitions,
            $gsap: nuxtApp.$gsap,
            $scrollTrigger: nuxtApp.$scrollTrigger,
            $splitText: nuxtApp.$splitText
        }
    );

    // Start listening for page transitions to apply animations
    onMounted(() => {
        // Add event listeners with animations
        Events.addEventListener(TRANSITION_ENTER, bindCallbackEnter);
        Events.addEventListener(TRANSITION_ENTER_DONE, bindCallbackEnterDone);
    });

    onBeforeUnmount(() => {
        // Create listener to clean up transitions on page leave event
        Events.addEventListener(TRANSITION_LEAVE_DONE, function () {
            // Kill transitions and scroll triggers on page leave
            cleanUpTransitions(transitions);

            // Remove created listener
            Events.removeEventListener(TRANSITION_LEAVE_DONE, this);
        });

        // Remove created listeners with animations
        Events.removeEventListener(TRANSITION_ENTER, bindCallbackEnter);
        Events.removeEventListener(TRANSITION_ENTER_DONE, bindCallbackEnterDone);
    });
}
