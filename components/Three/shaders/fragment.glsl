uniform sampler2D tDiffuse;
uniform vec2 uMouse;
uniform vec2 uMouseVelocity;
uniform vec2 uResolution;
uniform float uBlockSize;
uniform float uRadius;
uniform float uActivity;
uniform float uTime;
varying vec2 vUv;

float random(vec2 co) {
    return fract(sin(dot(co.xy, vec2(23.13,91.7))) * 43758.5453);
}

void main() {
    vec2 uv = vUv;
    vec2 pixelPos = uv * uResolution;

    float dist = distance(pixelPos, uMouse);
    float glitchZone = smoothstep(uRadius, 0.0, dist);

    vec2 blockCoord = floor(pixelPos / uBlockSize);

    float shift = random(vec2(blockCoord.y, floor(uTime))) - 0.5;

    // Movement-based direction
    vec2 shiftVec = normalize(uMouseVelocity + vec2(0.0001)); // prevent NaN
    float strength = uActivity * glitchZone * uBlockSize;

    // Displace the pixel
    vec2 displaced = pixelPos + shiftVec * shift * strength;

    // Sample with snapping for clean edges
    vec2 snappedUV = floor(displaced) / uResolution;
    gl_FragColor = texture2D(tDiffuse, snappedUV);
}