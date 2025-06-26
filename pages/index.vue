<template>
    <main class="page-home" v-if="story">
        <StoryblokComponent v-for="section in story.content.sections" :blok="section" :key="section._uid" />

        <section class="section-test" id="test-1">
            <h1>Section 1</h1>
        </section>
        <section class="section-test" id="test-2">
            <h1>Section 2</h1>
        </section>
        <section class="section-test" id="test-3">
            <h1>Section 3</h1>
        </section>
        <section class="section-test" id="test-4">
            <h1>Section 4</h1>
        </section>

        <Teleport to="body">
            <CardsNav :list="story?.content?.cards" />
        </Teleport>
    </main>
</template>

<script setup>
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
</script>

<style lang="scss" scoped>
    @use "sass:math";

    .section-test {
        height: 100vh;

        &:nth-child(2) {
            background-color: var(--color-red);
        }

        &:nth-child(3) {
            background-color: var(--color-blue);
        }

        &:nth-child(4) {
            background-color: var(--color-yellow);
        }

        &:nth-child(5) {
            background-color: var(--color-black);
        }
    }
</style>
