<template>
    <div class="cards-nav container">
        <div class="cards-nav__inner">
            <CardsNavItem v-for="item in list" :phonetic="item?.phonetic" :color="item?.color?.color" />
        </div>
    </div>
</template>

<script setup>
    // Props
    const props = defineProps({
        list: {
            type: Array,
            default: () => []
        }
    });
</script>

<style lang="scss" scoped>
    .cards-nav {
        position: fixed;
        z-index: 1001;
        left: 0;
        right: 0;
        bottom: 0;
        height: px-to-rem(86);

        &__inner {
            position: relative;
            display: flex;
            justify-content: flex-end;
            width: calc(50% - $grid-gap * 0.5);
            height: 100%;
            margin-left: auto;
        }

        .cards-nav-item {
            position: absolute;
            bottom: 0;
            right: 0;
            width: 100%;
            height: 100%;
            @include respond-pad(padding-inline-end);
            @include respond-pad(margin-inline-end, -1);
            transform: translateY(60%);
            //
            transition: transform $tr-time $tr-atf;

            &:nth-child(1) {
                width: 100%;
            }

            &:nth-child(2) {
                width: calc(100% - column-width(1, 6) - $grid-gap);
            }

            &:nth-child(3) {
                width: calc(100% - column-width(2, 6) - $grid-gap);
            }

            &:hover,
            &:focus-visible {
                transform: translateY(0);
            }
        }
    }
</style>
