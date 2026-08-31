import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { CustomEventsPayloads } from "../types";

function LoaderFade() {
    const fadeRef = useRef<HTMLDivElement>(null)
    
    useEffect(() => {
        if (!fadeRef.current) return;

        const timeline = gsap.timeline({
            delay: 0.5,
        });

        timeline.call(() => {
            setTimeout(() => {
                window.dispatchEvent(
                    new CustomEvent<CustomEventsPayloads["covertitle:appear"]>(
                        "covertitle:appear"
                    )
                );
            }, 0.5 * 1000);
        });


        timeline.to(fadeRef.current, {
            autoAlpha: 0,
            // x:"-100%",
            // borderRadius: 99,
            // scaleX:0,
            // x:"100%",
            // y: "-100%",
            ease: "power4.out",
            duration: 1,
        });

        

        return () => {
            timeline.kill();
        };
    }, [fadeRef]);

    return (
        <div
            ref={fadeRef}
            className="loader-fade  fixed top-0 left-0 w-full h-full bg-white pointer-events-none z-transition"
        />
    );
}

export default LoaderFade;
