<template>
    <section class="section-hero" :id="blok.id"></section>
</template>

<script setup>
    import { useMainStore } from "~/stores/mainStore";

    // Props
    const props = defineProps({
        blok: Object
    });

    // Globals
    const mainStore = useMainStore();

    // Magnetic repulsion strength
    useAnimation({
        onEnter: ({ $scrollTrigger }) => {
            const st = $scrollTrigger.create({
                trigger: "body",
                start: 0,
                end: "+=100%",
                onUpdate: ({ progress }) => {
                    mainStore.updateMagneticRepulsionStrength(0.15 * (1 - progress));
                }
            });
        }
    });
</script>

<style lang="scss" scoped>
    .section-hero {
        height: 100vh;
    }
</style>
