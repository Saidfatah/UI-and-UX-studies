precision mediump float;
uniform float uTime;
uniform vec2 uMouse;
varying vec2 vUv;
varying float vWave;

#pragma glslify: snoise3 = require(glsl-noise/simplex/3d);

void main() {
    vUv = uv;

    vec3 pos = position;
    float noiseFreq = 2.0;
    float noiseAmp = 0.25;
    float uTimeSlowed =  uTime / 2.0;
    
    // Use the mouse position to affect the noise frequency or amplitude
    vec2 mouseInfluence = (uMouse - 0.5) * 2.0; // Normalize mouse to range [-1, 1]
    vec3 noisePos = vec3((pos.x + mouseInfluence.x) * noiseFreq + uTimeSlowed , pos.y + mouseInfluence.y , pos.z);
    pos.z += snoise3(noisePos) * noiseAmp ;
    vWave = pos.z;

    vec4 modelPosition = modelMatrix * vec4(pos, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;
  
    gl_Position = projectedPosition;
}
