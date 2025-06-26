<template>
    <div class="three">
        <img src="/images/temp.png" alt="temp" />
    </div>
</template>

<script setup></script>

<style lang="scss" scoped>
    .three {
        position: fixed;
        height: 100vh;
        width: 100%;
        inset: 0;

        img {
            width: 100%;
            height: 100%;
            object-fit: contain;
        }
    }
</style>
