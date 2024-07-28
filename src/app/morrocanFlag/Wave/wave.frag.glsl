precision mediump float;
uniform float uTime;
uniform vec3 uColor;
uniform sampler2D uImageTexture;
uniform sampler2D uDirtTexture;
varying vec2 vUv;
varying float vWave;

void main() {
    // vec3 color = sin(vUv.x + uTime) * uColor;
    float wave =vWave * 0.1;

    vec3 imageTextureColor= texture2D(uImageTexture,vUv+wave).rgb;
    
    vec3 dirtColor = texture2D(uDirtTexture, vUv+wave).rgb *(1.0 + sin(vUv.x + uTime));
    
    vec3 finalColor = imageTextureColor * dirtColor;

    gl_FragColor = vec4(finalColor, 1.0);
}
