<template>
    <div class="the-cursor-wrapper" v-show="store.isEnabled">
        <div ref="$refCursor" class="the-cursor">
            <img ref="$refCircle" class="the-cursor__image" src="/images/cursor.svg" alt="cursor" />
        </div>
    </div>
</template>

<script setup>
    import { useCursorStore } from "@/stores/cursorStore";
    import { useMainStore } from "@/stores/mainStore";

    // Store
    const store = useCursorStore();
    const mainStore = useMainStore();

    // App
    const { $gsap } = useNuxtApp();

    // Data
    const { scale, alpha, icon, iconTheme, isLoading } = store;

    // Refs
    const $refCursor = ref(null);
    const $refCircle = ref(null);

    //
    const setters = {
        moveX: null,
        moveY: null,
        alpha: null
    };

    const cursorPositionTemporary = {
        x: 0,
        y: 0
    };

    useAnimation({
        onEnter: ({ $gsap, transitions }) => {
            // Init setters
            setters.moveX = $gsap.quickSetter($refCursor.value, "x", "px");
            setters.moveY = $gsap.quickSetter($refCursor.value, "y", "px");
            setters.alpha = $gsap.quickSetter($refCursor.value, "alpha", "");

            // Update store mouse position on mousemove event
            window.addEventListener("mousemove", (e) => {
                // Show after first pixel moved
                store.changeCursorVisibility(true);

                // Update cursor position in the store
                store.updateCursorPosition({
                    x: e.clientX,
                    y: e.clientY
                });

                //
                setters.moveX(store.position.x);
                setters.moveY(store.position.y);
            });

            // Hide cursor when user leaves the window
            document.addEventListener("mouseleave", (e) => {
                store.changeCursorVisibility(false);
            });

            // Set ticker to update custom cursor position every frame
            $gsap.ticker.add(() => {
                if (store.snapId.length && !store.isLoading) {
                    // const bounding = this.snapElement.getBoundingClientRect();
                    // console.log(bounding);
                    //
                    // this.setterMoveX(bounding.x + bounding.width / 2);
                    // this.setterMoveY(bounding.y + bounding.height / 2);
                } else {
                    // setters.moveX(store.position.x);
                    // setters.moveY(store.position.y);
                }
            });
        }
    });

    // Update alpha value
    watch(
        () => store.alpha,
        (alpha) => {
            setters.alpha(alpha);
        }
    );
</script>

<style lang="scss" scoped>
    $cursor-size: px-to-rem(64);

    .the-cursor-wrapper {
        position: absolute;
        top: 0;
        left: 0;
    }

    .the-cursor {
        position: fixed;
        z-index: 10000;
        left: 0;
        top: 0;
        width: 0;
        height: 0;
        opacity: 0;
        user-select: none;
        pointer-events: none;

        &__image {
            position: absolute;
            top: 0;
            left: 0;
            width: $cursor-size;
            height: $cursor-size;
            transform: translate(-12%, -4%);
        }
    }

    // Mobile
    .the-cursor-wrapper {
        display: none;
    }

    @media (hover: hover) {
        .the-cursor-wrapper {
            display: block;
        }
    }
</style>
