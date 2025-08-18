"use client";
import {
  forwardRef,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
  useEffect,
} from "react";
import {
  Canvas,
  extend,
  useFrame,
  useLoader,
  useThree,
} from "@react-three/fiber";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

extend({ OrbitControls });

const CameraControls = () => {
  const { camera, gl: { domElement } } = useThree();
  const ref = useRef<any>(null);

  useFrame(() => {
    if (ref.current) ref.current.update();
  });

  return (
    <orbitControls
      args={[camera, domElement]}
      ref={ref}
      autoRotate
      autoRotateSpeed={1}
    />
  );
};

const getPointsPositionsInsideSphere = (count: number, radius: number) => {
  const positions: number[] = [];

  for (let i = 0; i < count; i++) {
    const r = Math.cbrt(Math.random()) * radius;
    const theta = Math.random() * 2 * Math.PI;
    const phi = Math.acos(2 * Math.random() - 1);

    const x = r * Math.sin(phi) * Math.cos(theta);
    const y = r * Math.sin(phi) * Math.sin(theta);
    const z = r * Math.cos(phi);

    positions.push(x, y, z);
  }

  return new Float32Array(positions);
};

function easeInExpo(x: number): number {
  return x === 0 ? 0 : Math.pow(2, 10 * x - 10);
  }

  function easeInOutExpo(x: number): number {
    return x === 0
      ? 0
      : x === 1
      ? 1
      : x < 0.5 ? Math.pow(2, 20 * x - 10) / 2
      : (2 - Math.pow(2, -20 * x + 10)) / 2;
    }

export interface PointsRef {
  triggerIntroAnimation: () => void;
}

const Points = forwardRef<PointsRef>((_, ref) => {
  const pointTexture: THREE.Texture = useLoader(THREE.TextureLoader, "/images/circle.png");
  const bufferRef = useRef<THREE.BufferGeometry>(null);

  const pointCount = 2000;
  const sphereRadius = 100;

  const finalPositions = useMemo(() => getPointsPositionsInsideSphere(pointCount, sphereRadius), []);
  const currentPositions = useRef<Float32Array>(
    new Float32Array(finalPositions.length).fill(0)
  );

  const animationStartTime = useRef<number | null>(null);
  const [hasStarted, setHasStarted] = useState(false);
  const [animationPhase, setAnimationPhase] = useState<"idle" | "intro" | "wave">("idle");

  useImperativeHandle(ref, () => ({
    triggerIntroAnimation() {
      console.log("triggerIntroAnimation");
      setAnimationPhase("intro");
      animationStartTime.current = null;
    },
  }));

  const color = useMemo(() => {
    const color = new THREE.Color("white");
    color.lerp(new THREE.Color("pink"), Math.random());
    return color;
  }, []);

  useFrame(({ clock }) => {
    const pos = currentPositions.current;
    const target = finalPositions;

    if (!bufferRef.current) return;

    const geometryPos = bufferRef.current.attributes.position.array as Float32Array;
    const time = clock.getElapsedTime();

    if (animationPhase === "intro") {
      if (animationStartTime.current === null) {
        animationStartTime.current = time;
      }

      const elapsed = time - animationStartTime.current;
      const duration = 2; // seconds

    
      const t = Math.min(elapsed / duration, 1) ;

      function easeInOutQuart(x: number): number {
        return x < 0.5 ? 8 * x * x * x * x : 1 - Math.pow(-2 * x + 2, 4) / 2;
        }
      const easedT = easeInOutQuart(t)*2;

      for (let i = 0; i < pos.length; i++) {
        pos[i] = target[i] * easedT;
        geometryPos[i] = pos[i] + Math.sin(pos[i] * 0.2 + time/2) * 0.1;
      }

      bufferRef.current.attributes.position.needsUpdate = true;
    }

  });

  return (
    <points>
      <bufferGeometry attach="geometry" ref={bufferRef}>
        <bufferAttribute
          attach="attributes-position"
          args={[currentPositions.current, 3]}
          count={pointCount}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        attach="material"
        map={pointTexture}
        color={color}
        size={0.5 + Math.random() * 0.2}
        sizeAttenuation
        transparent
        alphaTest={0.5}
        opacity={1.0}
      />
    </points>
  );
});
Points.displayName = "Points";

export interface AnimationCanvasRef {
  triggerIntroAnimation: () => void;
}
const AnimationCanvas = forwardRef<AnimationCanvasRef, {}>((_, ref) => {
  const pointsRef = useRef<PointsRef>(null);


  useImperativeHandle(ref, () => ({
    triggerIntroAnimation() {
      console.log("triggerIntroAnimation 1");
      pointsRef.current?.triggerIntroAnimation()
    },
  }));

  return (
    <Canvas
      camera={{
        position: [0, 0, 150],
        fov: 75,
      }}
    >
      <Points ref={pointsRef} />
      <CameraControls />
    </Canvas>
  );
});


export default AnimationCanvas;
