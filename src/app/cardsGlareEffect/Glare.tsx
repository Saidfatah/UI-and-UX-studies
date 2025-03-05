'use client'
import clsx from "clsx";
import { RefObject, useEffect, useRef } from "react";
import "./glare.css";

function Glare({ parentRef }: { parentRef: RefObject<HTMLDivElement> }) {
    const glareRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            if (glareRef.current && parentRef.current) {
                const parentTopOffset = parentRef.current.getBoundingClientRect().top
                const parentLeftOffset = parentRef.current.getBoundingClientRect().left


                const x = event.clientX - parentLeftOffset - 160 / 2;
                const y = event.clientY - parentTopOffset - 160 / 2;
                glareRef.current.style.transform = `translate(${x}px, ${y}px)`;
            }
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return (<div
        ref={glareRef}
        className="glare-inner  pointer-events-none absolute left-0 top-0 transform "
    >
        <div
            className={clsx(
                "h-40 w-40 animate-pulse rounded-full bg-white/20 transition duration-300 ",
                "blur-2xl",
                " group-data-[glare=true]/body:opacity-50"
            )}
        >
        </div>
    </div>);
}

export default Glare;