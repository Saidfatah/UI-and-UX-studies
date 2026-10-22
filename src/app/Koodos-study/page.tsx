"use client";

import { useEffect, useRef } from "react";
import "./style.css";
import { clampProgress } from "./utils";

const initialPhase = 0.576;
const morphPhase = 1.4;
const scrollOffset = 0.2;
const finalHold = 1;

// will be used to set the section height for the scroll 
const introductionMorphTravel = initialPhase + morphPhase * 2;

const totalDuration = introductionMorphTravel + finalHold;


function getExpansion(progress: number) {
    const adjustedProgress =
        progress * (totalDuration + scrollOffset) - scrollOffset;

    return clampProgress(adjustedProgress / initialPhase);
}

function getMorphProgress(progress: number) {
    const adjustedProgress =
        progress * (totalDuration + scrollOffset) - scrollOffset;

    const morphStart = initialPhase;
    const morphEnd = initialPhase + morphPhase * 2;

    return clampProgress(
        (adjustedProgress - morphStart) / (morphEnd - morphStart)
    );
}

function getActiveCard(progress: number) {
    if (progress < 1 / 3) return 0;
    if (progress < 2 / 3) return 1;

    return 2;
}


function Koodos() {
    const introRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const introduction = introRef.current;

        if (!introduction) return;

        let animationFrame = 0;
        let previousExpansion = -1;
        let previousMorphProgress = -1;
        let previousCard = -1;

        function updateAnimation() {
            animationFrame = 0;

            const section = introRef.current;
            const stage = (section as HTMLElement).querySelector(".intro-stage");
            if (!section || !stage) return;


            const scrollRange = section.offsetHeight - stage.clientHeight


            let progress = 0;

            if (scrollRange > 0) {
                const scrollStartingFromSection = window.scrollY - section.offsetTop;
                progress = scrollStartingFromSection / scrollRange ;
            }

            progress = clampProgress(progress);


            // Phase 1: Expand the frame.
            const expansion = getExpansion(progress);

            if (expansion !== previousExpansion) {
                previousExpansion = expansion;

                section.style.setProperty(
                    "--expansion",
                    String(expansion)
                );
            }

            // Phases 2 and 3: Morph between SVG states.
            const morphProgress = getMorphProgress(progress);

            if (morphProgress !== previousMorphProgress) {
                previousMorphProgress = morphProgress;

                section.style.setProperty(
                    "--morph-progress",
                    String(morphProgress)
                );

                section.dispatchEvent(
                    new CustomEvent("intro-morph", {
                        detail: { progress: morphProgress },
                    })
                );
            }

            // Switch cards at the thirds of the morph timeline.
            const activeCard = getActiveCard(morphProgress);

            if (activeCard !== previousCard) {
                previousCard = activeCard;

                section.style.setProperty(
                    "--active-card",
                    String(activeCard)
                );

                section
                    .querySelectorAll<HTMLElement>(".intro-card")
                    .forEach((card, index) => {
                        const isActive = index === activeCard;

                        card.classList.toggle("is-active", isActive);
                        card.setAttribute(
                            "aria-hidden",
                            String(!isActive)
                        );
                    });
            }
        }

        function requestUpdate() {
            if (animationFrame !== 0) return;

            animationFrame = requestAnimationFrame(updateAnimation);
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
            introduction.style.removeProperty("--morph-progress");
            introduction.style.removeProperty("--active-card");
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
                        "--intro-morph-travel": introductionMorphTravel,
                        "--intro-final-hold": finalHold,
                        "--expansion": 0,
                        "--morph-progress": 0,
                        "--active-card": 0,
                    } as React.CSSProperties
                }
            >
                <div className="intro-stage">
                    <div className="intro-frame">
                        <div className="intro-layout">
                            <div className="intro-cards">
                                <article className="intro-card is-active">
                                    <div className="card-inner">
                                        <h2 className=" text-[24px]">First I</h2>
                                        <div className=" h-[16px] w-[300px] rounded-sm opacity-75 bg-gray-300" />
                                        <div className=" h-[16px] w-[200px] rounded-sm opacity-75 bg-gray-300" />
                                    </div>
                                </article>

                                <article className="intro-card" aria-hidden="true">
                                    <div className="card-inner">
                                        <h2 className=" text-[24px]">Second II</h2>
                                        <div className=" h-[16px] w-[250px] rounded-sm opacity-75 bg-gray-300" />
                                        <div className=" h-[16px] w-[300px] rounded-sm opacity-75 bg-gray-300" />
                                    </div>
                                </article>

                                <article className="intro-card" aria-hidden="true">
                                    <div className="card-inner">
                                        <h2 className=" text-[24px]">Third III</h2>
                                        <div className=" h-[16px] w-[250px] rounded-sm opacity-75 bg-gray-300" />
                                        <div className=" h-[16px] w-[300px] rounded-sm opacity-75 bg-gray-300" />
                                    </div>
                                </article>
                            </div>

                            <div className="intro-visual">
                                {/* Pass --morph-progress to your SVG component. */}
                                <svg
                                    viewBox="0 0 100 100"
                                    role="img"
                                    aria-label="Introduction visual"
                                >
                                    <rect
                                        x="20"
                                        y="20"
                                        width="20"
                                        height="20"
                                        fill="currentColor"
                                    />
                                    <rect
                                        x="50"
                                        y="20"
                                        width="20"
                                        height="20"
                                        fill="currentColor"
                                    />
                                    <rect
                                        x="20"
                                        y="50"
                                        width="20"
                                        height="20"
                                        fill="currentColor"
                                    />
                                    <rect
                                        x="50"
                                        y="50"
                                        width="20"
                                        height="20"
                                        fill="currentColor"
                                    />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="second h-screen w-full bg-red-50" />
        </div>
    );
}

export default Koodos;
