<template>
    <header
        class="the-header container"
        :class="{
            'is-collapsed': scrollY > 0,
            'is-collapsed-mobile': scrollY > windowHeight,
            'is-dark': mainStore.isHeaderDark
        }"
    >
        <div class="the-header__content">
            <!-- Description -->
            <p ref="desc" class="the-header__desc">A subtle concept for game design or interior mood</p>

            <!-- Logo-->
            <a ref="logo" class="the-header__logo" href="#hero">
                <TheLogo v-fitty />
            </a>

            <!-- Contacts button -->
            <ResolversButton :blok="content?.header_button" />
        </div>
    </header>
</template>

<script setup>
    // Imports
    import { useWindowScroll, useWindowSize } from "@vueuse/core";
    import { useMainStore } from "~/stores/mainStore";

    // Props
    const props = defineProps({
        content: {
            type: Object,
            required: true
        }
    });

    // Globals
    const mainStore = useMainStore();

    // Refs
    const $refLogo = useTemplateRef("logo");
    const $refDesc = useTemplateRef("desc");

    // Window
    const { y: scrollY } = useWindowScroll();
    const { width: windowWidth, height: windowHeight } = useWindowSize();

    // Animation
    useAnimation({
        onEnter: ({ $gsap, transitions }) => {
            const logoScrub = $gsap.timeline({
                scrollTrigger: {
                    start: 0,
                    end: "+=100%",
                    scrub: true
                },
                defaults: {
                    ease: "none"
                }
            });

            logoScrub.to(
                $refLogo.value,
                {
                    scale: () => 0.075 + Math.max(0, 1440 - windowWidth.value) / 5500,
                    y: "1%"
                },
                0
            );

            logoScrub.to(
                $refDesc.value,
                {
                    y: "-20vh"
                },
                0
            );
        }
    });
</script>

<style lang="scss" scoped>
    .the-header {
        position: fixed;
        z-index: 999;
        left: 0;
        right: 0;
        top: 0;
        width: 100%;
        padding-top: $header-padding;
        padding-bottom: $header-padding;

        @include respond-mobile(s) {
            padding-top: $header-padding * 0.66;
            padding-bottom: $header-padding * 0.66;
        }

        &:after {
            content: "";
            position: absolute;
            z-index: -1;
            top: 0;
            left: -1px;
            right: -1px;
            height: 1rem;
            @include respond-pad(padding);
            background-color: var(--color-primary);
            opacity: 0;
        }

        &__content {
            position: relative;
            display: flex;
            align-items: flex-start;
            justify-content: space-between;
            width: 100%;
        }

        &__desc {
            max-width: 250px;
            font-size: px-to-rem(18);
            font-weight: 500;
            text-wrap: balance;
        }

        &__logo {
            pointer-events: none;
            position: absolute;
            top: 0;
            left: 0;
            transform-origin: left top;
            width: 100%;
            transform: translateY(calc(#{$header-padding} + 3rem));

            :deep(.the-logo .line-mask) {
                margin-left: -0.05em;
                padding-right: 0.05em;
            }
        }
    }

    // Collapsed state
    .the-header.is-collapsed {
        z-index: 1001;

        .the-header__logo {
            pointer-events: auto;
        }
    }

    // Collapsed mobile state
    .the-header.is-collapsed-mobile {
        @include respond-mobile(xl) {
            &:after {
                opacity: 1;
            }
        }
    }

    // Dark header state
    .the-header {
        :deep(.buttons-main) {
            transition: color 0.1s;
        }
    }

    .the-header.is-dark {
        :deep(.buttons-main) {
            color: var(--color-dark);
            transition: color 0.1s 0.75s;
        }
    }
</style>
