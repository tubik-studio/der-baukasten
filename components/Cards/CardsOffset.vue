<template>
    <div class="cards-offset"></div>
</template>

<script setup>
    // Props
    const props = defineProps({
        length: {
            type: Number,
            default: 0
        }
    });
</script>

<style lang="scss" scoped>
    .cards-offset {
        height: calc((v-bind(length) + 1) * 100vh);
    }
</style>
