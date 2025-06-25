<template>
    <NuxtLink :to="props.link" :target="props.target">
        <slot></slot>
    </NuxtLink>
</template>

<script setup>
    const props = defineProps(['link', 'target'])
</script>