<template>
    <div class="cards-item-content">
        <img class="cards-item-content__phonetic" :src="phonetic?.filename" :alt="phonetic?.alt" />
    </div>
</template>

<script setup>
    // Props
    const props = defineProps({
        phonetic: {
            type: Object,
            required: true
        }
    });
</script>

<style lang="scss" scoped>
    .cards-item-content {
        width: 100%;
        height: 100%;

        &__phonetic {
            display: block;
            width: clamp(4.75rem, 3.393rem + 2.121vw, 5.938rem);
            transform: translate(1%, -5%);
        }
    }
</style>
