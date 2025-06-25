<template>
    <main class="page-home" v-if="story">
        <StoryblokComponent v-for="section in story.content.sections" :blok="section" :key="section._uid" />

        <section class="section-test" id="test-1">
            <h1>Test 1</h1>
        </section>
        <section class="section-test" id="test 2">
            <h1>Test 2</h1>
        </section>
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

    .page-home {
        video {
            width: 50%;
        }
    }

    .section-test {
        height: 100vh;

        &:nth-child(2) {
            background-color: lightcoral;
        }

        &:nth-child(3) {
            background-color: lightblue;
        }
    }
</style>
