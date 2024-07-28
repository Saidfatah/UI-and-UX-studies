precision mediump float;
uniform float uTime;
varying vec2 vUv;
varying float vWave;

#pragma glslify: snoise3 = require(glsl-noise/simplex/3d);

void main() {
    vUv = uv;

    vec3 pos = position;
    float noiseFreq = 1.25;
    float noiseAmp = 0.25;
    float uTimeSlowed =  uTime / 2.0;
    vec3 noisePos = vec3(pos.x * noiseFreq + uTimeSlowed, pos.y, pos.z);
    pos.z += snoise3(noisePos) * noiseAmp;
    vWave=pos.z;

    vec4 modelPosition = modelMatrix * vec4(pos, 1.0);
    

    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;
  
    gl_Position = projectedPosition;
}