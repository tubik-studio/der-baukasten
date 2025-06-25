<template>
    <component
        class="button-main"
        :class="`--type-${options.type}`"
        :is="tags[options.tag]"
        :link="options.link.url"
        :target="options.link.target"
    >
        <div class="button-main__text">
            <div class="button-main__text__mover">
                <span>{{ options.text }}</span>
                <span>{{ options.text }}</span>
            </div>
        </div>
        <div class="button-main__icon" v-if="options.icon">
            <Icon :name="options.icon" size="1.25rem"></Icon>
        </div>
    </component>
</template>

<script setup>
    // Imports
    import TagA from "~/components/Tags/TagA";
    import TagButton from "~/components/Tags/TagButton";
    import TagNuxtLink from "~/components/Tags/TagNuxtLink";

    // Tags list
    const tags = {
        a: TagA,
        button: TagButton,
        "nuxt-link": TagNuxtLink
    };

    // Props
    const props = defineProps({
        options: {
            type: Object,
            default: () => ({
                text: "Text not specified",
                link: {
                    url: "#",
                    target: "_self"
                },
                icon: "",
                type: "default", // fill, border, default
                tag: "a"
            })
        }
    });

    const anchor = computed(() => (props.options.link.url.startsWith("#") ? props.options.link.url : ""));
</script>

<style lang="scss" scoped>
    $icon-size: 2rem;
    $text-size: 2.5rem;

    .button-main {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        line-height: 1;
        white-space: nowrap;
        color: var(--color-contrast);
        background: none;

        &__text {
            display: inline-flex;
            justify-content: center;
            align-items: center;
            font-size: 1.125rem;
            text-transform: uppercase;
            text-align: center;
            overflow: hidden;

            &__mover {
                position: relative;
                display: flex;
                align-items: center;
                width: 100%;
            }

            span {
                display: inline-block;
                width: 100%;
                white-space: nowrap;

                &:first-child {
                    position: absolute;
                    right: 100%;
                    top: 0;
                }
            }
        }

        &__icon {
            display: flex;
            align-items: center;
            justify-content: center;
            height: $icon-size;
            width: $icon-size;
            border-radius: 50%;
            color: var(--color-primary);
            background-color: var(--color-contrast);
        }
    }
</style>
