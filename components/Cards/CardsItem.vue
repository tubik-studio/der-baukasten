<template>
    <section ref="item" class="cards-item" :class="{ 'is-active': scrollY > Math.max(100, windowHeight * id) }">
        <div class="cards-item__scroll">
            <div class="cards-item__hover">
                <img class="cards-item__phonetic" :src="phonetic?.filename" :alt="phonetic?.alt" />
            </div>
        </div>
    </section>
</template>

<script setup>
    import { useWindowScroll, useWindowSize } from "@vueuse/core";

    // Props
    const props = defineProps({
        id: {
            type: Number,
            required: true
        },
        phonetic: {
            type: Object,
            required: true
        },
        color: {
            type: String,
            default: "#f0f0f0"
        }
    });

    // Animation
    const { y: scrollY } = useWindowScroll();
    const { height: windowHeight } = useWindowSize();
</script>

<style lang="scss" scoped>
    .cards-item {
        display: flex;
        justify-content: flex-end;
        height: 100vh;
        width: 100%;

        &__scroll {
            display: block;
            width: 100%;
            height: 100%;

            @include respond-desktop(s) {
                transform: translateY(-2rem);
            }
        }

        &__hover {
            width: 100%;
            height: 100%;
            padding: 0 px-to-rem(24);
            background-color: v-bind(color);
        }

        &__phonetic {
            display: block;
            width: clamp(4.75rem, 3.393rem + 2.121vw, 5.938rem);

            @include respond-desktop(s) {
                opacity: 0;
            }
        }
    }

    @include respond-desktop(s) {
        // Hover
        .cards-item__hover,
        .cards-item__phonetic {
            transition:
                transform $tr-atf $tr-time,
                opacity $tr-atf $tr-time;
        }

        .cards-item:not(.is-active) {
            cursor: pointer;
        }

        .cards-item:not(.is-active):hover {
            .cards-item__hover {
                transform: translateY(-3rem);
            }

            .cards-item__phonetic {
                opacity: 1;
                transform: translateY(1rem);
            }
        }

        // Active state
        .cards-item__scroll {
            transition: transform 1.5s $tr-atf;
        }

        .cards-item.is-active {
            .cards-item__scroll {
                transform: translateY(-100%);
            }

            .cards-item__phonetic {
                opacity: 1;
                transform: translateY(1rem);
            }
        }
    }
</style>
