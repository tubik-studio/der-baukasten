<template>
    <div class="cards-list container">
        <div class="cards-list__inner">
            <CardsItem
                v-for="(item, id) in list"
                :key="item._uid"
                :id="id"
                :phonetic="item?.phonetic"
                :color="item?.color?.color"
            />
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
    .cards-list {
        justify-content: flex-end;

        @include respond-mobile(xl) {
            padding: 0;
        }

        &__inner {
            position: relative;
            height: 100%;
            width: 100%;

            @include respond-desktop(s) {
                width: column-width(6);
            }
        }
    }

    // Desktop
    @include respond-desktop(s) {
        .cards-list {
            position: fixed;
            right: 0;
            bottom: 0;

            .cards-item {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;

                &:nth-child(2) {
                    transform: translateX(calc(column-width(1, 6) + $grid-gap));
                }

                &:nth-child(3) {
                    transform: translateX(calc(column-width(2, 6) + $grid-gap));
                }
            }
        }
    }
</style>
