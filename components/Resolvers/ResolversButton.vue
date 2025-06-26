<template>
    <ButtonsMain v-for="button in blok" :options="button" />
</template>

<script setup>
    // Props
    const props = defineProps({
        blok: Array
    });
</script>

<style lang="scss" scoped></style>
