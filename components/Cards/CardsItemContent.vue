<template>
    <div class="cards-item-content">
        <!-- Phonetic Image -->
        <CardsItemPhonetic class="cards-item-content__phonetic" :image="phonetic" :sound-name="downloadFileName" />

        <div class="cards-item-content__inner">
            <!-- Title -->
            <h3 class="cards-item-content__title">{{ title }}</h3>

            <div class="cards-item-content__separator"></div>

            <!-- Sub title -->
            <h4 class="cards-item-content__subtitle">{{ subtitle }}</h4>

            <!-- Description -->
            <RichText class="cards-item-content__desc" :text="desc" />

            <div class="cards-item-content__separator"></div>

            <!-- Button -->
            <a class="cards-item-content__button" :href="`/download/${downloadFileName}.obj`" download>
                <span>
                    <Icon name="ri:download-line" />
                    Download 3D Model
                </span>
            </a>
        </div>
    </div>
</template>

<script setup>
    // Props
    const props = defineProps({
        phonetic: {
            type: Object,
            required: true
        },
        title: String,
        subtitle: String,
        desc: Object,
        color: {
            type: String,
            default: "#f0f0f0"
        },
        downloadFileName: {
            type: String,
            required: true
        }
    });
</script>

<style lang="scss" scoped>
    .cards-item-content {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;

        &__inner {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            gap: 3.5vh;
            max-width: 480px;
        }

        &__phonetic {
            position: absolute;
            top: 0;
            left: 0;
        }

        &__title {
            font-size: clamp(8rem, 6.917rem + 3.611vw, 11.25rem);
            font-weight: 500;
            letter-spacing: -0.07em;
            line-height: 1;
            margin-top: -0.25em;
            margin-left: -0.05em;
        }

        &__subtitle {
            font-size: px-to-rem(40);
            font-weight: 300;
            line-height: 1;
        }

        &__desc {
            font-size: px-to-rem(20);
            font-weight: 400;
            line-height: 1.2;
            letter-spacing: -0.04em;
        }

        &__separator {
            width: 100%;
            height: 0;
            border-top: 1px solid currentColor;
        }

        &__button {
            display: flex;
            align-items: center;
            padding: 0.75rem 1.5rem;
            font-size: px-to-rem(20);
            font-weight: 500;
            color: currentColor;
            border: 1px solid currentColor;
            border-radius: px-to-rem(12);
            cursor: pointer;
            background: none;
            transition: background-color $tr-time;

            span {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                transition: color $tr-time;
            }

            &:hover {
                span {
                    color: v-bind(color);
                }
                background-color: currentColor;
            }

            svg {
                width: 1.25rem;
                height: 1.25rem;
            }
        }
    }
</style>
