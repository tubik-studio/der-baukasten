<template>
    <div class="__app" ref="app">
        <TheHeader :content="globalStory.content" />

        <!-- Three.js -->
        <client-only>
            <LazyThree v-show="mainStore.isCanvasVisible" />
        </client-only>

        <NuxtLayout>
            <NuxtPage ref="page" class="__page" :transition="pageTransition" />
            <TheFooter :content="globalStory.content" />
        </NuxtLayout>

        <div id="custom-teleports"></div>

        <!-- Layout Grid -->
        <LazyGrid v-if="isGridVisible" />

        <!-- The Preloader -->
        <ThePreloader />

        <!-- Monotone Noise Filter from Figma -->
        <NoiseFilter />
    </div>
</template>

<script setup>
    // Imports
    import { detect } from "detect-browser";
    import { onKeyStroke } from "@vueuse/core";
    import { useMainStore } from "~/stores/mainStore";
    import { Events, PRELOADER_DONE } from "assets/js/Events";

    // Nuxt
    const nuxtApp = useNuxtApp();

    // Stores
    const mainStore = useMainStore();

    // Storyblok
    let version = useStoryblokVersion();
    const globalStory = useState();
    await useAsyncStoryPage(globalStory, "global", version, []);

    // Browser
    const browser = detect();

    // Favicons
    useFavicons(globalStory);

    // Head settings
    useHead({
        bodyAttrs: {
            class: "__body"
        },
        htmlAttrs: {
            class: `browser-${browser?.name.toLowerCase()} os-${browser?.os.toLowerCase()}`
        }
    });

    // Page transition
    const pageTransition = usePageTransition("page-transition");

    // ===== 🏷️ GRID =====
    const isGridVisible = ref(false);

    onKeyStroke(["G", "g"], (e) => {
        isGridVisible.value = !isGridVisible.value;
    });

    // ===== 🖼️ LOADING PROGRESS =====
    if (nuxtApp.$loadingManager) {
        nuxtApp.$loadingManager.onProgress = (url, loaded, total) => {
            mainStore.updateLoadingProgress(loaded / 12);
        };

        nuxtApp.$loadingManager.onLoad = () => {
            // Make sure to set final progress to 1 when loading is complete
            mainStore.updateLoadingProgress(1);

            // Dispatch event to indicate that the loading is complete
            Events.dispatchEvent(PRELOADER_DONE);
        };
    }

    onMounted(() => {
        console.log(browser);
    });
</script>

<style lang="scss">
    .__page {
        position: relative;
        z-index: 2;
        display: flex;
        flex-direction: column;
    }

    .__nuxt,
    .__page,
    .__app {
        overflow: hidden !important;
    }
</style>
