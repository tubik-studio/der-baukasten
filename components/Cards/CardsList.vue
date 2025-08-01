<template>
    <div class="cards-list container">
        <div class="cards-list__inner">
            <CardsItem
                v-for="(item, id) in list"
                :key="item._uid"
                :id="id"
                :length="list.length"
                :phonetic="item?.phonetic"
                :title="item?.title"
                :subtitle="item?.subtitle"
                :desc="item?.desc"
                :color="item?.color?.color"
                :download-file-name="item?.download_file_name"
                :theme="item?.theme"
                :active-card-id="activeCardId"
                @update-active-item-id="updateActiveItemId"
            />
        </div>
    </div>
</template>

<script setup>
    import { useMainStore } from "~/stores/mainStore";
    import { useWindowSize } from "@vueuse/core";

    // Props
    const props = defineProps({
        list: {
            type: Array,
            required: true
        }
    });

    // Globals
    const nuxtApp = useNuxtApp();
    const mainStore = useMainStore();

    // Current active card
    const activeCardId = ref(0);

    const updateActiveItemId = (id) => {
        activeCardId.value = id;
    };

    // Window size
    const { height: windowHeight } = useWindowSize();

    //
    const lastAnimationProgress = ref(0);

    function easing(x) {
        return Math.sqrt(1 - Math.pow(x - 1, 2));
    }

    // Animations
    useAnimation({
        onEnterDone: ({ $gsap, $scrollTrigger, transitions }) => {
            const media = $gsap.matchMedia();
            let animation = null;

            // Desktop animations
            media.add("(min-width: 1025px)", () => {
                // create a scroll trigger for the card list to be hidden at the end
                const showHideTrigger = $scrollTrigger.create({
                    trigger: "body",
                    start: () => "bottom 300%",
                    end: () => "bottom bottom",
                    onEnter: () => {
                        animation?.kill();

                        animation = $gsap.to(".cards-item", {
                            xPercent: 120,
                            duration: 0.85,
                            ease: "power2.out",
                            stagger: -0.05
                        });
                    },
                    onLeaveBack: () => {
                        animation?.kill();

                        animation = $gsap.to(".cards-item", {
                            xPercent: 0,
                            duration: 0.85,
                            ease: "power3.out",
                            stagger: 0.1
                        });
                    }
                });

                transitions.push(showHideTrigger);
            });
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
                transform: translateX(-$grid-gap);
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
                transform: var(--transform-closed);

                &:nth-child(2) {
                    --transform-open: translateX(0);
                    --transform-closed: translateX(#{column-width(1, 6)});
                    margin-left: $grid-gap;
                }

                &:nth-child(3) {
                    --transform-open: translateX(#{$grid-gap});
                    --transform-closed: translateX(#{column-width(2, 6)});
                    margin-left: $grid-gap;
                }
            }
        }
    }

    // Mobile
    @include respond-mobile(xl) {
        .cards-list {
            margin-top: 25vh;

            .cards-item {
                margin-top: 100vh;
            }
        }
    }
</style>
