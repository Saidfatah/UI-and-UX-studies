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
        const $countElement = document.querySelector(".works-count");
        const $counterElement = document.querySelector(".works-counter") as HTMLElement;
        const $namesWrapper = document.querySelector(".works-names") as HTMLElement;
        const $categoriesWrapper = document.querySelector(".works-categories") as HTMLElement;


        const $titlesWrapper = document.querySelector(".works-titles") as HTMLElement;
        const $titlesContainer = document.querySelector(".works-titles-container") as HTMLElement;
        const titles = document.querySelectorAll(".works-item-title");

        const $items = document.querySelectorAll(".works-item");
        const $itemsInner = document.querySelectorAll(".works-item-inner");

        const $worksButton = document.querySelector(".works-button") as HTMLElement;

        if (!$counterElement || !$countElement || !$namesWrapper || !$categoriesWrapper || !$titlesWrapper || !$titlesContainer || !titles || !$worksButton) return;
        if (!scrollerElement) return;

        if (!$items || $items.length === 0 || !$itemsInner || $itemsInner.length === 0) return;



        const headerheight = remToPixel(5.5);


        gsap.set([$namesWrapper, $categoriesWrapper], {
            alphaOpacity: 0
        });

        gsap.set($worksButton, {
            alphaOpacity: 0
        });

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



        // first 3 work items intro translateY for the inner card divs 
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


        // the main scroll triggers that handle the active index and work item image parralax
        const scrolltriggers: {
            activeItem: ScrollTrigger | null,
            itemImageParrallax: ScrollTrigger | null
        }[] = []

        Array.from($items).map((el, index) => {
            const workTitleElement = titles[index]

            const titleTranslateYAnimationTimeline = gsap.timeline();

            titleTranslateYAnimationTimeline.to(workTitleElement, {
                y: () =>
                    -($titlesContainer.getBoundingClientRect().height -
                        $titlesWrapper.getBoundingClientRect().height),
            });

            const activeItemScrollltrigger = ScrollTrigger.create({
                scroller: scrollerElement,
                trigger: el,
                start: () => `top ${window.innerHeight / 2 + headerheight / 2}px`,
                end: workItems.length - 1 === index ? "center 30%" : "bottom 25%",
                invalidateOnRefresh: true,
                scrub: true,
                animation: titleTranslateYAnimationTimeline,
                onEnter: () => {
                    setActiveIndex(index);
                    if (index === 0) {
                        gsap.to([$namesWrapper, $categoriesWrapper], {
                            autoAlpha: 1,
                            duration: .4,
                            ease: "beaucoup.alpha"
                        })
                    }
                },
                onLeaveBack: () => {
                    if (index > 0) {
                        setActiveIndex(index - 1);
                    }

                    if (index === 0) {
                        gsap.to([$namesWrapper, $categoriesWrapper], {
                            autoAlpha: 0,
                            duration: .4,
                            ease: "beaucoup.alpha"
                        })
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


        // the works button 
        ScrollTrigger.create({
            trigger: worksSectionRef.current,
            scroller: scrollerElement,
            start: "bottom bottom+=5%",
            end: "bottom bottom",
            onEnter: () => {
                gsap.killTweensOf($worksButton)
                gsap.to($worksButton, {
                    autoAlpha: 1,
                    duration: .4,
                    ease: "beaucoup.alpha"
                })
            }
            ,
            onLeaveBack: () => {
                gsap.killTweensOf($worksButton)
                gsap.to($worksButton, {
                    autoAlpha: 0,
                    duration: .3,
                    ease: "power2.out"
                })
            }
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

            <div className="col-span-2  pt-[calc(50vh_-_1rem)] flex justify-end">
                <div className="works-names opacity-0 relative body-16 silvanaRegular italic" >
                    {workItems.map((item, index) => (
                        <div
                            key={index}
                            className={[
                                "works-item-name text-right whitespace-nowrap",
                                index > 0 && "absolute top-0 right-0",
                                index === currentIndex ? "opacity-100" : "opacity-0"
                            ].join(" ")}
                        >
                            {item.title}
                        </div>
                    ))}
                </div>
            </div>

            <div className="col-start-9 col-end-10 pt-[calc(50vh_-_1rem)]">
                <div className="works-categories relative body-16 opacity-0 silvanaRegular italic"  >
                    {workItems.map((item, index) => (
                        <div
                            key={index}
                            className={[
                                "works-item-category whitespace-nowrap",
                                index > 0 && "absolute top-0 left-0",
                                index === currentIndex ? "opacity-100" : "opacity-0"
                            ].join(" ")}
                        >
                            {item.category}
                        </div>
                    ))}
                </div>
            </div>

            <div className="works-titles-container col-start-10 col-end-13 flex items-end uppercase ">
                <div className="works-titles w-full flex flex-col justify-end items-end pb-10">
                    {workItems.map((work, index) => (
                        <a
                            key={index}
                            href={work.href}
                            className={
                                [
                                    "works-item-title body-38  transition-opacity duration-smooth ",
                                    index === currentIndex ? "opacity-100" : "opacity-30"
                                ]
                                    .join(" ")
                            }
                        >
                            {work.title}
                        </a>
                    ))}
                </div>
            </div>

            <div
                className="works-button opacity-0   absolute bottom-[calc((50vh_-_(var(--column)_*_4_+_var(--padding-container)_*_3)_*_0.5572_/_2)_/_2)] left-1/2 -translate-x-1/2"
            // style="opacity: 1; visibility: inherit;"
            >
                <a
                    href="https://www.prototypestudio.fr/works/"
                    className="button dark relative inline-flex gap-x-10 items-center silvanaRegular body-20 italic cursor-pointer">
                    <span className="svg-wrapper w-[0.5rem] mt-[0.1rem] ">
                        <svg width="5" height="9" viewBox="0 0 5 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5 4.5L0 0L0 9L5 4.5Z" fill="currentColor"></path>
                        </svg>
                    </span>
                    <span className="button-text">All our projects</span>
                </a>
            </div>

        </div>


        <div className="relative grid-w -mt-[100vh] z-0 z-1 pointer-events-none">
            <WorksVideoImageItems currentIndex={currentIndex} setHoveredIndex={setHoveredIndex} />
        </div>
    </section>);
}

export default WorksSection;