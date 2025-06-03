import React, { useEffect, useRef, useState } from "react";


function ClerkDocumentationProgress({ xValues, yValues, heightValues, clipPathTop, clipPathBottom }: { clipPathBottom: number, clipPathTop: number, xValues: number[], yValues: number[], heightValues: number[] }) {
    const ref = useRef<HTMLDivElement>(null);
    const [pathData, setPathData] = useState("");

    useEffect(() => {
        if (!ref.current) return;
        let path = "M 0 0 "; // Start position

        xValues.forEach((xOffset, index) => {
            console.log(xOffset, yValues[index])
            path += `,L ${xOffset} ${yValues[index]} `;
            path += `,L ${xOffset} ${yValues[index] + heightValues[index]} `;
        });

        path += `,L ${0} ${ref.current.offsetHeight} `;

        setPathData(path);
    }, [ref]);

    return (
        <div ref={ref} className="relative h-full w-16">
            <svg
                height="100%"
                viewBox={`0 0 100 ${ref.current?.offsetHeight ?? 200}`}
            >
                <defs>
                    <clipPath id="clipRect">
                        <rect x="0" y={clipPathTop} width="100" height={clipPathTop + clipPathBottom} />
                    </clipPath>
                </defs>

                {/* Base Path */}
                <path d={pathData} stroke="#2f3037" fill="transparent" strokeWidth="1" />

                {/* Clipped Red Path */}
                <path
                    d={pathData}
                    stroke="white"
                    fill="transparent"
                    strokeWidth="2"
                    clipPath="url(#clipRect)" />
            </svg>
        </div>
    );
}

export default ClerkDocumentationProgress;
