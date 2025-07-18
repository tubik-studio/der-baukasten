<template>
    <section class="section-hero" :id="blok.id"></section>
</template>

<script setup>
    import { useMainStore } from "~/stores/mainStore";

    // Props
    const props = defineProps({
        blok: Object
    });
</script>

<style lang="scss" scoped>
    .section-hero {
        height: 100vh;
    }
</style>
