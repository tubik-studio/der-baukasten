<template>
    <div ref="item" class="cards-mobile-nav__item" @click="navigateToCard">
        <img class="cards-mobile-nav__item__filter" src="/images/test.png" alt="" />
    </div>
</template>

<script setup>
    // Props
    const props = defineProps({
        id: [Number, String]
    });

    // Globals
    const nuxtApp = useNuxtApp();

    // Refs
    const $refItem = useTemplateRef("item");

    // Cards navigation
    const navigateToCard = () => {
        const header = window.getComputedStyle(document.querySelector(".the-header"), "::after");
        const headerHeight = parseInt(header.height) + parseInt(header.paddingTop) * 2;

        nuxtApp.$lenis.scrollTo(
            window.innerHeight * 2 + props.id * window.innerHeight * 2 + window.innerHeight * 0.25 - headerHeight,
            {
                lerp: 0.1,
                force: true
            }
        );
    };

    // Animation
    useAnimation({
        onEnterDone: ({ $gsap, $scrollTrigger }) => {
            $scrollTrigger.create({
                start: () => window.innerHeight + props.id * window.innerHeight * 2 + window.innerHeight * 0.25 + 28,
                onEnter: () => {
                    // Hide the current item
                    $gsap.set($refItem.value, {
                        alpha: 0
                    });

                    // Make the next item bigger
                    const nextItem = document.querySelector(`.cards-mobile-nav__item:nth-child(${props.id + 2})`);

                    if (nextItem) {
                        $gsap.set(nextItem, {
                            scaleX: props.id + 2
                        });

                        $gsap.set(nextItem.querySelector(".cards-mobile-nav__item__filter"), {
                            scaleX: 1 / (props.id + 2)
                        });
                    }
                },
                onLeaveBack: () => {
                    // Show the current item
                    $gsap.set($refItem.value, {
                        alpha: 1
                    });

                    // Make the next item smaller
                    const nextItem = document.querySelector(`.cards-mobile-nav__item:nth-child(${props.id + 2})`);

                    if (nextItem) {
                        $gsap.set(`.cards-mobile-nav__item:nth-child(${props.id + 2})`, {
                            scaleX: 1
                        });

                        $gsap.set(nextItem.querySelector(".cards-mobile-nav__item__filter"), {
                            scaleX: 1
                        });
                    }
                }
            });
        }
    });
</script>

<style lang="scss" scoped>
    .cards-mobile-nav__item {
        position: relative;
        height: 100%;
        transform-origin: right;
        transition: transform 1s;

        &__filter {
            user-select: none;
            pointer-events: none;
            position: absolute;
            z-index: 5;
            top: 0;
            left: 0;
            min-width: 100%;
            min-height: 100%;
            mix-blend-mode: multiply;
            transform-origin: left;
            transition: transform 1s;
        }
    }
</style>
