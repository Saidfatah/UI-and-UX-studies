
"use client";

import { useEffect, useRef } from "react";
import "./style.css";

const initialPhase = 0.576;
const morphPhase = 1.4;
const scrollOffset = 0.2;
const finalHold = 1;

const introMorphTravel = initialPhase + morphPhase * 2;

function Koodos() {
    const introRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const introduction = introRef.current;

        if (!introduction) return;

        const stage = introduction.querySelector(".intro-stage");

        if (!stage) return;

        let animationFrame = 0;
        let previousExpansion = -1;

        const totalDuration = introMorphTravel + finalHold;

        function updateExpansion() {
            if (!introduction) return;
            if (!stage) return;

            animationFrame = 0;

            const scrollRange =
                (introduction.offsetHeight - stage.clientHeight) /
                window.innerHeight;

            let progress = 0;

            if (scrollRange > 0) {
                progress =
                    (window.scrollY - introduction.offsetTop) /
                    (scrollRange * window.innerHeight);
            }

            progress = Math.max(0, Math.min(1, progress));

            const adjustedProgress =
                progress * (totalDuration + scrollOffset) - scrollOffset;

            const expansion = Math.max(
                0,
                Math.min(1, adjustedProgress / initialPhase)
            );

            if (expansion !== previousExpansion) {
                previousExpansion = expansion;

                introduction.style.setProperty(
                    "--expansion",
                    String(expansion)
                );
            }
        }

        function requestUpdate() {
            if (animationFrame !== 0) return;

            animationFrame = requestAnimationFrame(updateExpansion);
        }

        window.addEventListener("scroll", requestUpdate, {
            passive: true,
        });

        window.addEventListener("resize", requestUpdate);

        requestUpdate();

        return () => {
            cancelAnimationFrame(animationFrame);

            window.removeEventListener("scroll", requestUpdate);
            window.removeEventListener("resize", requestUpdate);

            introduction.style.removeProperty("--expansion");
        };
    }, []);

    return (
        <div className="w-full">
            <section className="hero h-screen w-full bg-red-50" />

            <section
                ref={introRef}
                className="introduction"
                style={
                    {
                        "--intro-morph-travel": introMorphTravel,
                        "--intro-final-hold": finalHold,
                        "--expansion": 0,
                    } as React.CSSProperties
                }
            >
                <div className="intro-stage">
                    <div className="intro-frame">
                        <div className="intro-layout" />
                    </div>
                </div>
            </section>

            <section className="second h-screen w-full bg-red-50" />
        </div>
    );
}

export default Koodos;
