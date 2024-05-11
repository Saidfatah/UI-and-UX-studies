'use client'
import React, { useState, useEffect, useRef } from "react";

function easeInOutQuad(t: number): number {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

function BlurredInput() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const containerRef = useRef<HTMLDivElement | undefined>();
    const containerX = useRef<number>(0);
    const containerY = useRef<number>(0);

    useEffect(() => {
        if (!containerRef.current || containerX.current || containerY.current) return;

        containerX.current = containerRef.current.offsetLeft;
        containerY.current = containerRef.current.offsetTop;
    }, [containerRef]);

    useEffect(() => {
        const updateMousePosition = (e: any) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener("mousemove", updateMousePosition);

        return () => {
            window.removeEventListener("mousemove", updateMousePosition);
        };
    }, []);

    const containerSizeInHalf = 340 / 2;
    const halfYContainer = containerY.current + containerSizeInHalf;

    const percentageY = 0.2 + Math.abs((mousePosition.y - (containerSizeInHalf + containerSizeInHalf * 0.2)) / (containerSizeInHalf + halfYContainer * 0.4))

    return (
        <div className="bg-black w-screen h-screen flex justify-center items-center relative">
            <div ref={containerRef as any} className="bg-blue-500 w-[340px] h-[400px] rounded-lg relative z-10 overflow-hidden">
                {/* SVG with gradient background */}
                <svg
                    className="absolute inset-0 w-full h-full rounded-lg"
                    viewBox="0 0 340 400"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <defs>
                        <radialGradient
                            className=" transition-all ease-out "
                            id="grad"
                            cx={`50%`}
                            cy={percentageY * 10 + "%"}
                            r="80%"
                            fx="50%"
                            fy="30%"
                        >
                            <stop offset="0%" stopColor="#ff10" />
                            <stop offset="100%" stopColor="#100" />
                        </radialGradient>
                    </defs>
                    <rect filter='url(#bg-filter)' x="0" y="0" width="340" height="400" fill="url(#grad)" />
                </svg>
            </div>
            {/* Radial gradient positioned on top */}
            <div className="absolute inset-0 w-screen h-screen bg-gradient-to-br from-transparent to-black"></div>
        </div>
    );
}

export default BlurredInput;
