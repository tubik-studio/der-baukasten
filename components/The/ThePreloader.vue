<template>
    <div class="the-preloader">
        <div class="container">
            <div class="content">
                <div class="the-preloader__svg" ref="svg"></div>
            </div>
        </div>

        <div class="the-preloader__bg" ref="bg"></div>
    </div>
</template>

<script setup>
    import { Events, PRELOADER_DONE, TRANSITION_ENTER, TRANSITION_ENTER_DONE } from "assets/js/Events";
    import { useMainStore } from "~/stores/mainStore";

    // Globals
    const nuxtApp = useNuxtApp();
    const mainStore = useMainStore();

    // Lottie animation
    let lottieAnimation;
    const isLoaded = ref(false);

    // Refs
    const $refBg = useTemplateRef("bg");
    const $refSVG = useTemplateRef("svg");

    onMounted(() => {
        // Load lottie animation
        lottieAnimation = nuxtApp.$lottie.loadAnimation({
            path: "lottie/preloader.json",
            container: $refSVG.value,
            renderer: "svg",
            loop: false,
            autoplay: true
        });

        // Repeat lottie animation or hide preloader when animation is complete
        lottieAnimation.addEventListener("complete", () => {
            if (isLoaded.value) {
                hideThePreloader();
            } else {
                setTimeout(() => {
                    if (isLoaded.value) {
                        hideThePreloader();
                    } else {
                        lottieAnimation.goToAndPlay(0, true);
                    }
                }, 2000);
            }
        });

        // Preloader hide function
        const hideThePreloader = () => {
            const appearTl = nuxtApp.$gsap.timeline({
                defaults: {
                    duration: 1.5,
                    ease: "power2.inOut"
                },
                onStart: () => {
                    // Re-enable scroll
                    nuxtApp.$lenis.start();

                    // Dispatch events for transition
                    Events.dispatchEvent(TRANSITION_ENTER);
                    Events.dispatchEvent(TRANSITION_ENTER_DONE);
                },
                onComplete: () => {
                    // Destroy the lottie animation
                    lottieAnimation.destroy();
                }
            });

            appearTl
                .to(
                    $refBg.value,
                    {
                        opacity: 0,
                        y: -50,
                        duration: 1.2
                    },
                    0
                )
                .fromTo(
                    ".the-preloader__svg",
                    {
                        transform: "translate(-50%, -50%)",
                        opacity: 1
                    },
                    {
                        transform: "translate(-50%, -55%)",
                        opacity: 0,
                        duration: 0.8
                    },
                    0
                )
                .from(
                    ".the-header",
                    {
                        y: -40,
                        opacity: 0,
                        clearProps: "all"
                    },
                    0
                )
                .from(
                    ".canvas",
                    {
                        scale: 1.06,
                        clearProps: "all"
                    },
                    0
                );
        };

        // Hide preloader when loading is done
        Events.addEventListener(PRELOADER_DONE, () => {
            isLoaded.value = true;
        });
    });
</script>

<style lang="scss" scoped>
    .the-preloader {
        position: fixed;
        left: 0;
        top: 0;
        z-index: 99999;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100vh;
        overflow: hidden;

        &__bg {
            position: absolute;
            z-index: -1;
            inset: 0;
            width: 100%;
            height: 100%;
            background-color: var(--color-primary);
        }

        &__svg {
            position: absolute;
            @include align(c, c);
            width: px-to-rem(180);
            display: flex;
            align-items: center;
            justify-content: center;

            svg {
                width: 100%;
            }
        }
    }
</style>
