<template>
    <section ref="section" class="section-hero" :id="blok.id"></section>
</template>

<script setup>
    import { useMainStore } from "~/stores/mainStore";

    // Props
    const props = defineProps({
        blok: Object
    });

    // Globals
    const mainStore = useMainStore();
    const nuxtApp = useNuxtApp();

    // Refs
    const $refSection = useTemplateRef("section");

    // Scroll animation
    useAnimation({
        onEnter: ({ $scrollTrigger, transitions }) => {
            // Scroll Animation
            const st = $scrollTrigger.create({
                trigger: $refSection.value,
                start: "top top",
                end: () => "+=100%",
                scrub: true,
                onUpdate: ({ progress }) => {
                    mainStore.updateThreeAnimationFrame(200 * progress);
                }
            });

            // Cleanup
            transitions.push(st);
        }
    });
</script>

<style lang="scss" scoped>
    .section-hero {
        height: 100vh;
    }
</style>
