"use client"
import { OrbitControls } from "@react-three/drei";

import React from 'react'
import { Canvas } from '@react-three/fiber'
import "./three.style.css";


const vertexShader = `
void main() {
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    modelPosition.y += sin(modelPosition.x * 4.0) * 0.2;

    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;
  
    gl_Position = projectedPosition;
}
`
const fragShader = `
void main() {
    gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
}
`

const Scene = () => {
    return (<Canvas>

        <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} scale={1.5}>
            {/* <planeGeometry args={[3, 5]} /> */}
            <planeGeometry args={[1, 1, 32, 32]} />
            <shaderMaterial
            fragmentShader={fragShader}
            vertexShader={vertexShader}
            wireframe
            />
        </mesh>
        <axesHelper />
        <OrbitControls />
    </Canvas>)
}

function ThreePage() {
    return (<div className='canvasParent' >
        <Scene />
    </div>);
}

export default ThreePage;