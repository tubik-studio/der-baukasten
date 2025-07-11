<template>
    <slot></slot>
</template>

<script setup>
    const showConsoleLogSignature = () => {
        const consoleBadgeStyle = [
            "background: #0e0e0e",
            "color: #fff",
            "padding: 24px 16px",
            "border-radius: 0.5rem"
        ].join(";");

        console.log("%c Coded with ♥️ by tubik: https://tubikstudio.com", consoleBadgeStyle);
    };

    onMounted(() => {
        showConsoleLogSignature();
    });
</script>

<style scoped></style>
