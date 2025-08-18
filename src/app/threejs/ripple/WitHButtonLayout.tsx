"use client"
import { useCallback, useRef } from "react";
import AnimationCanvas, { AnimationCanvasRef } from "./CanvasWithPoints";
import TextReveal from "@/app/TextReveal2/TextReveal";
import "../../TextReveal2/griadientMorph.textReveal.css"

function WithButtonLayout() {
    const backdropBlurRef = useRef<HTMLDivElement>(null);
    const btnRef = useRef<HTMLButtonElement>(null);

    const animationCanvasRef = useRef<AnimationCanvasRef>(null);

    const onClick = useCallback(() => {
        

        

        btnRef.current?.animate([
            { opacity: '1' ,transform: 'scale(1)' ,filter: 'blur(0px)' },
            { opacity: '0' ,transform: 'scale(0)' ,filter: 'blur(12px)' },
        ], {
            duration: 2000,
            fill: 'forwards',
            easing: 'cubic-bezier(0.68, -0.6, 0.32, 1.6)',
        });
        
        setTimeout(() => {
            animationCanvasRef.current?.triggerIntroAnimation()
        }, 2000);
        setTimeout(() => {
            backdropBlurRef.current?.animate([
                { opacity: '1' },
                { opacity: '0' },
            ], {
                duration: 1000,
                fill: 'forwards',
                easing: 'cubic-bezier(0.37, 0, 0.63, 1)',
            });
            setTimeout(() => {
                backdropBlurRef.current?.animate([
                    { opacity: '0' },
                    { opacity: '1' },
                ], {
                    duration: 1000,
                    fill: 'forwards',
                    easing: 'cubic-bezier(0.37, 0, 0.63, 1)',
                });
        
            }, 5000);
        }, 2000);

    
    }, [animationCanvasRef])

    return (<div className="relative w-screen bg-black h-screen flex items-center justify-center">
        {/* <div ref={backdropBlurRef} className="absolute top-0 left-0 w-screen h-screen  bg-transparent pointer-events-none backdrop-blur-[12px] z-[9]"></div>
        <div className="absolute z-[9] top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
            <button ref={btnRef} onClick={onClick} className="p-1 rounded-full animate-pulse bg-white cursor-pointer z-[9]">
            </button>
        </div> */}
        <TextReveal text="Hello World" delay={2} />
        {/* <AnimationCanvas ref={animationCanvasRef} /> */}

    </div>
    );
}

export default WithButtonLayout;