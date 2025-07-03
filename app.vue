<template>
    <div class="__app" ref="app">
        <TheHeader :content="globalStory.content" />

        <!-- Three.js -->
        <client-only>
            <LazyThree v-show="mainStore.isCanvasVisible" />
        </client-only>

        <NuxtLayout>
            <NuxtPage ref="page" class="__page" :transition="pageTransition" />
        </NuxtLayout>

        <div id="custom-teleports"></div>

        <!-- Layout Grid -->
        <LazyGrid v-if="isGridVisible" />
    </div>
</template>

<script setup>
    // Imports
    import { onKeyStroke } from "@vueuse/core";
    import { useMainStore } from "~/stores/mainStore";
    import { Events, TRANSITION_ENTER, TRANSITION_ENTER_DONE } from "assets/js/Events";

    // Nuxt
    const nuxtApp = useNuxtApp();

    // Stores
    const mainStore = useMainStore();

    // Storyblok
    let version = useStoryblokVersion();
    const globalStory = useState();
    await useAsyncStoryPage(globalStory, "global", version, []);

    // Favicons
    useFavicons(globalStory);

    // Head settings
    useHead({
        bodyAttrs: {
            class: "__body"
        }
    });

    // Page transition
    const pageTransition = usePageTransition("page-transition");

    // Enable appear transitions for the first page load
    nuxtApp.hook("app:suspense:resolve", () => {
        Events.dispatchEvent(TRANSITION_ENTER);
        Events.dispatchEvent(TRANSITION_ENTER_DONE);
    });

    // Grid
    const isGridVisible = ref(false);

    onKeyStroke(["G", "g"], (e) => {
        isGridVisible.value = !isGridVisible.value;
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
