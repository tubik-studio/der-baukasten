<template>
    <div class="cards-item-phonetic">
        <!-- Vector image -->
        <img class="cards-item-phonetic__phonetic" :src="image?.filename" :alt="image?.alt" />

        <!-- Sound button -->
        <button class="cards-item-phonetic__button" @click="play">
            <Icon name="ri:mic-fill" size="0.75rem" />
        </button>
    </div>
</template>

<script setup>
    // Props
    const props = defineProps({
        image: {
            type: Object,
            required: true
        },
        soundName: {
            type: String,
            required: true
        }
    });

    // Sound
    const { play } = useSound(`/sounds/${props.soundName}.mp3`);
</script>

<style lang="scss" scoped>
    .cards-item-phonetic {
        display: flex;
        align-items: center;
        gap: 1rem;

        &__phonetic {
            width: clamp(4.75rem, 3.393rem + 2.121vw, 5.938rem);
            transform: translate(1%, -5%);
        }

        &__button {
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 2.25rem;
            height: 2.25rem;
            padding: 0;
            margin: 0;
            color: var(--primary-color);
            border: 1px solid var(--primary-color);
            outline: none;
            background: transparent;
            border-radius: 50%;
            //
            transition:
                background-color $tr-time,
                color $tr-time;

            &:hover {
                color: var(--contrast-color);
                background-color: var(--primary-color);
            }
        }
    }
</style>
