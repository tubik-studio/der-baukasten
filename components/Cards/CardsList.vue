<template>
    <div class="cards-list container">
        <div class="cards-list__inner">
            <CardsItem
                v-for="(item, id) in list"
                :key="item._uid"
                :id="id"
                :length="list.length"
                :phonetic="item?.phonetic"
                :color="item?.color?.color"
            />
        </div>
    </div>
</template>

<script setup>
    import { useWindowSize } from "@vueuse/core";

    // Props
    const props = defineProps({
        list: {
            type: Array,
            required: true
        }
    });

    // Window size
    const { height: windowHeight } = useWindowSize();

    // Animations
    useAnimation({
        onEnterDone: ({ $gsap, $scrollTrigger, transitions }) => {
            const media = $gsap.matchMedia();

            // Desktop animations
            media.add("(min-width: 1025px)", () => {
                // create a scroll trigger for the card list to be hidden at the end
                const showHideTrigger = $scrollTrigger.create({
                    start: () => windowHeight.value * props.list?.length,
                    onEnter: () => {
                        console.log("Hide");
                    },
                    onLeaveBack: () => {
                        console.log("Show");
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
</style>
