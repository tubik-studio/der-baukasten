<template>
    <section ref="item" class="cards-item" :class="{ 'is-visible': isVisible }">
        <div ref="scroll" class="cards-item__scroll">
            <div class="cards-item__hover">
                <div class="cards-item__content">
                    <img class="cards-item__phonetic" :src="phonetic?.filename" :alt="phonetic?.alt" />
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
    import { useWindowSize } from "@vueuse/core";

    // Props
    const props = defineProps({
        id: {
            type: Number,
            required: true
        },
        length: {
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

    // Data
    const isVisible = ref(false);

    // Refs
    const $refItem = useTemplateRef("item");
    const $refScroll = useTemplateRef("scroll");

    // Window size
    const { height: windowHeight } = useWindowSize();

    // Animations
    useAnimation({
        onEnterDone: ({ $gsap, $scrollTrigger, transitions }) => {
            let showHideTrigger;
            const media = $gsap.matchMedia();

            // Desktop animations
            media.add("(min-width: 1025px)", () => {
                showHideTrigger = $scrollTrigger.create({
                    trigger: $refItem.value,
                    start: () => Math.max(100, windowHeight.value * (props.id + 1)),
                    // Show from the bottom stack
                    onEnter: () => {
                        isVisible.value = true;

                        $gsap.to($refScroll.value, {
                            duration: 1.5,
                            y: "-100vh",
                            ease: "power3.out",
                            overwrite: true
                        });
                    },
                    // Hide to the bottom stack
                    onLeaveBack: () => {
                        isVisible.value = false;

                        $gsap.to($refScroll.value, {
                            duration: 1.5,
                            y: 0,
                            ease: "power3.out",
                            overwrite: true
                        });
                    }
                });

                // Cleanup
                transitions.push(showHideTrigger);
            });

            // Reset visibility on mobile
            media.add("(max-width: 1024px)", () => {
                isVisible.value = false;

                if (showHideTrigger) {
                    showHideTrigger.kill();
                }

                $gsap.set($refScroll.value, {
                    y: 0
                });
            });
        }
    });
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
        }

        &__hover {
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

        &__content {
            width: 100%;
            height: 100%;
        }

        &__phonetic {
            display: block;
            width: clamp(4.75rem, 3.393rem + 2.121vw, 5.938rem);
            transform: translateY(-5%);
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

        .cards-item__hover {
            width: calc(100% + $grid-gap * 2);
        }

        .cards-item:not(.is-visible) {
            cursor: pointer;

            .cards-item__hover {
                transform: translateY(-$header-padding);
            }

            .cards-item__phonetic {
                opacity: 0;
            }

            &:hover {
                .cards-item__hover {
                    transform: translateY(-$header-padding * 2.5);
                }

                .cards-item__phonetic {
                    opacity: 1;
                    transform: translateY(-$header-padding * 0.5);
                }
            }
        }
    }
</style>
