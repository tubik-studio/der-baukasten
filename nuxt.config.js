import glsl from "vite-plugin-glsl";

export default defineNuxtConfig({
    compatibilityDate: "2025-06-19",
    app: {
        head: {
            charset: "utf-8",
            title: "Der Baukasten",
            link: [{ rel: "stylesheet", href: "https://use.typekit.net/vme5ecb.css" }]
        }
    },
    modules: [
        [
            "@pinia/nuxt",
            {
                autoImports: ["defineStore"]
            }
        ],
        ["@storyblok/nuxt", { accessToken: process.env.STORYBLOK_ACCESS_TOKEN, cacheProvider: "memory" }],
        "@nuxt/image",
        "@nuxt/icon"
    ],
    buildModules: ["@vueuse/nuxt"],
    css: ["@/assets/css/base/_index.scss"],
    vite: {
        plugins: [glsl()],
        css: {
            preprocessorOptions: {
                scss: {
                    api: "modern",
                    additionalData: `
                      @use "@/assets/css/abstracts" as *;
                      @use "@/assets/css/variables" as *;
                  `
                }
            }
        }
    },
    image: {
        storyblok: {
            baseURL: "https://a.storyblok.com"
        }
    },
    icon: {
        mode: "svg",
        customCollections: [
            {
                prefix: "custom",
                dir: "./assets/icons"
            }
        ]
    },
    devServer: {
        https: {
            key: "localhost-key.pem",
            cert: "localhost.pem"
        }
    }
});
