<template>
    <button type="button" class="--button-reset">
        <slot></slot>
    </button>
</template>

<script setup>
    const props = defineProps(['link', 'target'])
</script>