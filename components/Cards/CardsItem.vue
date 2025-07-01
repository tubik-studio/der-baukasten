<template>
    <section class="cards-item">
        <div class="cards-item__inner">
            <img class="cards-item__phonetic" :src="phonetic?.filename" :alt="phonetic?.alt" />
        </div>
    </section>
</template>

<script setup>
    // Props
    const props = defineProps({
        phonetic: {
            type: Object,
            required: true
        },
        color: {
            type: String,
            default: "#f0f0f0"
        }
    });
</script>

<style lang="scss" scoped>
    .cards-item {
        cursor: pointer;
        display: flex;
        justify-content: flex-end;
        height: 100vh;
        width: 100%;

        &__inner {
            display: block;
            width: 100%;
            height: 100%;
            padding: 0 px-to-rem(24);
            background-color: v-bind(color);
        }

        &__phonetic {
            display: block;
            width: clamp(4.75rem, 3.393rem + 2.121vw, 5.938rem);
        }
    }

    // Hover
    .cards-item__phonetic {
        opacity: 0;
    }

    .cards-item__inner,
    .cards-item__phonetic {
        transition:
            transform $tr-atf $tr-time,
            opacity $tr-atf $tr-time;
    }

    .cards-item:hover {
        .cards-item__inner {
            transform: translateY(-3rem);
        }

        .cards-item__phonetic {
            opacity: 1;
            transform: translateY(1rem);
        }
    }
</style>
