<template>
    <div class="grid">
        <div class="container">
            <div class="grid__container">
                <div class="grid__column"></div>
                <div class="grid__column"></div>
                <div class="grid__column"></div>
                <div class="grid__column"></div>
                <div class="grid__column"></div>
                <div class="grid__column"></div>
                <div class="grid__column"></div>
                <div class="grid__column"></div>
                <div class="grid__column"></div>
                <div class="grid__column"></div>
                <div class="grid__column"></div>
                <div class="grid__column"></div>
            </div>

            <div class="grid__line-top"></div>
            <div class="grid__line-top-2"></div>
            <div class="grid__line-bottom"></div>
        </div>
    </div>
</template>

<script setup></script>

<style lang="scss" scoped>
    .grid {
        pointer-events: none;
        position: fixed;
        z-index: 9999;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;

        .container {
            height: 100%;
            width: 100%;
        }

        &__container {
            position: relative;
            display: grid;
            grid-template-columns: repeat(12, 1fr);
            gap: $grid-gap;
            height: 100%;
            width: 100%;
        }

        &__column {
            background-color: rgba(lightblue, 0.1);
            border-left: 1px dashed rgba(blue, 0.5);
            border-right: 1px dashed rgba(blue, 0.5);
        }

        &__line-top,
        &__line-top-2,
        &__line-bottom {
            position: absolute;
            left: 0;
            right: 0;
            width: 100%;
            border-top: 1px dashed rgba(blue, 0.5);
        }

        &__line-top {
            top: $header-padding;
        }

        &__line-top-2 {
            top: calc($header-padding + 1.5rem);
        }

        &__line-bottom {
            bottom: $header-padding;
        }
    }

    .storyblok--outlined .grid {
        display: block;
    }
</style>
