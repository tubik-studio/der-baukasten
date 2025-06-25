<template>
    <div class="the-hamburger" :class="{ 'is-open': isOpen }">
        <div class="the-hamburger__line"></div>
        <div class="the-hamburger__line"></div>
        <div class="the-hamburger__line"></div>
    </div>
</template>

<script setup>
    const props = defineProps({
        isOpen: {
            type: Boolean,
            default: false
        }
    })
</script>

<style lang="scss" scoped>
    $radius: 2.75rem;

    .the-hamburger {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: $radius;
        height: $radius;
        border-radius: 50%;
        background-color: var(--color-light);

        &__line {
            width: 1.25rem;
            height: 2px;
            margin: 1.5px 0;
            transform: scaleX(1) rotate(0.0001deg);
            background-color: var(--color-dark);
        }
    }

    // Open state
    .the-hamburger {
        //
        transition: background-color $tr-time $tr-atf;
    }

    .the-hamburger__line {
        //
        transition: all $tr-time $tr-atf;
    }

    .the-hamburger.is-open {
        background-color: var(--color-dark);

        .the-hamburger__line {
            background-color: var(--color-light);
        }

        .the-hamburger__line:nth-child(1) {
            transform: translateY(5px) rotate(45deg);
        }

        .the-hamburger__line:nth-child(2) {
            transform: scaleX(0);
        }

        .the-hamburger__line:nth-child(3) {
            transform: translateY(-5px) rotate(-45deg);
        }
    }
</style>