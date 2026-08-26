"use client";
import { useRef, useState } from "react";
import { gsap } from "gsap";
import HeaderExpandingText, {
    HeaderExpandingTextRef,
} from "./HeaderExpandingLink";

import "./style.css";

const items = [
    {
        href: "#",
        mainText: "Home",
        centerText: "Home",
        rightText: "Home",
    },
    {
        href: "#",
        mainText: "About",
        centerText: "About",
        rightText: "About",
    },
    {
        href: "#",
        mainText: "Contact",
        centerText: "Contact",
        rightText: "Contact",
    },
];

function PrototypeStudio() {
    const itemRefs = useRef<(HeaderExpandingTextRef | null)[]>([]);
    const itemElementsRefs = useRef<(HTMLElement | null)[]>([]);

    const handleEnter = (index: number) => {

        const width = itemRefs.current[index]?.getHoverWidth() ?? 0;

        const tl = gsap.timeline({
            defaults: {
                duration: 0.8,
                ease: "expo.out",
            },
        });

        items.forEach((_, i) => {
            if (i === index) return;

            const ref = itemRefs.current[i];
            const elementRef = itemElementsRefs.current[i];

            if (!ref || !elementRef) return;
            // Every item gets its new position
            tl.to(
                elementRef,
                {
                    x: i <= index ? -width : 0,
                },
                0
            );

            // Every non-hovered item hides its text
            ref.hide();
        });

        const ref = itemRefs.current[index];
        const elementRef = itemElementsRefs.current[index];

        if (!ref || !elementRef) return;

        // Hovered item reveals its characters
        tl.to(
            elementRef,
            {
                x: -width,
            },
            0
        );
        ref.reveal();
    };

    const handleLeave = () => {
        const tl = gsap.timeline({
            defaults: {
                duration: 0.8,
                ease: "expo.out",
            },
        });

        items.forEach((_, i) => {
            const ref = itemRefs.current[i];
            const elementRef = itemElementsRefs.current[i];

            if (!ref || !elementRef) return;

            tl.to(
                elementRef,
                {
                    x: 0,
                },
                0
            );

            ref.hide();
        });
    };

    return (
        <div className="w-screen h-screen flex items-start justify-end p-[24px]">
            <div
                onMouseLeave={handleLeave}
                className="header-items flex items-center"
            >
                <div onMouseEnter={() => handleEnter(0)}>
                    <HeaderExpandingText
                        setElementRef={(element) => {
                            itemElementsRefs.current[0] = element;
                        }}
                        ref={(el) => {
                            itemRefs.current[0] = el;
                        }}
                        href="#"
                        mainText="WORKS"
                        centerText="we've"
                        rightText="DONE"
                        onEnter={() => {
                            handleEnter(0)
                        }
                        }
                    />
                </div>

                <div onMouseEnter={() => handleEnter(1)}>
                    <HeaderExpandingText
                        setElementRef={(element) => {
                            itemElementsRefs.current[1] = element;
                        }}
                        ref={(el) => {
                            itemRefs.current[1] = el;
                        }}
                        href="#"
                        mainText="ABOUT"
                        centerText="our"
                        rightText="BRAND"
                        onEnter={() => {
                            handleEnter(1)
                        }
                        }
                    />
                </div>

                <div onMouseEnter={() => handleEnter(2)}>
                    <HeaderExpandingText
                        setElementRef={(element) => {
                            itemElementsRefs.current[2] = element;
                        }}
                        ref={(el) => {
                            itemRefs.current[2] = el;
                        }}
                        href="#"
                        mainText="CONTACT"
                        centerText="us"
                        onEnter={() => {
                            handleEnter(2)
                        }
                        }
                    />
                </div>
            </div>
        </div>
    );
}

export default PrototypeStudio;