<template>
    <h1 class="the-logo">Der Baukasten</h1>
</template>

<script setup>
    const props = defineProps({
        text: {
            type: Boolean,
            default: false
        },
        symbol: {
            type: Boolean,
            default: true
        }
    });
</script>

<style lang="scss" scoped>
    .the-logo {
        font-size: px-to-rem(24);
        font-weight: 500;
        letter-spacing: -0.08em;
        line-height: 0.69;
        //outline: 1px dashed white;
    }
</style>
