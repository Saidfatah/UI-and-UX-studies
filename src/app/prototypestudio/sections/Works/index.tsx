import { useEffect, useRef, useState } from "react";
import WorksVideoImageItems from "./WorksVideoImageItems";
import { initialStates, targetStates, workItems } from "./works.utils";
import { remToPixel } from "../../util";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

function WorksSection() {
    const worksSectionRef = useRef<HTMLDivElement>(null);

    const [activeIndex, setActiveIndex] = useState(0);
    const [hoveredIndex, setHoveredIndex] = useState(-1);

    const currentIndex =
        hoveredIndex !== -1 ? hoveredIndex : activeIndex;

    useEffect(() => {
        const scrollerElement = document.querySelector(".main");
        // const namesWrapper = document.querySelector(".works-names");
        // const categoriesWrapper = document.querySelector(".works-categories");
        const $countElement = document.querySelector(".works-count");
        const $counterElement = document.querySelector(".works-counter") as HTMLElement;

        const titles = document.querySelectorAll(".works-item-title");
        const titlesWrapper = document.querySelector(".works-titles");
        const titlesContainer = document.querySelector(".works-categories");

        const $items = document.querySelectorAll(".works-item");
        const $itemsInner = document.querySelectorAll(".works-item-inner");


        if (!$counterElement || !$countElement) return;
        if (!scrollerElement) return;

        if (!$items || $items.length === 0 || !$itemsInner || $itemsInner.length === 0) return;



        const headerheight = remToPixel(5.5);


        const counterAnimationTimeline = gsap.timeline({
            defaults: {
                ease: "none"
            }
        });
        counterAnimationTimeline.to($counterElement, {
            y: () => window.innerHeight - $counterElement.offsetHeight - remToPixel(2) - headerheight
        });

        const worksSectionScrollTrigger = ScrollTrigger.create({
            scroller: scrollerElement,
            trigger: worksSectionRef.current,
            start: "top 35%",
            end: "bottom bottom",
            scrub: true,
            invalidateOnRefresh: !0,
            animation: counterAnimationTimeline
        })


        const scrolltriggers: {
            activeItem: ScrollTrigger | null,
            itemImageParrallax: ScrollTrigger | null
        }[] = []

        Array.from($items).map((el, index) => {
            const workTitleElement = titles[index]

            if (workTitleElement && titlesContainer && titlesWrapper) {
                const titleTranslateYAnimationTimeline = gsap.timeline();

                titleTranslateYAnimationTimeline.to(workTitleElement, {
                    y: () =>
                        -(titlesContainer.getBoundingClientRect().height -
                            titlesWrapper.getBoundingClientRect().height),
                });
            }


            const activeItemScrollltrigger = ScrollTrigger.create({
                scroller: scrollerElement,
                trigger: el,
                start: () => `top ${window.innerHeight / 2 + headerheight / 2}px`,
                end: workItems.length - 1 === index ? "center 30%" : "bottom 25%",
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

            const itemImageParallaxScrolltrigger = ScrollTrigger.create({
                trigger: el,
                scroller: scrollerElement,
                scrub: true,
                animation: gsap.fromTo(el.querySelector('.works-item-image'), {
                    scale: 1.3,
                    yPercent: -15
                }, {
                    yPercent: 15,
                    ease: "none"
                })
            })

            const triggers = {
                activeItem: activeItemScrollltrigger,
                itemImageParrallax: itemImageParallaxScrolltrigger
            }

            scrolltriggers.push(triggers);
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
            worksSectionScrollTrigger?.kill();

            scrolltriggers.forEach((trigger) => trigger.activeItem?.kill());
            scrolltriggers.forEach((trigger) => trigger.itemImageParrallax?.kill());

            firstAppearScrolltrigger?.kill();
            secondAppearScrolltrigger?.kill();
            thirdAppearScrolltrigger?.kill();
        };
    }, []);

    return (<section ref={worksSectionRef} className="works">
        <div className="grid-w sticky top-[calc(var(--header-height)_-_1px)] h-[calc(100vh_-_var(--header-height))] border-y  overflow-hidden">
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full h-px bg-black-8" ></div>

            <div className="absolute left-1/2 top-0 w-[100vh] h-full border rounded-full translate-y-[-1px] -translate-x-1/2" >
                <div className="absolute top-[0px] left-1/2 w-[calc(50%_+_1px)] h-[50%] bg-white"></div>

                <div className="absolute left-[5%] w-[1px] h-[1px]  top-1/2">
                    <div className="absolute left-1/2 w-[200vw] h-px bg-black-8 -translate-x-1/2 -rotate-[35deg]" ></div>
                </div>

                <div className="absolute left-[45%] w-[1px] h-[1px]  top-1/2">
                    <div className="absolute left-1/2 w-[200vw] h-px bg-black-8 -translate-x-1/2 -rotate-[31deg]" ></div>
                </div>

                <div className="absolute -right-[8%] w-[1px] h-[1px]   top-1/2">
                    <div className="absolute left-1/2 w-[200vw] h-px bg-black-8 -translate-x-1/2 -rotate-[24deg]"></div>
                </div>
            </div>

            <div className="col-span-2">
                <div className="works-counter flex gap-x-20 items-baseline ">
                    <div className="works-count body-180">{currentIndex < 9 ? '0' : ''}{currentIndex + 1}</div>
                    <div className="body-50">/11</div>
                </div>
            </div>
        </div>


        <div className="relative grid-w -mt-[100vh] z-0 z-1 pointer-events-none">
            <WorksVideoImageItems currentIndex={currentIndex} setHoveredIndex={setHoveredIndex} />
        </div>
    </section>);
}

export default WorksSection;