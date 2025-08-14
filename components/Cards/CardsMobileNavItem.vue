<template>
    <div ref="item" class="cards-mobile-nav__item"></div>
</template>

<script setup>
    // Props
    const props = defineProps({
        id: [Number, String]
    });

    // Refs
    const $refItem = useTemplateRef("item");

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
                    }
                }
            });
        }
    });
</script>

<style lang="scss" scoped>
    .cards-mobile-nav__item {
        height: 100%;
        transform-origin: right;
        transition: transform 1s $tr-atf;
    }
</style>
