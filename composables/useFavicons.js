export function useFavicons(globalStory) {
    // Abort if globalStory is not available, or it doesn't have the required properties
    if (globalStory.value === undefined || globalStory.value?.content?.favicons?.length === 0) return;

    // Get computed properties
    const favicons = computed(() => globalStory.value?.content?.favicons?.[0]);
    const faviconPNG = computed(() => favicons?.value?.favicon_png?.filename);
    const faviconSVG = computed(() => favicons?.value?.favicon_svg?.filename);
    const faviconICO = computed(() => favicons?.value?.favicon_ico?.filename);
    const faviconApple = computed(() => favicons?.value?.favicon_apple?.filename);

    // Set favicon properties
    useHead({
        bodyAttrs: {
            class: "__body"
        },
        link: [
            { rel: "icon", type: "image/png", href: faviconPNG?.value, sizes: "96x96" },
            { rel: "icon", type: "image/svg+xml", href: faviconSVG?.value },
            { rel: "shortcut icon", href: faviconICO?.value },
            { rel: "apple-touch-icon", sizes: "180x180", href: faviconApple?.value }
        ]
    });
}
