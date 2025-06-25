export async function useAsyncStoryPage(
    story,
    pageName,
    version = "draft",
    resolveRelations = [],
    bridgeOptions = {},
    bridge = true
) {
    const storyblokApi = useStoryblokApi();

    const { data } = await storyblokApi.get(`cdn/stories/${pageName}`, {
        version,
        resolve_relations: resolveRelations
    });
    story.value = data.story;

    if (story.value === undefined) {
        throw new Error(`Page "${pageName}" was not found in Storyblok`);
    }

    // Bridge
    if (bridge && process.client) {
        useStoryblokBridge(
            story.value.id,
            (evStory) => {
                story.value = evStory;
                console.log(evStory);
            },
            bridgeOptions
        );
    }
}
