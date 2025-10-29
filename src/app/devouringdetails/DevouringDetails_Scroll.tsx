
'use client'
import Lenis from '@studio-freight/lenis';
import { useEffect, useRef } from 'react';
import TimelineWithScrollBar from './TimelineWithScrollBar';


function easeInOutQuad(x: number): number {
    return x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;
}


function DevouringDetails_Scroll() {
    const lenisRef = useRef<any>(null);

    useEffect(() => {
        const lenis = new Lenis({
            lerp: 0.05,
            // duration: 1, // Adjust for smoothness
            easing: easeInOutQuad, // Smooth ease-out
            smoothWheel: true,
        });

        const raf = (time: number) => {
            lenis.raf(time);
            requestAnimationFrame(raf);
        };
        requestAnimationFrame(raf);

        lenisRef.current = lenis;

        return () => lenis.destroy();
    }, []);

    return (<div className="h-fit w-full">
        <TimelineWithScrollBar />

        <div className="max-w-[clamp(760px,80vw,1200px)] mx-auto bg-blue-500 flex flex-col gap-[8px]">
            <div className="flex items-center justify-center h-screen w-full bg-gray-100">
                page 1
            </div>
            <div className="flex items-center justify-center h-screen w-full bg-gray-200">
                page 2
            </div>
            <div className="flex items-center justify-center h-screen w-full bg-gray-100">
                page 3
            </div>
            <div className="flex items-center justify-center h-screen w-full bg-gray-200">
                page 4
            </div>
            <div className="flex items-center justify-center h-screen w-full bg-gray-100">
                page 5
            </div>
            <div className="flex items-center justify-center h-screen w-full bg-gray-200">
                page 6
            </div>
        </div>


    </div>);
}

export default DevouringDetails_Scroll;