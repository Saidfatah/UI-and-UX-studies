"use client";

import { useEffect, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { initialStates, targetStates, workItems } from "./works.utils";
import WorkItem from "./WorkItem";
import { remToPixel } from "../../util";
import gsap from "gsap";


function WorksVideoImageItems() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [hoveredIndex, setHoveredIndex] = useState(-1);

    const currentIndex =
        hoveredIndex !== -1 ? hoveredIndex : activeIndex;

    useEffect(() => {
        const scrollerElement = document.querySelector(".main");
        // const namesWrapper = document.querySelector(".works-names");
        // const categoriesWrapper = document.querySelector(".works-categories");

        const titles = document.querySelectorAll(".works-item-title");
        const titlesWrapper = document.querySelector(".works-titles");
        const titlesContainer = document.querySelector(".works-categories");

        const $items = document.querySelectorAll(".works-item");
        const $itemsInner = document.querySelectorAll(".works-item-inner");

        console.log($itemsInner)
        // if (!scrollerElement || !namesWrapper || !categoriesWrapper) return;
        if (!scrollerElement) return;

        if (!$items || $items.length === 0 || !$itemsInner || $itemsInner.length === 0) return;
        // console.log($itemsInner[0])


        const headerheight = remToPixel(5.5);

        const triggers = Array.from($items).map((el, index) => {
            const workTitleElement = titles[index]

            if (workTitleElement && titlesContainer && titlesWrapper) {
                const titleTranslateYAnimationTimeline = gsap.timeline();

                titleTranslateYAnimationTimeline.to(workTitleElement, {
                    y: () =>
                        -(titlesContainer.getBoundingClientRect().height -
                            titlesWrapper.getBoundingClientRect().height),
                });
            }


            return ScrollTrigger.create({
                scroller: scrollerElement,
                trigger: el,
                start: () => `top ${window.innerHeight / 2 + headerheight / 2}px`,
                end: workItems.length - 1 === index ? "center 30%" : "bottom 25%",
                markers: index === 0 ? true : false,
                invalidateOnRefresh: true,
                // animation: titleTranslateYAnimationTimeline,
                onEnter: () => {
                    // we pnly want to trigger fade in animation for the categories and names
                    // only when the first work item is triggered 
                    // if (index === 0) {
                    //     const tl = gsap.timeline();
                    //     tl.to([categoriesWrapper, namesWrapper], {
                    //         autoAlpha: 1,
                    //         duration: .4,
                    //         ease: "beaucoup.alpha"
                    //     })
                    // }

                    // Ln.set([e.name, e.category], {
                    //     autoAlpha: 0
                    // })

                    setActiveIndex(index);
                },
                onLeaveBack: () => {
                    if (index > 0) {
                        setActiveIndex(index - 1);
                    }
                    if (index === 0) {
                        // const tl = gsap.timeline();
                        // tl.to([categoriesWrapper, namesWrapper], {
                        //     autoAlpha: 0,
                        //     duration: .4,
                        //     ease: "beaucoup.alpha"
                        // })
                    }
                },
            });
        });



        gsap.set($itemsInner[0], {
            ...initialStates.firstWorkItemInner
        })
        gsap.set($itemsInner[1], {
            ...initialStates.secondWorkItemInner
        })
        gsap.set($itemsInner[2], {
            ...initialStates.thirdWorkItemInner
        })

        // scroll triger for teh first 3 work items transition animation for the entery point 
        const firstAppearScrolltrigger = ScrollTrigger.create({
            trigger: $items[0],
            scroller: scrollerElement,
            start: "top bottom",
            end: "top center",
            scrub: true,
            animation: gsap.fromTo($itemsInner[0], {
                ...initialStates.firstWorkItemInner
            }, {
                ...targetStates.firstWorkItemInner
            })
        })

        const secondAppearScrolltrigger = ScrollTrigger.create({
            trigger: $items[1],
            scroller: scrollerElement,
            start: "top bottom",
            end: "top center",
            scrub: true,
            animation: gsap.fromTo($itemsInner[1], {
                ...initialStates.secondWorkItemInner
            }, {
                ...targetStates.secondWorkItemInner
            })
        })

        const thirdAppearScrolltrigger = ScrollTrigger.create({
            trigger: $items[2],
            scroller: scrollerElement,
            start: "top bottom",
            end: "top center",
            scrub: true,
            animation: gsap.fromTo($itemsInner[2], {
                ...initialStates.thirdWorkItemInner
            }, {
                ...targetStates.thirdWorkItemInner
            })
        })

        return () => {
            triggers.forEach((trigger) => trigger?.kill());

            firstAppearScrolltrigger?.kill();
            secondAppearScrolltrigger?.kill();
            thirdAppearScrolltrigger?.kill();
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