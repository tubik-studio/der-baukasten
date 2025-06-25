<template>
    <header class="the-header" :class="{ 'is-open': isMobileNavOpen }" ref="$refHeader">
        <div class="the-header__content container">
            <!-- Logo-->
            <a v-if="isHomePage" href="#hero"><TheLogo text /></a>
            <nuxt-link v-else to="/"><TheLogo text /></nuxt-link>

            <!-- Navigation (.the-header__mobile-nav has styles just on mobile) -->
            <div class="the-header__mobile-nav">
                <div class="the-header__mobile-nav__inner">
                    <TheNav :nav-list="content.nav" @click="closeMobileNav" />
                </div>
            </div>

            <!-- Hamburger -->
            <TheHamburger :is-open="isMobileNavOpen" @click="toggleMobileNav" />
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

    const isMobileNavOpen = ref(false);

    const openMobileNav = () => {
        isMobileNavOpen.value = true;
    }

    const closeMobileNav = () => {
        isMobileNavOpen.value = false;
    }

    const toggleMobileNav = () => {
        isMobileNavOpen.value = !isMobileNavOpen.value;
    }

    const route = useRoute();
    const isHomePage = computed(() => {
        return route.name === "index";
    });

    onMounted(() => {
        window.addEventListener("resize", () => {
            closeMobileNav();
        })
    })
</script>

<style lang="scss" scoped>
    $pad: 1.875rem;

    .the-header {
        position: fixed;
        z-index: 1000;
        left: 0;
        top: 0;
        width: 100%;

        &__content {
            position: relative;
            align-items: center;
            justify-content: space-between;
            padding-top: $pad;
            padding-bottom: $pad;

            @include respond-mobile(s) {
                padding-top: $pad * 0.66;
                padding-bottom: $pad * 0.66;
            }
        }

        .the-logo {
            width: clamp(10rem, 5rem + 10vw, 15rem);
        }

        .the-hamburger {
            display: none;

            @include respond-mobile(m) {
                display: flex;
            }
        }
    }

    // Mobile navigation
    @include respond-mobile(m) {
        .the-header {
            &__mobile-nav {
                position: absolute;
                z-index: -1;
                top: 0;
                left: 0;
                width: 100%;
                height: 0;
                overflow: hidden;
                background-color: var(--color-light);

                &__inner {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 100%;
                    height: 100vh;
                }

                .the-nav {
                    grid-auto-flow: row;
                    text-align: center;

                    :deep(.the-nav__item) {
                        font-size: 2rem;
                        font-weight: 500;
                        color: var(--color-dark);
                    }
                }
            }

            .the-hamburger {
                @include respond-mobile(m) {
                    display: flex;
                }
            }
        }

        // Mobile navigation (Open state)
        .the-header {
            .the-logo {
                //
                transition: color $tr-time $tr-atf;
            }

            &__mobile-nav {
                //
                transition: height $tr-time $tr-atf;
            }
        }

        .the-header.is-open {
            .the-logo {
                color: var(--color-dark);
            }

            .the-header__mobile-nav {
                height: 100vh;
            }
        }
    }
</style>