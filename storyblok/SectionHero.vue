<template>
    <section class="section-hero" :id="blok.id">
        <div class="section-hero__title container">
            <div class="section-hero__title__inner">
                <TheLogo class="" v-fitty />
            </div>
        </div>
    </section>
</template>

<script setup>
    // Props
    const props = defineProps({
        blok: Object
    });

    // Animation
    useAnimation({
        onEnter: ({ $gsap, $scrollTrigger, transitions }) => {
            const titleTrigger = $scrollTrigger.create({
                trigger: ".section-hero__title",
                start: 100,
                end: 999999,
                toggleClass: "is-hidden",
                onEnter: () => {
                    $gsap.to(".section-hero__title .char", {
                        yPercent: 120,
                        duration: 0.6,
                        stagger: 0.025,
                        ease: "power2.out"
                    });
                },
                onLeaveBack: () => {
                    $gsap.to(".section-hero__title .char", {
                        yPercent: 0,
                        duration: 0.6,
                        stagger: -0.025,
                        ease: "power2.out"
                    });
                }
            });

            transitions.push(titleTrigger);
        }
    });
</script>

<style lang="scss" scoped>
    .section-hero {
        height: 100vh;

        &__title {
            position: fixed;
            left: 0;
            right: 0;
            bottom: 0;
            width: 100%;
            padding-bottom: 5rem;
            margin-left: 0.04em;

            &.is-hidden {
                pointer-events: none;
            }

            &__inner {
                width: 100%;
            }

            :deep(.line-mask) {
                margin-left: -0.05em;
                padding-right: 0.05em;
            }
        }
    }
</style>
