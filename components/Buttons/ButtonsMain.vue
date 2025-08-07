<template>
    <component
        class="buttons-main"
        :class="`--type-${options.type}`"
        :is="tags[options.tag]"
        :link="options.link.url"
        :target="options.link.target"
    >
        <div class="buttons-main__text">
            <span>{{ options.text }}</span>
        </div>
        <div class="buttons-main__icon" v-if="options.icon">
            <div class="buttons-main__icon__mover">
                <Icon :name="options.icon" size="1.25rem"></Icon>
                <Icon :name="options.icon" size="1.25rem"></Icon>
            </div>
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
</script>

<style lang="scss" scoped>
    $icon-size: 1.5rem;

    .buttons-main {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        line-height: 1;
        white-space: nowrap;
        outline: none;
        border: none;

        &__text {
            display: inline-flex;
            justify-content: center;
            align-items: center;
            font-weight: 500;
            text-align: center;
            overflow: hidden;

            span {
                display: inline-block;
                width: 100%;
                white-space: nowrap;
            }
        }

        &__icon {
            position: relative;
            border-radius: 50%;
            overflow: hidden;

            &__mover {
                position: absolute;
                top: 0;
                right: 0;
                display: flex;
                align-items: center;
                justify-content: space-around;
                width: 200%;
                height: 100%;
            }
        }
    }

    // Type text
    .buttons-main.--type-text {
        color: var(--color-contrast);
        background: none;
        gap: px-to-rem(10);

        .buttons-main__text {
            font-size: px-to-rem(18);
        }

        .buttons-main__icon {
            height: $icon-size;
            width: $icon-size;
            color: currentColor;
        }
    }

    .buttons-main__icon__mover {
        transform: translateX(0);
        transition: transform $tr-time $tr-atf;
    }

    .buttons-main:hover,
    .buttons-main:focus-visible {
        .buttons-main__icon__mover {
            transform: translateX(50%);
        }
    }
</style>
