"use client";

import { useEffect, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { workItems } from "./utils";
import WorkItem from "./WorkItem";
import { remToPixel } from "../../util";

function WorksVideoImageItems() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [hoveredIndex, setHoveredIndex] = useState(-1);

    const currentIndex =
        hoveredIndex !== -1 ? hoveredIndex : activeIndex;

    useEffect(() => {
        const scrollerElement = document.querySelector(".main");

        if (!scrollerElement) return;

        const headerheight = remToPixel(5.5);
        const triggers = workItems.map((_, index) => {
            const el = document.querySelector(
                `[data-work-index="${index}"]`
            );

            if (!el) return null;
            
            return ScrollTrigger.create({
                scroller: scrollerElement,
                trigger: el,
                start: () => `top ${window.innerHeight / 2 + headerheight / 2}px`,
                end: workItems.length - 1 === index ? "center 30%" : "bottom 25%",
                markers: index === 0 ? true : false,
                invalidateOnRefresh: true,
                onEnter: () => {
                    setActiveIndex(index);
                },
                onLeaveBack: () => {
                    if (index > 0) {
                        setActiveIndex(index - 1);
                    }
                },
            });
        });

        return () => {
            triggers.forEach((trigger) => trigger?.kill());
        };
    }, []);

    return (
        <div
            className={[
                "works-items flex flex-col gap-y-20",
                "col-start-5 col-end-9",
                "pt-[calc(50vh+2rem)]",
                "pb-[calc(50vh_-_var(--header-height)_/_2_-_(var(--column)_*_4_+_var(--padding-container)_*_3)_*_0.5572_/_2)]",
            ].join(" ")}
        >
            {workItems.map((item, index) => (
                <div
                    key={index}
                    data-work-index={index}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(-1)}
                >
                    <WorkItem
                        {...item}
                        active={currentIndex === index}
                    />
                </div>
            ))}
        </div>
    );
}

export default WorksVideoImageItems;