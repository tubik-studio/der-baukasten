<template>
    <section class="cards-item" :class="{ 'is-visible': isVisible, light: theme === 'light', dark: theme === 'dark' }">
        <CardsItemScroll :id="id" @update-is-visible-state="updateIsVisibleState">
            <CardsItemHover :id="id" :color="color">
                <CardsItemContent :phonetic="phonetic" :title="title" :subtitle="subtitle" :desc="desc" />
            </CardsItemHover>
        </CardsItemScroll>
    </section>
</template>

<script setup>
    // Props
    const props = defineProps({
        id: {
            type: Number,
            required: true
        },
        length: {
            type: Number,
            required: true
        },
        phonetic: {
            type: Object,
            required: true
        },
        title: {
            type: String,
            default: ""
        },
        subtitle: {
            type: String,
            default: ""
        },
        desc: {
            type: Object,
            default: () => ({})
        },
        color: {
            type: String,
            default: "#f0f0f0"
        },
        theme: {
            type: String,
            default: "light"
        }
    });

    // Visibility state
    const isVisible = ref(false);

    const updateIsVisibleState = (state) => {
        isVisible.value = state;
    };
</script>

<style lang="scss" scoped>
    .cards-item {
        display: flex;
        justify-content: flex-end;
        height: 100vh;
        width: 100%;

        &.light {
            color: var(--color-light);
        }

        &.dark {
            color: var(--color-dark);
        }
    }
</style>
