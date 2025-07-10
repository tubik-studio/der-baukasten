<template>
    <header class="the-header container" :class="{ 'is-collapsed': scrollY > 100, 'is-dark': mainStore.isHeaderDark }">
        <div class="the-header__content">
            <!-- Description -->
            <p class="the-header__desc">A subtle concept for game design or interior mood</p>

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

    // Window
    const { y: scrollY } = useWindowScroll();
    const { width: windowWidth } = useWindowSize();

    // Calculate logo scale based on window width
    const logoScale = computed(() => {
        if (!$refLogo?.value) return 1;
        return 0.075 + Math.max(0, 1440 - windowWidth.value) / 5500;
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
            transform: translateY(calc(100vh - 100% - #{$header-padding} - 5rem));

            .the-logo {
                margin-left: -0.05em;
            }
        }
    }

    // Collapsed state
    .the-header {
        &__desc,
        &__logo {
            transition: transform 1.5s $tr-atf;
        }
    }

    .the-header.is-collapsed {
        z-index: 1001;

        .the-header__desc {
            transform: translateY(-20vh);
        }

        .the-header__logo {
            --scale: v-bind(logoScale);
            pointer-events: auto;
            transform: translateY(1%) scale(var(--scale));
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
