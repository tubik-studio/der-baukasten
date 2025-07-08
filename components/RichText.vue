<template>
    <span class="rich-text" v-html="renderText"></span>
</template>

<script setup>
    const props = defineProps({
        text: {
            type: Object,
            required: true
        }
    });

    const renderText = computed(() => renderRichText(props.text));
</script>

<style lang="scss">
    .rich-text {
        width: 100%;
    }
</style>
