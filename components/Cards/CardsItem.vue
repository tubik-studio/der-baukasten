<template>
    <section class="cards-item" :class="{ 'is-visible': isVisible, light: theme === 'light', dark: theme === 'dark' }">
        <CardsItemScroll :id="id" @update-is-visible-state="updateIsVisibleState">
            <CardsItemHover :id="id" :active-card-id="activeCardId" :color="color">
                <CardsItemContent
                    :color="color"
                    :phonetic="phonetic"
                    :title="title"
                    :subtitle="subtitle"
                    :desc="desc"
                    :download-file-name="downloadFileName"
                />
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
        activeCardId: {
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
        },
        downloadFileName: {
            type: String,
            required: true
        }
    });

    // Visibility state
    const isVisible = ref(false);

    // Emits
    const emit = defineEmits(["updateActiveItemId"]);

    const updateIsVisibleState = (state) => {
        isVisible.value = state[0];
        emit("updateActiveItemId", state[1]);
    };
</script>

<style lang="scss" scoped>
    .cards-item {
        display: flex;
        justify-content: flex-end;
        height: 100vh;
        width: 100%;

        &.light {
            --primary-color: var(--color-light);
            --contrast-color: var(--color-dark);
            color: var(--color-light);
        }

        &.dark {
            --primary-color: var(--color-dark);
            --contrast-color: var(--color-light);
            color: var(--color-dark);
        }
    }
</style>
