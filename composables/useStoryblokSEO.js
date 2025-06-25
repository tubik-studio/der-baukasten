export function useStoryblokSEO(story) {
    // SEO data
    const data = story?.content?.seo;

    // Check for errors
    if (!data || !data.length) throw new Error("SEO data is not defined");

    // Vars
    const locale = "uk_UA";
    const siteName = "Der Baukasten";
    const siteURL = "";

    const seo = {
        ...data[0].main,
        keywords: data[0].keywords,
        og_image: data[0].og_image.filename,
        siteURL: data[0].site_url
    };

    useHead({
        title: seo.title,
        htmlAttrs: {
            lang: locale
        },
        meta: [
            // Common information for search robots
            { name: "description", content: seo.description },
            { name: "keywords", content: seo.keywords },
            { name: "author", content: "Tubik Studio" },
            { name: "designer", content: "Tubik Studio" },

            // Facebook
            { property: "og:locale", content: locale },
            { property: "og:title", content: seo.og_title || seo.title },
            { property: "og:type", content: "website" },
            { property: "og:url", content: seo.siteURL || siteURL },
            { property: "og:site_name", content: siteName },
            { property: "og:description", content: seo.og_description || seo.description },
            { property: "og:image", content: seo.og_image },

            // Twitter
            { name: "twitter:card", content: "summary" },
            { name: "twitter:site", content: siteName },
            { name: "twitter:creator", content: "Tubik Studio" },
            { name: "twitter:title", content: seo.twitter_title || seo.title },
            { name: "twitter:description", content: seo.twitter_description || seo.description },
            { name: "twitter:image", content: seo.twitter_image || seo.og_image },

            // Google Plus
            { itemprop: "name", content: seo.title },
            { itemprop: "description", content: seo.description },
            { itemprop: "image", content: seo.og_image }
        ]
    });
}
