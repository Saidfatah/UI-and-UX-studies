"use client";

import { N } from "framer-motion/dist/types.d-6pKw1mTI";
import { useEffect, useRef, useState } from "react";

const SIZE = window.innerWidth;
const text = [
    "SOUL PROTOCOL",
    "IS THE FOUNDATION",
    "OF EVERY GREAT",
    "USER EXPERIENCE"
];
const radius = 150;


function easeInOutCubic(x: number): number {
    return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
}

function pointOnCircle(radius: number, angle: number) {
    return {
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius,
    };
}

function TextCirclesCanvasApproach() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [mouseDown, setmouseDown] = useState(false);
    const angleRef = useRef(-1);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // -------------------------
        // Resolution
        // -------------------------

        const dpr = window.devicePixelRatio || 1;

        canvas.width = SIZE * dpr;
        canvas.height = SIZE * dpr;

        canvas.style.width = `${SIZE}px`;
        canvas.style.height = `${SIZE}px`;

        // From this point on, work in logical 800 × 800 coordinates.
        ctx.scale(dpr, dpr);

        // -------------------------
        // Text
        // -------------------------


        ctx.fillStyle = "black";
        ctx.textAlign = "end";
        ctx.textBaseline = "middle";

        // -------------------------
        // Draw
        // -------------------------

        const drawText = (t: number) => (text: string, radius: number, offsetAngle: number = 0) => {
            const centerX = SIZE / 2;
            const centerY = SIZE / 2;

            // should flicker once in a while

            const shouldFlickAChar = Math.random() < 0.5;
            for (let i = 0; i < text.length; i++) {
                const speedFactor = mouseDown ? 0.0003 : 0.0001;
                // angleRef should help us have smeales transitikn from when mosue is down and not down

                angleRef.current = (i / text.length) * Math.PI * 2 + t * 0.0001 + offsetAngle;


                const { x, y } =
                    pointOnCircle(radius, angleRef.current);

                ctx.save();

                ctx.translate(
                    centerX + x,
                    centerY + y
                );

                // this make charcters face towards the center
                ctx.rotate(angleRef.current - Math.PI / 2);

                // ctx.fillStyle = `rgba(0, 0, 0, ${Math.sin(t * 0.001 + i * 0.5)})`;
                // randomly flicker a charcter
                const flicker = shouldFlickAChar && Math.random() > 0.9 ? 1 : 0;
                const grayScale = 255 * radius / SIZE - Math.sin(t * 0.0001);
                ctx.fillStyle = `rgba(${grayScale}, ${grayScale}, ${grayScale}, 1)`;

                // wobbly line
                // ctx.fillText(text[i], 0, 0 + Math.sin(t * 0.001 + i * 0.5) * 10);

                const shrinkFactor = mouseDown ? 20 : 1;
                ctx.font = `${16 + 16 * radius / SIZE}px Helvetica`;
                ctx.fontKerning = "auto";
                ctx.fillText(text[i], 0+20 * Math.sin(t * 0.001) , 0 - 500 * Math.sin(t * 0.0001) );

                ctx.restore();
            }
        };

        // -------------------------
        // Animation
        // -------------------------

        let animationFrame: number;

        const renderLoop = (t: number) => {
            // Clear using LOGICAL coordinates
            ctx.clearRect(
                0,
                0,
                SIZE,
                SIZE
            );

            for (let i = 0; i < 40; i++) {
                drawText(t)(text[i % text.length], radius + i * 16, i * 0.1);
            }

            animationFrame =
                requestAnimationFrame(renderLoop);
        };

        animationFrame =
            requestAnimationFrame(renderLoop);

        return () => {
            cancelAnimationFrame(animationFrame);
        };
    }, [mouseDown, angleRef]);

    return (
        <canvas
            onMouseDown={() => {
                setmouseDown(true);
            }}
            onMouseUp={() => {
                setmouseDown(false);
            }}
            ref={canvasRef}
            style={{
                width: `${window.innerWidth}px`,
                height: `${window.innerHeight}px`,
                background: "black",
                display: "block",
            }}
        />
    );
}

export default TextCirclesCanvasApproach;