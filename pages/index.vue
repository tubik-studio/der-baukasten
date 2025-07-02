<template>
    <main class="page-home" v-if="story">
        <StoryblokComponent v-for="section in story.content.sections" :blok="section" :key="section._uid" />

        <ClientOnly>
            <Teleport to="#custom-teleports" :disabled="isMobile">
                <CardsList :list="story?.content?.cards" />
            </Teleport>
        </ClientOnly>

        <CardsOffset v-if="!isMobile" :length="story?.content?.cards?.length" />

        <section class="section-test" id="test-4"></section>
    </main>
</template>

<script setup>
    import { useMediaQuery } from "@vueuse/core";

    // Storyblok page data
    const pageName = "home";
    const version = useStoryblokVersion();
    const story = useState();
    await useAsyncStoryPage(story, pageName, version, []);

    // SEO
    useStoryblokSEO(story.value);

    // Disable default scroll behavior
    definePageMeta({
        scrollToTop: false
    });

    // Desktop
    const isMobile = useMediaQuery("(max-width: 1024px)");
</script>

<style lang="scss" scoped>
    @use "sass:math";

    .section-test {
        height: 100vh;
    }
</style>
