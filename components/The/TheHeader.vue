<template>
    <header class="the-header container" ref="header">
        <div class="the-header__content">
            <!-- Description -->
            <p class="the-header__desc">A subtle concept for game design or interior mood</p>

            <!-- Logo-->
            <a class="the-header__logo" ref="logo" href="#hero">
                <TheLogo v-fitty />
            </a>

            <!-- Contacts button -->
            <button class="the-header__button">Contact us</button>
        </div>
    </header>
</template>

<script setup>
    const props = defineProps({
        content: {
            type: Object,
            required: true
        }
    });

    // Refs
    const $refHeader = useTemplateRef("header");
    const $refLogo = useTemplateRef("logo");

    // Animation
    useAnimation({
        onEnter: ({ $gsap, $scrollTrigger, transitions }) => {
            // const logoFlip = $gsap.to($refLogo.value, {
            //     y: 0,
            //     scale: 0.1,
            //     duration: 1.5,
            //     ease: "power2.inOut",
            //     scrollTrigger: {
            //         start: 0,
            //         toggleActions: "play none none reverse",
            //         onUpdate: () => {
            //             console.log("update")
            //         }
            //     }
            // });
            //
            // $scrollTrigger.create({
            //     start: 100,
            //     toggleActions: "play none none reverse",
            // });
            //
            // transitions.push(logoFlip);
        }
    });
</script>

<style lang="scss" scoped>
    $pad: 1.875rem;

    .the-header {
        position: fixed;
        z-index: 1000;
        left: 0;
        top: 0;
        width: 100%;
        padding-top: $pad;
        padding-bottom: $pad;

        @include respond-mobile(s) {
            padding-top: $pad * 0.66;
            padding-bottom: $pad * 0.66;
        }

        &__content {
            position: relative;
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 100%;
        }

        &__desc {
            max-width: 250px;
            font-size: px-to-rem(18);
            font-weight: 500;
            text-wrap: balance;
        }

        &__logo {
            position: absolute;
            top: 0;
            left: 0;
            transform-origin: left top;
            width: 100%;
            transform: translateY(calc(100vh - 100% - #{$pad} - 5rem));

            .the-logo {
                margin-left: -0.05em;
            }
        }
    }
</style>
