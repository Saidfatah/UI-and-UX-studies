'use client'
import { useCallback, useEffect, useRef, useState } from "react";
import { useAnimate } from "framer-motion"

const getPosition = (mousePosition: "left" | "right" | "middle", y?: number) => {
    if (mousePosition === "left") return `translateX(-5px) translateY(${y}px)`
    if (mousePosition === "right") return `translateX(5px) translateY(${y}px)`
    return `translateX(0px) translateY(${y}px)`
}

function useDebounce<T extends (...args: any[]) => void>(callback: T, delay: number) {
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    return (...args: Parameters<T>) => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(() => {
            callback(...args);
        }, delay);
    };
}


function AaveLogo({ mousePosition }: { mousePosition: "left" | "right" | "middle" }) {
    const [eyesScaleRef, animateEyesScale] = useAnimate()

    const [mounted, setMounted] = useState(false);
    const [yPosition, setYPosition] = useState(0);

    const container = useRef<any>()
    const eyesPositionRef = useRef<any>()

    const initialOpenEyes = () => {
        setTimeout(() => {
            eyesScaleRef.current.style.transform = "scaleY(1)"
        }, 700);
    }

    const blinkEyes = () => {
        eyesScaleRef.current.style.transform = "scaleY(0)"
        setTimeout(() => {
            eyesScaleRef.current.style.transform = "scaleY(1)"
        }, 200);
    }
    const squintEyes = () => {
        setTimeout(() => {
            eyesScaleRef.current.style.transform = "scaleY(0.2)"
        }, 200);
    }

    const moveEyesTowardsPosition = (position: "left" | "right" | "middle", y?: number) => {
        blinkEyes()

        setTimeout(() => {
            eyesPositionRef.current.style.transform = getPosition(position, 0)
        }, 200);
    }

    useEffect(() => {
        setMounted(true);
        initialOpenEyes()
    }, []);

    useEffect(() => {
        if (!mounted) return

        moveEyesTowardsPosition(mousePosition, yPosition)

    }, [mousePosition, yPosition]);

    const hasentMovedtimeOut = useRef<NodeJS.Timeout>()
    const debouncedHandleMouseMove = useDebounce((event: MouseEvent) => {
        if (!container.current) return;

        if (hasentMovedtimeOut.current) clearTimeout(hasentMovedtimeOut.current)

        const yRelative = event.clientY - container.current.offsetTop;
        const height = container.current.offsetHeight;
        setYPosition((yRelative / height) * 15);


        hasentMovedtimeOut.current = setTimeout(() => {
            squintEyes()
        }, 3000);
    }, 300);

    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => debouncedHandleMouseMove(event);

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [debouncedHandleMouseMove]);

    return (<div ref={container} data-mounted={mounted} className="aaveLogoContainer">
        <div data-mounted={mounted} className="aaveLogo">
            <div className="aaveLogoInner">
                <svg className="  flex-shrink-0" xmlns="http://www.w3.org/2000/svg" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 190.5 190.5" enable-background="new 0 0 190.5 190.5">
                    <g>
                        <path fill="#FFFFFF" d="M94.7,23.3C54,23.3,21,56.9,21,98.3h18.8c0-31.1,24.4-56.2,54.8-56.2c30.5,0,54.8,25.2,54.8,56.2h18.8   C168.4,56.9,135.4,23.3,94.7,23.3L94.7,23.3L94.7,23.3z" />
                    </g>
                </svg>

                <div className="logoEyesPosition">
                    <div
                        className=" origin-bottom"
                        style={{
                            transition: "all 0.2s cubic-bezier(0.85, 0, 0.15, 1)",
                            transform: "scaleY(0)"
                        }}
                        ref={eyesScaleRef}
                    >
                        <div
                            style={{
                                transition: "all 0.1s 0.2s cubic-bezier(0.85, 0, 0.15, 1)",
                                transform: getPosition(mousePosition)
                            }}
                            ref={eyesPositionRef}
                        >
                            <div className="logoEyes">
                                <div className="left-eye" />
                                <div className="right-eye" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>);
}

export default AaveLogo;