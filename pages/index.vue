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
    import { useMainStore } from "~/stores/mainStore";
    import { useMediaQuery, useWindowSize } from "@vueuse/core";

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

    // Globals
    const mainStore = useMainStore();
    const nuxtApp = useNuxtApp();

    // Desktop
    const isMobile = useMediaQuery("(max-width: 1024px)");

    // Window size
    const { height: windowHeight } = useWindowSize();

    // Create a scrubber to control the three animation
    const createScrubber = (startId, triggerEnd, frameFrom, frameTo, callback = () => {}) => {
        return nuxtApp.$scrollTrigger.create({
            trigger: "body",
            start: () => windowHeight.value * 2 * startId,
            end: () => triggerEnd,
            scrub: true,
            onUpdate: ({ progress }) => {
                mainStore.updateThreeAnimationFrame(frameFrom + (frameTo - frameFrom) * progress);
                callback(progress);
            }
        });
    };

    // Scroll animation
    useAnimation({
        onEnter: ({ transitions }) => {
            // 1. Hero -> Rooster
            const heroToRooster = createScrubber(0, "+=175%", 0, 200, (progress) => {
                mainStore.updateCanvasPositionX(-0.051 - 0.2 * progress);
            });

            // 2. Rooster -> Stork
            const roosterToStork = createScrubber(1, "+=200%", 200, 500);

            // 3. Stork -> Horse
            const storkToHorse = createScrubber(2, "+=200%", 500, 740);

            // Cleanup
            transitions.push(heroToRooster, roosterToStork, storkToHorse);
        }
    });
</script>

<style lang="scss" scoped>
    @use "sass:math";

    .section-test {
        height: 100vh;
    }
</style>
