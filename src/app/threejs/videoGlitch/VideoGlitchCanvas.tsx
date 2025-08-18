'use client'
import React, { Suspense, useState } from "react";
import { Canvas, extend } from "@react-three/fiber";
import { useThree, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { useGLTF, Effects } from "@react-three/drei";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GlitchPass } from "three/examples/jsm/postprocessing/GlitchPass"
import { BloomPass } from "three/examples/jsm/postprocessing/BloomPass"
import { WaterPass } from './watterPass'
import * as THREE from "three";

extend({ OrbitControls });
extend({  GlitchPass, BloomPass, WaterPass });

const CameraControls = () => {
  const { camera, gl: { domElement } } = useThree();
  const ref = useRef<any>(null);

  useFrame(() => {
    if (ref.current) ref.current.update();
  });

  return (
    <orbitControls
      maxPolarAngle={Math.PI / 2}
      minPolarAngle={0}
      args={[camera, domElement]}
      ref={ref}
    />
  );
};


const Floor = () => {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
      <planeGeometry args={[100, 100, 1]} />
      <meshStandardMaterial color="white" />
    </mesh>
  )
}


const videoUrl = "/ghosttown.mp4"
const TV = () => {
  const { nodes } = useGLTF('/tv.gltf')

  const [video] = useState<HTMLVideoElement>(() => {
    const vid = document.createElement('video')
    vid.src = videoUrl
    vid.crossOrigin = "anonymous"
    vid.muted = true
    vid.loop = true
    vid.playsInline = true
    vid.play()
    return vid

  })

  return (
    <group rotation={[Math.PI, Math.PI * 1, 0]}>
      <mesh geometry={nodes.TV.geometry}>
        <meshStandardMaterial color="white" />
      </mesh>
      <mesh rotation={[0, 0, 0]} position={[0, 0, 1.1]}>
        <planeGeometry args={[3.2, 1.9]} />
        <meshStandardMaterial emissive={"white"} side={THREE.DoubleSide} >
          <videoTexture attach="map" args={[video]} />
          <videoTexture attach="emissiveMap" args={[video]} />
        </meshStandardMaterial>
      </mesh>
    </group>
  );
}

export default function VideoGlitchCanvas() {
  return (
    <Canvas>
      <Effects>
        <waterPass attachArray="passes" factor={1} />
        <bloomPass attachArray="passes" />
        <glitchPass attachArray="passes" />
      </Effects>
      <fog attach="fog" args={["black", 1, 7]} />
      <directionalLight intensity={0.5}  />
      <pointLight intensity={0.5} position={[1, 3, -2]} color="red" />
      <Floor />
      <CameraControls />
      <Suspense fallback={null}>  <TV /></Suspense>
    </Canvas>
  );
}
