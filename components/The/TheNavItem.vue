<template>
    <nuxt-link class="the-nav__item" :to="link?.url || link?.cached_url">
        {{ text }}
    </nuxt-link>
</template>

<script setup>
    const props = defineProps({
        text: {
            type: String,
            default: "Nav item"
        },
        link: {
            type: Object,
            required: true
        }
    })
</script>

<style lang="scss" scoped>
    .the-nav__item {
        cursor: pointer;
        font-size: 1.125rem;
        font-weight: 400;
        line-height: 2rem;
    }

    // Hover
    .the-nav__item {
        opacity: 0.8;
        //
        transition: opacity $tr-time;
    }

    @media (hover: hover) {
        .the-nav__item:hover {
            opacity: 1;
        }
    }

    // Active link
    .the-nav__item.router-link-exact-active {
        opacity: 1;
    }
</style>