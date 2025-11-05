<template>
    <div class="cards-item-hover" @click="onClick" @mouseover="sideHover" @mouseleave="sideHide">
        <img class="cards-item-hover__filter" src="/images/test.png" alt="" />
        <slot></slot>
    </div>
</template>

<script setup>
    import { useWindowSize, useMediaQuery } from "@vueuse/core";

    // Props
    const props = defineProps({
        id: {
            type: Number,
            required: true
        },
        activeCardId: {
            type: Number,
            required: true
        },
        color: {
            type: String,
            default: "#f0f0f0"
        }
    });

    // Globals
    const nuxtApp = useNuxtApp();

    // Window size
    const { height: windowHeight } = useWindowSize();

    // Is mobile
    const isMobile = useMediaQuery("(max-width: 1024px)");

    // Scroll on click
    const onClick = () => {
        if (isMobile.value) return;
        nuxtApp.$lenis.scrollTo(windowHeight.value * 2 * (props.id + 1), {
            duration: 4,
            force: true
        });
    };

    // Side hover effect
    const visibleCards = ref([]);
    const updateVisibleCards = () => {
        const cardsItems = document.querySelectorAll(".cards-item");
        visibleCards.value = Array.from(cardsItems).slice(0, props.id + 1);
    };

    watch(
        () => props.activeCardId,
        (id, prevId) => {
            if (id < prevId) {
                visibleCards.value.forEach((card) => {
                    card.classList.remove("is-side-hovered");
                });
            }
        }
    );

    const sideHover = (e) => {
        if (props.id < props.activeCardId) {
            updateVisibleCards();

            visibleCards.value.forEach((card) => {
                card.classList.add("is-side-hovered");
            });
        }
    };

    const sideHide = (e) => {
        visibleCards.value.forEach((card) => {
            card.classList.remove("is-side-hovered");
        });
    };
</script>

<style lang="scss">
    .cards-item-hover {
        position: relative;
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        padding: $header-padding $grid-gap;
        background-color: v-bind(color);
        filter: url(#monotoneNoise);

        &__filter {
            display: none;
            user-select: none;
            pointer-events: none;
            position: absolute;
            z-index: 5;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
            mix-blend-mode: multiply;
        }

        @include respond-mobile(xl) {
            @include respond-pad(padding-inline);
        }

        &:after {
            content: "";
            position: absolute;
            z-index: -1;
            left: 99%;
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

        .cards-item.is-side-hovered .cards-item-hover {
            transform: translateX(-7rem);

            .cards-item-phonetic__button {
                opacity: 0;
            }
        }

        // Bottom hover effect (when card is not visible)
        .cards-item:not(.is-visible) {
            .cards-item-hover {
                transform: translateY(-$header-padding);
            }

            .cards-item-content__phonetic {
                opacity: 0;
            }

            .cards-item-phonetic__button {
                display: none;
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

    // Safari
    .browser-safari,
    .browser-ios {
        .cards-item-hover {
            filter: none;
        }

        .cards-item-hover__filter {
            display: block;
        }
    }
</style>
