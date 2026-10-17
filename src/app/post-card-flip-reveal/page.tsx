"use client"
import { useState } from "react";
import "./style.css"
import InkingTheLetters from "./InkingTheLetters";
import { cards } from "./util";



type HoverState = {
    current: number;
    previous: number;
};

const getZIndex = (
    cardIndex: number,
    current: number,
    previous: number,
) => {
    if (cardIndex === current) return 4;
    if (cardIndex === previous) return 3;
    return 2;
};
function Page() {
    
    const [hover, setHover] = useState<HoverState>({
        current: -1,
        previous: -1,
    });

    const [flippedActive, setFlippedActive] = useState(false);


    return (<div className="w-screen h-screen flex items-center justify-center">
        <div
            className="photos relative isolate flex w-max items-center py-8"
        >
            {cards.map((card, cardIndex) => (
                <button
                    className="postcard"
                    style={{
                        height: "var(--postcard-height, 17.5rem)",
                        ["--postcard-ratio" as any]: 1.227627471383975,
                        zIndex: getZIndex(
                            cardIndex,
                            hover.current,
                            hover.previous,
                        ),
                        aspectRatio: 1.227627471383975,
                    }}
                    onMouseEnter={() => {
                        setFlippedActive(true)
                        setHover((prev) => ({
                            current: cardIndex,
                            previous:
                                prev.current !== -1 && prev.current !== cardIndex
                                    ? prev.current
                                    : prev.previous,
                        }));
                    }}
                    onMouseLeave={() => {
                        setFlippedActive(false)
                        // setHover((prev) => ({
                        //     ...prev,
                        //     current: -1,
                        // }));
                    }}
                    data-flipped={flippedActive && cardIndex === hover.current}
                >
                    <span
                        style={{
                            rotate: card.frameRotate
                        }}
                        className="frame motion block h-full w-full pointer-events-none"
                    >
                        <span
                            className="flip motion relative block h-full w-full rounded-card"
                        >
                            {/* front face */}

                            <span className="face absolute inset-0 bg-surface  overflow-hidden  rounded-card border-surface border-8 ">
                                <img
                                    alt=""
                                    loading="lazy"
                                    decoding="async"
                                    className="h-full w-full object-cover grayscale"
                                    src={card.image}
                                    width="4719"
                                    height="3844"
                                >
                                </img>
                            </span>

                            {/* back face  */}

                            <span className="face bg-surface back absolute inset-0 isolate flex flex-col gap-4 overflow-hidden rounded-card text-left p-7">
                                <span aria-hidden="true" className="pointer-events-none absolute inset-0 z-10 rounded-[inherit] border-black/[0.04]  border-8"></span>

                                <span className="type-note flex min-h-0 flex-1 items-start pt-4">

                                    <span className="block max-w-64 -rotate-3">
                                        <span
                                            className="write"
                                            data-active={flippedActive && cardIndex === hover.current}
                                        >
                                            <span className="sr-only">{card.content}</span>

                                            <InkingTheLetters words={card.words} />
                                        </span>
                                    </span>
                                </span>
                            </span>

                        </span>
                    </span>
                </button>
            ))}
        </div>
    </div >);
}

export default Page;