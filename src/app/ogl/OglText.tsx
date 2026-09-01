
"use client";
import { useEffect, useRef } from 'react';
import { Renderer, Camera, Transform, Geometry, Text, Mesh, Texture, Program, Orbit } from 'ogl';

const vertex = /* glsl */ `
                attribute vec2 uv;
                attribute vec3 position;

                uniform mat4 modelViewMatrix;
                uniform mat4 projectionMatrix;

                varying vec2 vUv;

                void main() {
                    vUv = uv;

                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `;

const fragment = /* glsl */ `
                uniform sampler2D tMap;

                varying vec2 vUv;

                void main() {
                    vec3 tex = texture2D(tMap, vUv).rgb;
                    float signedDist = max(min(tex.r, tex.g), min(max(tex.r, tex.g), tex.b)) - 0.5;
                    float d = fwidth(signedDist);
                    float alpha = smoothstep(-d, d, signedDist);

                    if (alpha < 0.01) discard;

                    gl_FragColor.rgb = vec3(0.0);
                    gl_FragColor.a = alpha;
                }
            `;

const vertex100 =
                /* glsl */ `
            ` + vertex;

const fragment100 =
                /* glsl */ `#extension GL_OES_standard_derivatives : enable
                precision highp float;
            ` + fragment;

const vertex300 =
                /* glsl */ `#version 300 es
                #define attribute in
                #define varying out
            ` + vertex;

const fragment300 =
                /* glsl */ `#version 300 es
                precision highp float;
                #define varying in
                #define texture2D texture
                #define gl_FragColor FragColor
                out vec4 FragColor;
            ` + fragment;





function OglText() {
    const canvasHolderRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const renderer = new Renderer({ dpr: 2 });
        const gl = renderer.gl;
        document.body.appendChild(gl.canvas);
        gl.clearColor(1, 1, 1, 1);

        const camera = new Camera(gl, { fov: 45 });
        camera.position.set(0, 0, 7);

        const controls = new Orbit(camera);

        function resize() {
            renderer.setSize(window.innerWidth, window.innerHeight);
            camera.perspective({ aspect: gl.canvas.width / gl.canvas.height });
        }
        window.addEventListener('resize', resize, false);
        resize();

        const scene = new Transform();

        /*
    
        Instructions to generate necessary MSDF assets
    
        Install msdf-bmfont https://github.com/soimy/msdf-bmfont-xml
        `npm install msdf-bmfont-xml -g`
    
        Then, using a font .ttf file, run the following (using 'FiraSans-Bold.ttf' as example)
    
        `msdf-bmfont -f json -m 512,512 -d 2 --pot --smart-size FiraSans-Bold.ttf`
    
        Outputs a .png bitmap spritesheet and a .json with character parameters.
    
        */

        const texture = new Texture(gl, {
            generateMipmaps: false,
        });
        const img = new Image();
        img.onload = () => (texture.image = img);
        img.src = 'assets/fonts/FiraSans-Bold.png';

        const program = new Program(gl, {
            // Get fallback shader for WebGL1 - needed for OES_standard_derivatives ext
            vertex: renderer.isWebgl2 ? vertex300 : vertex100,
            fragment: renderer.isWebgl2 ? fragment300 : fragment100,
            uniforms: {
                tMap: { value: texture },
            },
            transparent: true,
            cullFace: false,
            depthWrite: false,
        });

        loadText();
        async function loadText() {
            const font = await (await fetch('assets/fonts/FiraSans-Bold.json')).json();

            const text = new Text({
                font,
                text: "don't panic",
                width: 4,
                align: 'center',
                letterSpacing: -0.05,
                size: 1,
                lineHeight: 1.1,
            });

            // Pass the generated buffers into a geometry
            const geometry = new Geometry(gl, {
                position: { size: 3, data: text.buffers.position },
                uv: { size: 2, data: text.buffers.uv },
                // id provides a per-character index, for effects that may require it
                id: { size: 1, data: text.buffers.id },
                index: { data: text.buffers.index },
            });

            const mesh = new Mesh(gl, { geometry, program });

            // Use the height value to position text vertically. Here it is centered.
            mesh.position.y = text.height * 0.5;
            mesh.setParent(scene);
        }

        requestAnimationFrame(update);
        function update(t: number) {
            requestAnimationFrame(update);

            controls.update();
            renderer.render({ scene, camera });
        }


    }, [canvasHolderRef]);

    return (<div ref={canvasHolderRef}><canvas id="ogl-canvas"></canvas></div>);
}

export default OglText;