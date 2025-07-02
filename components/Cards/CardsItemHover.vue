<template>
    <div class="cards-item-hover">
        <slot></slot>
    </div>
</template>

<script setup>
    // Props
    const props = defineProps({
        color: {
            type: String,
            default: "#f0f0f0"
        }
    });
</script>

<style lang="scss">
    .cards-item-hover {
        position: relative;
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        padding: $header-padding $grid-gap;
        background-color: v-bind(color);

        @include respond-mobile(xl) {
            @include respond-pad(padding-inline);
        }

        &:after {
            content: "";
            position: absolute;
            z-index: -1;
            left: 100%;
            top: 0;
            bottom: 0;
            width: 50vh;
            background-color: inherit;
        }
    }

    @include respond-desktop(s) {
        // Hover
        .cards-item-hover,
        .cards-item-content__phonetic {
            transition:
                transform $tr-atf $tr-time,
                opacity $tr-atf $tr-time;
        }

        .cards-item-hover {
            width: calc(100% + $grid-gap * 2);
        }

        .cards-item:not(.is-visible) {
            cursor: pointer;

            .cards-item-hover {
                transform: translateY(-$header-padding);
            }

            .cards-item-content__phonetic {
                opacity: 0;
            }

            &:hover {
                .cards-item-hover {
                    transform: translateY(-$header-padding * 2.5);
                }

                .cards-item-content__phonetic {
                    opacity: 1;
                    transform: translateY(-$header-padding * 0.5);
                }
            }
        }
    }
</style>
