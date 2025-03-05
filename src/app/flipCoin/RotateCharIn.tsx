"use client"
import { useEffect, useRef } from "react";

const RotateInChar = ({ children, fadeIn, index, totalLength }: any) => {
    const ref = useRef<HTMLSpanElement>(null)

    useEffect(() => {
        if (ref.current) {
            ref.current.style.transform = fadeIn ? 'rotateY(0deg) rotateX(0deg)' : 'rotateY(90deg) rotateX(90deg)'
            ref.current.style.filter = fadeIn ? "blur(0px)" : "blur(5px)"
            ref.current.style.opacity = fadeIn ? "1" : "0"

            setTimeout(() => {
                if (ref.current)
                    ref.current.style.fontSize = fadeIn ? "24px" : "16px"
            }, 150);
        }
    }, [ref, fadeIn]);

    return (
        <span
            ref={ref}
            style={{
                opacity: 0,
                transform: 'rotateY(90deg) rotateX(90deg)',
                filter: "blur(5px)",
                transition: `all 0.7s ${(fadeIn ? index : totalLength - index) * 0.01 + (fadeIn ? 0.3 : 0)}s cubic-bezier(0.68, -0.6, 0.32, 1.6)`,
            }}
            className="transform-3d perspective-dramatic origin-left inline-block text-[16px] text-black"
        >
            {children}
        </span>
    )
}

export default RotateInChar;