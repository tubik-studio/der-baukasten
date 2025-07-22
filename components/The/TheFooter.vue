<template>
    <footer ref="footer" class="the-footer">
        <div class="container">
            <div ref="logo" class="the-footer__logo">
                <TheLogo v-fitty />
            </div>

            <RichText class="the-footer__copyright" :text="content?.copyright"></RichText>
        </div>
    </footer>
</template>

<script setup>
    import { useMainStore } from "~/stores/mainStore";

    // Props
    defineProps({
        content: {
            type: Object,
            required: true
        }
    });

    // Globals
    const mainStore = useMainStore();

    // Refs
    const $refFooter = useTemplateRef("footer");
    const $refLogo = useTemplateRef("logo");

    // Footer 3D View (all 3 animals visible)
    const footerViewProgress = ref(0);

    // Animation
    useAnimation({
        onEnter: ({ $gsap, $scrollTrigger, transitions }) => {
            const media = $gsap.matchMedia();
            let footer3dViewMobile, footer3dViewDesktop;

            media.add("(min-width: 1025px)", () => {
                footer3dViewDesktop = $gsap.fromTo(
                    footerViewProgress,
                    {
                        value: 0
                    },
                    {
                        value: 1,
                        duration: 1,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: "body",
                            start: () => "bottom 300%",
                            end: () => "bottom bottom",
                            scrub: true
                        }
                    }
                );

                return () => {
                    footer3dViewDesktop?.kill();
                };
            });

            media.add("(max-width: 1025px)", () => {
                footer3dViewMobile = $gsap.fromTo(
                    footerViewProgress,
                    {
                        value: 0
                    },
                    {
                        value: 1,
                        scrollTrigger: {
                            trigger: $refFooter.value,
                            start: () => "top bottom",
                            end: () => "bottom bottom",
                            scrub: true
                        }
                    }
                );

                return () => {
                    footer3dViewMobile?.kill();
                };
            });

            // Logo appear animation
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

            transitions.push(logo, footer3dViewMobile, footer3dViewDesktop);
        }
    });

    // Watch progress
    watch(footerViewProgress, (progress) => {
        console.log(progress);
        mainStore.updateThreeAnimationFrame(900 + 200 * progress);
        mainStore.updateCanvasPositionY(0 - 0.15 * progress);

        mainStore.updateCanvasPositionX(window.innerWidth > 1024 ? -0.251 + 0.251 * progress : 0);
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
