<template>
    <section class="section-hero container" :id="blok.id">
        <div class="section-hero__inner">
            <TheLogo class="section-hero__title" v-fitty />
        </div>
    </section>
</template>

<script setup>
    import { useWindowScroll, useWindowSize } from "@vueuse/core";
    import { useMainStore } from "~/stores/mainStore";

    // Props
    const props = defineProps({
        blok: Object
    });

    // Window
    const { y: scrollY } = useWindowScroll();
    const { width: windowWidth, height: windowHeight } = useWindowSize();

    // Animation
    useAnimation({
        onEnter: ({ $gsap, $scrollTrigger, transitions }) => {
            const pin = $scrollTrigger.create({
                trigger: ".section-hero__title",
                start: 0,
                end: 100000,
                pin: true,
                scrub: true
            });

            const titleTrigger = $scrollTrigger.create({
                start: 100,
                onEnter: () => {
                    $gsap.to(".section-hero__title .char", {
                        y: "-100%",
                        alpha: 0,
                        duration: 0.6,
                        stagger: 0.025,
                        ease: "power2.out"
                    });
                },
                onLeaveBack: () => {
                    $gsap.to(".section-hero__title .char", {
                        y: 0,
                        alpha: 1,
                        duration: 0.6,
                        stagger: 0.025,
                        ease: "power2.out"
                    });
                }
            });
        }
    });
</script>

<style lang="scss" scoped>
    .section-hero {
        height: 100vh;

        &__inner {
            box-sizing: border-box;
            display: flex;
            align-items: flex-end;
            width: 100%;
            height: 100%;
            padding-bottom: 5rem;
        }

        &__title {
            :deep(.line-mask) {
                margin-left: -0.05em;
                padding-right: 0.05em;
            }
        }
    }
</style>
