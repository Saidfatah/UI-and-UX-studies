"use client"
import {
    Renderer,
    Triangle,
    Program,
    Mesh,
    Camera,
    Box,
    Transform,
} from 'ogl';
import React, { useEffect } from 'react';

function easeInOutCubic(x: number): number {
    return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
}

function OglSpiningBoxExample() {
    const canvasHolderRef = React.useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!canvasHolderRef.current) return;

        const renderer = new Renderer();
        const gl = renderer.gl;
        canvasHolderRef.current.appendChild(gl.canvas);

        const camera = new Camera(gl);
        camera.position.z = 12;
        camera.orthographic();


        function resize() {
            renderer.setSize(window.innerWidth, window.innerHeight);
            camera.perspective({
                aspect: gl.canvas.width / gl.canvas.height,
            });
        }
        window.addEventListener('resize', resize, false);
        resize();

        const scene = new Transform();

        const geometry = new Box(gl);

        const program = new Program(gl, {
            vertex: /* glsl */ `
            attribute vec3 position;

            uniform mat4 modelViewMatrix;
            uniform mat4 projectionMatrix;

            void main() {
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
        `,
            fragment: /* glsl */ `
            void main() {
                gl_FragColor = vec4(1.0);
            }
        `,
        });

        const mesh = new Mesh(gl, { geometry, program });
        mesh.setParent(scene);


        requestAnimationFrame(update);
        function update(t: number) {
            requestAnimationFrame(update);

            mesh.rotation.y -=  0.01;
            mesh.rotation.x +=  0.01;

            renderer.render({ scene, camera });
        }

        return () => {
            window.removeEventListener('resize', resize);
        };

    }, [canvasHolderRef]);

    return (<div ref={canvasHolderRef}><canvas id="ogl-canvas"></canvas></div>);
}

export default OglSpiningBoxExample;