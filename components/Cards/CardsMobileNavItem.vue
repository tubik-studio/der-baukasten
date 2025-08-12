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
                markers: true,
                onEnter: () => {
                    $gsap.set($refItem.value, {
                        alpha: 0
                    });
                },
                onLeaveBack: () => {
                    $gsap.set($refItem.value, {
                        alpha: 1
                    });
                }
            });
        }
    });
</script>

<style lang="scss" scoped>
    .cards-mobile-nav__item {
        &__item {
            height: 100%;
        }
    }
</style>
