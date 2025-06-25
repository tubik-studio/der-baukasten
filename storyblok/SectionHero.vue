<template>
    <section class="section-hero" :id="blok.id">
        <div class="container">
            <div class="content">
                <h1 class="heading-2">{{ blok.title }}</h1>
                <p class="par-1">{{ blok.desc }}</p>
            </div>
        </div>
    </section>
</template>

<script setup>
    // Props
    const props = defineProps({
        blok: Object
    });
</script>

<style lang="scss" scoped>
    .section-hero {
        height: 100vh;

        .container {
            height: 100%;
        }

        .content {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100%;
        }

        .par-1 {
            opacity: 0.6;
        }
    }
</style>
