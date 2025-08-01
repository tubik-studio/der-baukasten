uniform sampler2D inputBuffer;
uniform vec3 weights;

varying vec2 vUv;

void main() {

    vec4 texel = texture2D(inputBuffer, vUv);
    gl_FragColor = vec4(texel.rgb * weights, texel.a);

}