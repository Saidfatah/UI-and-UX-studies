"use client"
import * as Three from 'three';
import React, { useRef } from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'

import fragShader from './wave.frag.glsl'
import vertexShader from './wave.vertex.glsl'

const saidfatahImage ='/images/saidFatahImage.jpeg'
const moroccanFlagImagePath ='/images/Flag_of_Morocco.png'
const wallTextureImagePath ='/images/walltexture.jpg'

const plainArgsForSaidFatahImage=[1, 1, 16, 16]
const plainArgsForMoroccanFlagImage=[1.5, 1, 32, 32]

const Wave = () => {
    const ref = useRef();

    useFrame(({ clock }) => {
        if (ref.current) {
            ref.current.uniforms.uTime.value = clock.getElapsedTime();
        }
    });

    const [image]=useLoader(Three.TextureLoader,[moroccanFlagImagePath])
    const [dirtImage]=useLoader(Three.TextureLoader,[wallTextureImagePath])

    return (
        <mesh>
              <planeGeometry args={plainArgsForMoroccanFlagImage} />
            <shaderMaterial
                ref={ref}
                fragmentShader={fragShader}
                vertexShader={vertexShader}
                uniforms={{
                    uColor: { value: new Three.Color("hotpink") },
                    uImageTexture: { value: image },
                    uDirtTexture: { value: dirtImage },
                    uTime: { value: 0 } // Initial value
                }}
            />
        </mesh>
    );
};

const WaveScene = () => {
    return (
        <Canvas camera={{ fov: 15 }}>
            <ambientLight color="0x404040" position={[0, 0, 0]} />
            <Wave />
        </Canvas>
    )
}

export default WaveScene;