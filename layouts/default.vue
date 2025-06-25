<template>
	<slot></slot>
</template>

<script setup>
    const showConsoleLogSignature = () => {
        const consoleBadgeStyle = [
            'background: #0e0e0e',
            'color: #fff',
            'padding: 24px 16px',
        ].join(';');

        console.log('%c Coded with ♥️ by Oleg Savenok: https://oleg-savenok.com', consoleBadgeStyle);
    }

    onMounted(() => {
        showConsoleLogSignature();
    })
</script>

<style scoped>

</style>