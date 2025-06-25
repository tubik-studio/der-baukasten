<template>
    <div class="page-about">
        <SectionHero :blok="blok" />
    </div>
</template>

<script setup>
    // Test data
    const blok = {
        id: "about-hero",
        title: "About page",
        desc: "Test about page"
    };

    // Disable default scroll behavior
    definePageMeta({
        scrollToTop: false
    });
</script>

<style lang="scss" scoped>
    @use "sass:math";

    .page-home {
        video {
            width: 50%;
        }
    }

    .section-test {
        height: 100vh;

        &:nth-child(2) {
            background-color: lightcoral;
        }

        &:nth-child(3) {
            background-color: lightblue;
        }
    }
</style>
