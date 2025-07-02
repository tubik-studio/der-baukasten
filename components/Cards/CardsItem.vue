<template>
    <section class="cards-item" :class="{ 'is-visible': isVisible }">
        <CardsItemScroll :id="id" @update-is-visible-state="updateIsVisibleState">
            <CardsItemHover :id="id" :color="color">
                <CardsItemContent :phonetic="phonetic" />
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
        color: {
            type: String,
            default: "#f0f0f0"
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
    }
</style>
