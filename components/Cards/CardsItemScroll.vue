<template>
    <div ref="scroll" class="cards-item-scroll">
        <slot></slot>
    </div>
</template>

<script setup>
    import { useWindowSize } from "@vueuse/core";
    import { useMainStore } from "~/stores/mainStore";

    // Props
    const props = defineProps({
        id: {
            type: Number,
            required: true
        }
    });

    // Globals
    const nuxtApp = useNuxtApp();
    const mainStore = useMainStore();

    // Emits
    const emit = defineEmits(["updateIsVisibleState"]);

    // Refs
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
                    trigger: $refScroll.value.parentElement,
                    start: () => windowHeight.value * 2 * (props.id + 0.5),
                    // Show from the bottom stack
                    onEnter: () => {
                        emit("updateIsVisibleState", [true, props.id]);
                        mainStore.toggleHeaderDarkMode(props.id === 2);

                        const tl = $gsap.timeline({
                            defaults: {
                                duration: 1.5,
                                ease: "power3.out",
                                overwrite: true
                            }
                        });

                        tl.to(
                            $refScroll.value,
                            {
                                y: "-100vh"
                            },
                            0
                        );

                        tl.to(
                            $refScroll.value.parentElement,
                            {
                                transform: "var(--transform-open)"
                            },
                            0
                        );
                    },
                    // Hide to the bottom stack
                    onLeaveBack: () => {
                        emit("updateIsVisibleState", [false, props.id - 1]);
                        mainStore.toggleHeaderDarkMode(false);

                        const tl = $gsap.timeline({
                            defaults: {
                                duration: 1.5,
                                ease: "power3.out",
                                overwrite: true
                            }
                        });

                        tl.to(
                            $refScroll.value,
                            {
                                y: 0
                            },
                            0
                        );

                        tl.to(
                            $refScroll.value.parentElement,
                            {
                                transform: "var(--transform-closed)"
                            },
                            0
                        );
                    }
                });

                // Cleanup
                transitions.push(showHideTrigger);
            });

            // Reset visibility on mobile
            media.add("(max-width: 1024px)", () => {
                emit("updateIsVisibleState", [true, props.id]);

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
    .cards-item-scroll {
        display: block;
        width: 100%;
        height: 100%;
    }
</style>
