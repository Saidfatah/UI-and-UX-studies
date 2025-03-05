'use client'
import { useState, useEffect, useRef } from "react";
import AaveLogo from "./AaveLogo";
import AaveLogosLeft from "./aaveLogosLeft";
import AaveLogosRight from "./aaveLogosRight";

function AaveEverywhere() {
    const [mousePosition, setMousePosition] = useState<"left" | "right" | "middle">("left");
    const [isVisible, setIsVisible] = useState(false);
    const containerRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            setIsVisible(true);
                            observer.unobserve(entry.target); // Stop observing after it becomes visible
                        }, 200);
                    }
                });
            },
            {
                threshold: 0.8 // Adjust threshold as needed (0.1 means 10% of element is visible)
            }
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => {
            if (containerRef.current) {
                observer.unobserve(containerRef.current);
                observer.disconnect();
            }
        };
    }, []);

    return (
        <div ref={containerRef}>
            {isVisible && (
                <>
                    <h2 className="title">Aave everywhere.</h2>
                    <p className="description">Join Aave’s growing constellation of builders.</p>

                    <div className="logosContainer">
                        <div
                            onMouseEnter={() => { setMousePosition('left') }}
                            className="logsGrid"
                        >
                            <AaveLogosLeft />
                        </div>

                        <div onMouseEnter={() => { setMousePosition('middle') }}>
                            <AaveLogo mousePosition={mousePosition} />
                        </div>

                        <div
                            onMouseEnter={() => { setMousePosition('right') }}
                            className="logsGrid"
                        >
                            <AaveLogosRight />
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default AaveEverywhere;