<template>
    <nav class="the-nav">
        <TheNavItem v-for="(item, id) in props.navList" :text="item?.text" :link="item?.link" />
    </nav>
</template>

<script setup>
    const props = defineProps({
        navList: {
            type: Array,
            required: true
        }
    });
</script>

<style lang="scss" scoped>
    .the-nav {
        display: grid;
        grid-gap: 2.5rem;
        grid-auto-flow: column;
    }
</style>