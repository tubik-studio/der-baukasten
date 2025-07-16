<template>
    <footer class="the-footer">
        <div class="container">
            <div ref="logo" class="the-footer__logo">
                <TheLogo v-fitty />
            </div>

            <RichText class="the-footer__copyright" :text="content?.copyright"></RichText>
        </div>
    </footer>
</template>

<script setup>
    // Props
    defineProps({
        content: {
            type: Object,
            required: true
        }
    });

    // Refs
    const $refLogo = useTemplateRef("logo");

    // Animation
    useAnimation({
        onEnter: ({ $gsap, transitions }) => {
            const logo = $gsap.from(".the-footer__logo .char", {
                yPercent: 100,
                duration: 1,
                stagger: 0.02,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: $refLogo.value,
                    start: "bottom bottom"
                }
            });

            transitions.push(logo);
        }
    });
</script>

<style lang="scss" scoped>
    .the-footer {
        position: relative;
        z-index: 5;
        height: 100vh;
        text-align: center;
        @include respond-pad(padding-block-end);

        .container {
            height: 100%;
            justify-content: flex-end;
            flex-direction: column;
            gap: 4rem;
        }

        &__logo {
            :deep(.the-logo .line-mask) {
                margin-left: -0.05em;
                padding-right: 0.05em;
            }
        }
    }
</style>
