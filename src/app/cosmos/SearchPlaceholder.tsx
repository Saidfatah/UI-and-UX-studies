"use client";

import { useEffect, useRef, useState } from "react";

const placeholders = [
    {
        text: "'vitsoe shelving'",
        spread: "34px",
    },
    {
        text: "'two souls intertwining'",
        spread: "48px",
    },
    {
        text: "'women in history'",
        spread: "36px",
    },
    {
        text: "'scandinavian furniture'",
        spread: "48px",
    },
    {
        text: "'archival fashion'",
        spread: "36px",
    },
];

const SHIMMER_DURATION = 2000;
const FADE_DURATION = 500;

export default function SearchPlaceholder() {
    const fadeWrapperRef = useRef<HTMLSpanElement>(null)
    const [index, setIndex] = useState(0);

    useEffect(() => {
        let timeout: ReturnType<typeof setTimeout>;

        const cycle = () => {
            let firstCycle = true
            timeout = setTimeout(() => {
                if (!fadeWrapperRef.current) return;

                // 1. Fade out
                fadeWrapperRef.current.style.opacity = "0"

                setTimeout(() => {
                    if (!fadeWrapperRef.current) return;

                    // 2. Change the text while invisible
                    setIndex((current) => (current + 1) % placeholders.length);

                    // 3. Fade back in
                    fadeWrapperRef.current.style.opacity = "1"

                    cycle();
                }, FADE_DURATION);
            }, SHIMMER_DURATION * 2 - 500);
        };

        cycle();

        return () => clearTimeout(timeout);
    }, [fadeWrapperRef]);

    const current = placeholders[index];

    return (
        <div className="grid min-w-0 *:[grid-area:1/1]">
            <span
                ref={fadeWrapperRef}
                className="fade-wrapper"
                style={{
                    "--fade-duration": `${FADE_DURATION}ms`,
                } as React.CSSProperties}
            >

                <span
                    key={index}
                    className="truncate search-placeholder"
                    style={{
                        "--spread": current.spread,
                        "--shimmer-duration": `${SHIMMER_DURATION}ms`,
                        "--fade-duration": `${FADE_DURATION}ms`,
                    } as React.CSSProperties}

                >
                    {current.text}
                </span>
            </span>
        </div>
    );
}