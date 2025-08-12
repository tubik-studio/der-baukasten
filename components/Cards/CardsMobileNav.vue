<template>
    <div class="cards-mobile-nav">
        <CardsMobileNavItem
            v-for="(item, id) in list"
            :key="id"
            :id="id"
            :style="{ 'background-color': item.color.color }"
        />
    </div>
</template>

<script setup>
    // Props
    const props = defineProps({
        list: Array
    });
</script>

<style lang="scss" scoped>
    .cards-mobile-nav {
        position: fixed;
        z-index: 5;
        left: 0;
        bottom: 0;
        right: 0;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        height: 28px;
    }
</style>
