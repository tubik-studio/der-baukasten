<template>
    <div class="cards-nav-item">
        <img :src="phonetic?.filename" :alt="phonetic?.alt" />
    </div>
</template>

<script setup>
    // Props
    const props = defineProps({
        phonetic: {
            type: String,
            required: true
        },
        color: {
            type: String,
            default: "#f0f0f0"
        }
    });
</script>

<style lang="scss" scoped>
    .cards-nav-item {
        cursor: pointer;
        background-color: v-bind(color);
    }

    // Hover
    .cards-nav-item:hover {
        transform: translateY(0);
        transition: transform 0.3s ease-in-out;
    }
</style>
