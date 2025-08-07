<template>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2000 2000" fill="none">
        <defs>
            <filter
                id="monotoneNoise"
                width="2000"
                height="2000"
                filterUnits="userSpaceOnUse"
                color-interpolation-filters="sRGB"
            >
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                <feTurbulence
                    type="fractalNoise"
                    baseFrequency="0.5 0.5"
                    stitchTiles="stitch"
                    numOctaves="3"
                    result="noise"
                    seed="9558"
                />
                <feColorMatrix in="noise" type="luminanceToAlpha" result="alphaNoise" />
                <feComponentTransfer in="alphaNoise" result="coloredNoise1">
                    <feFuncA
                        type="discrete"
                        tableValues="0 0 0 0 0 0 0 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 "
                    />
                </feComponentTransfer>
                <feComposite operator="in" in2="shape" in="coloredNoise1" result="noise1Clipped" />
                <feFlood flood-color="rgba(0, 0, 0, 0.05)" result="color1Flood" />
                <feComposite operator="in" in2="noise1Clipped" in="color1Flood" result="color1" />
                <feMerge result="effect1_noise_20_491">
                    <feMergeNode in="shape" />
                    <feMergeNode in="color1" />
                </feMerge>
            </filter>
        </defs>
    </svg>
</template>

<style lang="scss" scoped>
    svg {
        pointer-events: none;
        position: fixed;
        top: 0;
        left: 0;
        z-index: -1000;
        opacity: 0;
    }
</style>
