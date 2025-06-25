<template>
    <div class="__app" ref="app">
        <TheHeader :content="globalStory.content" />

        <NuxtLayout>
            <NuxtPage ref="page" class="__page" :transition="pageTransition" />
        </NuxtLayout>
    </div>
</template>

<script setup>
    // Imports
    import { useMainStore } from "~/stores/mainStore";

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
