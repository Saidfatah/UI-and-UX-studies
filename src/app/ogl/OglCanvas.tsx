"use client"
import { useEffect, useRef } from 'react';
import { WebGLInstance } from './webglInstance';

export default function OGLCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const instanceRef = useRef<WebGLInstance | null>(null);

useEffect(() => {
  if (!canvasRef.current) return;

  const instance = new WebGLInstance(canvasRef.current);
  instanceRef.current = instance;

  const handleResize = () => instance.resize();
  window.addEventListener('resize', handleResize);

  return () => {
    window.removeEventListener('resize', handleResize);
    instance.destroy();
  };
}, []);

  return <canvas ref={canvasRef}  className=' !w-screen !h-screen' />;
}
