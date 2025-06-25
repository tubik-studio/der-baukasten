<template>
    <a :href="props.link" :target="props.target">
        <slot></slot>
    </a>
</template>

<script setup>
    const props = defineProps(['link', 'target'])
</script>