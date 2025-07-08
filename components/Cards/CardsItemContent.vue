<template>
    <div class="cards-item-content">
        <!-- Phonetic Image -->
        <img class="cards-item-content__phonetic" :src="phonetic?.filename" :alt="phonetic?.alt" />

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
            <button class="cards-item-content__button">Download</button>
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
        desc: Object
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
            gap: 3.5vh;
            max-width: 480px;
        }

        &__phonetic {
            position: absolute;
            top: 0;
            left: 0;
            display: block;
            width: clamp(4.75rem, 3.393rem + 2.121vw, 5.938rem);
            transform: translate(1%, -5%);
        }

        &__title {
            font-size: px-to-rem(180);
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
    }
</style>
