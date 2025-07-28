<template>
    <header
        class="the-header container"
        :class="{
            'is-collapsed': scrollY > 100,
            'is-collapsed-mobile': scrollY > windowHeight,
            'is-dark': mainStore.isHeaderDark
        }"
    >
        <div class="the-header__content">
            <!-- Description -->
            <p ref="desc" class="the-header__desc">A subtle concept for game design or interior mood</p>

            <!-- Logo-->
            <a ref="logo" class="the-header__logo" href="#hero">
                <TheLogo />
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

    // Window
    const { y: scrollY } = useWindowScroll();
    const { width: windowWidth, height: windowHeight } = useWindowSize();
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
        pointer-events: none;

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
            pointer-events: none;
        }

        &__desc {
            max-width: 250px;
            font-size: px-to-rem(18);
            font-weight: 500;
            text-wrap: balance;
            //
            transition:
                transform 0.6s $tr-atf,
                opacity 0.6s;
        }

        &__logo {
            pointer-events: none;
            position: absolute;
            top: 0;
            left: 0;
            margin-top: 0.33em;
            transform-origin: left top;
            transform: translateY(100%);
            opacity: 0;
            //
            transition:
                transform 0.6s $tr-atf,
                opacity 0.6s;
        }

        &__desc,
        &__logo,
        :deep(.buttons-main) {
            pointer-events: initial;
        }
    }

    // Collapsed state
    .the-header.is-collapsed {
        z-index: 1001;

        .the-header__desc {
            transform: translateY(-100%);
            opacity: 0;
        }

        .the-header__logo {
            transform: translateY(0);
            opacity: 1;
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
