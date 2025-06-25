<template>
    <div class="the-logo">
        <h1 class="heading-4">Logo</h1>
        <svg class="the-logo__symbol" viewBox="0 0 52 50" fill="currentColor" xmlns="http://www.w3.org/2000/svg"></svg>

        <svg
            v-if="text"
            class="the-logo__text"
            viewBox="0 0 177 37"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
        ></svg>
    </div>
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
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 15rem;

        &__symbol {
            //width: 21.08%;
        }

        &__text {
            //width: 72.51%;
        }
    }
</style>
