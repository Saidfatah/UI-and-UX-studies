import { useEffect, useRef } from "react";
import { initialStates } from "../CoverSection/cover.section.utils";
import gsap from "gsap";


function ManifiestoSection() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const circleRef = useRef<HTMLDivElement>(null);
    const circleLineRef = useRef<HTMLDivElement>(null);
    const wordsParentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const circle = circleRef.current;
        const circleLine = circleLineRef.current;

        if (!circle || !circleLine) return;

        const positionLine = (angle: number) => {
            const radians = (angle - 90) * (Math.PI / 180);

            const radius = circle.offsetWidth / 2;
            const centerX = circle.offsetWidth / 2;
            const centerY = circle.offsetHeight / 2;

            // to make sure ittouches teh circle from outside we subtract 3 
            const left = Math.cos(radians) * radius + centerX - 3;
            const top = Math.sin(radians) * radius + centerY - 3;

            circleLine.style.left = `${left}px`;
            circleLine.style.top = `${top}px`;
        };

        positionLine(-30);

        window.addEventListener("resize", () => positionLine(-30));

        return () => {
            window.removeEventListener("resize", () => positionLine(-30));
        };
    }, [circleRef, circleLineRef]);


    useEffect(() => {
        const section = sectionRef.current;
        const wordsParent = wordsParentRef.current;

        if (!section || !wordsParent) return;

        const ctx = gsap.context(() => {
            const words = gsap.utils.toArray<HTMLElement>(
                ".word",
                wordsParent
            );

            gsap.set(words, initialStates.manfiestoWords);

            const scrollerElement = document.querySelector(".main");
            if (!scrollerElement) return;

            gsap.to(words, {
                opacity: 1,
                duration: 1.5,
                stagger: 0.015,
                ease: "beaucoup.alpha",
                scrollTrigger: {
                    trigger: section,
                    scroller: scrollerElement,
                    start: "top 25%",
                    once: true,
                },
            });
        }, section);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="manifesto pb-[26.5rem] overflow-hidden">
            <div className="border-b-px">
                <div className="grid-w relative">
                    <div className="col-span-4 h-full  border-r-[1px]" />

                    <div className="col-span-7 pt-[23.5rem] pb-12">
                        <h2 ref={wordsParentRef} className="body-45 font-heading font-light italic" data-animation="titleWords">
                            <span style={{ display: "inline-block", ...initialStates.manfiestoWords }} className="word" aria-hidden="true" >Prototype</span> {" "}
                            <span style={{ display: "inline-block", ...initialStates.manfiestoWords }} className="word" aria-hidden="true" >is</span> {" "}
                            <span style={{ display: "inline-block", ...initialStates.manfiestoWords }} className="word" aria-hidden="true" >a</span> {" "}
                            <span style={{ display: "inline-block", ...initialStates.manfiestoWords }} className="word" aria-hidden="true" >creative-driven</span> {" "}
                            <span style={{ display: "inline-block", ...initialStates.manfiestoWords }} className="word" aria-hidden="true" >hybrid</span> {" "}
                            <span style={{ display: "inline-block", ...initialStates.manfiestoWords }} className="word" aria-hidden="true" >structure,</span> {" "}
                            <span style={{ display: "inline-block", ...initialStates.manfiestoWords }} className="word" aria-hidden="true" >a</span> {" "}
                            <span style={{ display: "inline-block", ...initialStates.manfiestoWords }} className="word" aria-hidden="true" >one-stop</span> {" "}
                            <span style={{ display: "inline-block", ...initialStates.manfiestoWords }} className="word" aria-hidden="true" >shop,</span> {" "}
                            <span style={{ display: "inline-block", ...initialStates.manfiestoWords }} className="word" aria-hidden="true" >from</span> {" "}
                            <span style={{ display: "inline-block", ...initialStates.manfiestoWords }} className="word" aria-hidden="true" >ideas</span> {" "}
                            <span style={{ display: "inline-block", ...initialStates.manfiestoWords }} className="word" aria-hidden="true" >to</span> {" "}
                            <span style={{ display: "inline-block", ...initialStates.manfiestoWords }} className="word" aria-hidden="true" >execution.</span> {" "}
                            <span style={{ display: "inline-block", ...initialStates.manfiestoWords }} className="word" aria-hidden="true" >We</span> {" "}
                            <span style={{ display: "inline-block", ...initialStates.manfiestoWords }} className="word" aria-hidden="true" >are</span> {" "}
                            <span style={{ display: "inline-block", ...initialStates.manfiestoWords }} className="word" aria-hidden="true" >not</span> {" "}
                            <span style={{ display: "inline-block", ...initialStates.manfiestoWords }} className="word" aria-hidden="true" >just</span> {" "}
                            <span style={{ display: "inline-block", ...initialStates.manfiestoWords }} className="word" aria-hidden="true" >a</span> {" "}
                            <span style={{ display: "inline-block", ...initialStates.manfiestoWords }} className="word" aria-hidden="true" >production</span> {" "}
                            <span style={{ display: "inline-block", ...initialStates.manfiestoWords }} className="word" aria-hidden="true" >house,</span> {" "}
                            <span style={{ display: "inline-block", ...initialStates.manfiestoWords }} className="word" aria-hidden="true" >we</span> {" "}
                            <span style={{ display: "inline-block", ...initialStates.manfiestoWords }} className="word" aria-hidden="true" >are</span> {" "}
                            <span style={{ display: "inline-block", ...initialStates.manfiestoWords }} className="word" aria-hidden="true" >an</span> {" "}
                            <span style={{ display: "inline-block", ...initialStates.manfiestoWords }} className="word" aria-hidden="true" >agency,</span> {" "}
                            <span style={{ display: "inline-block", ...initialStates.manfiestoWords }} className="word" aria-hidden="true" >a</span> {" "}
                            <span style={{ display: "inline-block", ...initialStates.manfiestoWords }} className="word" aria-hidden="true" >design</span> {" "}
                            <span style={{ display: "inline-block", ...initialStates.manfiestoWords }} className="word" aria-hidden="true" >studio,</span> {" "}
                            <span style={{ display: "inline-block", ...initialStates.manfiestoWords }} className="word" aria-hidden="true" >and</span> {" "}
                            <span style={{ display: "inline-block", ...initialStates.manfiestoWords }} className="word" aria-hidden="true" >a</span> {" "}
                            <span style={{ display: "inline-block", ...initialStates.manfiestoWords }} className="word" aria-hidden="true" >digital</span> {" "}
                            <span style={{ display: "inline-block", ...initialStates.manfiestoWords }} className="word" aria-hidden="true" >factory</span> {" "}
                            <span style={{ display: "inline-block", ...initialStates.manfiestoWords }} className="word" aria-hidden="true" >all</span> {" "}
                            <span style={{ display: "inline-block", ...initialStates.manfiestoWords }} className="word" aria-hidden="true" >in</span> {" "}
                            <span style={{ display: "inline-block", ...initialStates.manfiestoWords }} className="word" aria-hidden="true" >one</span> {" "}
                            <span style={{ display: "inline-block", ...initialStates.manfiestoWords }} className="word" aria-hidden="true" >place.</span> {" "}
                            <span style={{ display: "inline-block", ...initialStates.manfiestoWords }} className="word" aria-hidden="true" >A</span> {" "}
                            <span style={{ display: "inline-block", ...initialStates.manfiestoWords }} className="word" aria-hidden="true" >place</span> {" "}
                            <span style={{ display: "inline-block", ...initialStates.manfiestoWords }} className="word" aria-hidden="true" >where</span> {" "}
                            <span style={{ display: "inline-block", ...initialStates.manfiestoWords }} className="word" aria-hidden="true" >brands</span> {" "}
                            <span style={{ display: "inline-block", ...initialStates.manfiestoWords }} className="word" aria-hidden="true" >can</span> {" "}
                            <span style={{ display: "inline-block", ...initialStates.manfiestoWords }} className="word" aria-hidden="true" >be</span> {" "}
                            <span style={{ display: "inline-block", ...initialStates.manfiestoWords }} className="word" aria-hidden="true" >more</span> {" "}
                            <span style={{ display: "inline-block", ...initialStates.manfiestoWords }} className="word" aria-hidden="true" >authentic,</span> {" "}
                            <span style={{ display: "inline-block", ...initialStates.manfiestoWords }} className="word" aria-hidden="true" >bold,</span> {" "}
                            <span style={{ display: "inline-block", ...initialStates.manfiestoWords }} className="word" aria-hidden="true" >and</span> {" "}
                            <span style={{ display: "inline-block", ...initialStates.manfiestoWords }} className="word" aria-hidden="true" >rise</span> {" "}
                            <span style={{ display: "inline-block", ...initialStates.manfiestoWords }} className="word" aria-hidden="true" >above</span> {" "}
                            <span style={{ display: "inline-block", ...initialStates.manfiestoWords }} className="word" aria-hidden="true" >the</span> {" "}
                            <span style={{ display: "inline-block", ...initialStates.manfiestoWords }} className="word" aria-hidden="true" >crowd.</span> {" "}
                        </h2>
                    </div>
                    <div
                        ref={circleRef}
                        className="circle absolute  bottom-0 right-0 w-[46.8rem] h-[46.8rem] border rounded-full pointer-events-none"
                    >
                        <div
                            ref={circleLineRef}
                            className="circle-line   absolute "
                        >
                            <div className="absolute top-0 z-[-1] left-0 w-[200vw] h-px bg-black/10 -translate-x-1/2 -rotate-[30deg]" />
                        </div>

                        <div className="absolute-center -translate-x-1/2 -translate-y-1/2">
                            <div className="absolute top-0 left-0 w-[200vw] h-px bg-black/10 -translate-x-1/2 -rotate-[24deg]" />
                        </div>
                    </div>
                </div>
            </div>


            <div className="grid-w relative">
                <div className="relative col-span-4 pr-container  pt-container  pb-40  border-r ">
                    <div className="relative w-full h-0 pt-[56.25%] ">
                        <div className="absolute-full">
                            <video
                                className="simple-video w-full h-full object-cover"
                                data-src="/videos/prototype-showreel-about.mp4"
                                autoPlay
                                loop
                                muted
                                playsInline
                                src="/videos/prototype-showreel-about.mp4">
                            </video>
                        </div>
                    </div>
                    <div className="absolute bottom-0 right-0 -rotate-[10deg]">
                        <div className="absolute left-1/2 -translate-x-1/2 w-[200vw] h-px bg-black/10"></div>
                    </div>
                </div>

                <div className="col-span-5 pt-container">
                    <a
                        href="https://www.prototypestudio.fr/about/"
                        className="button dark relative inline-flex gap-x-10 items-center silvanaRegular body-20 italic cursor-pointer"
                    >
                        <span
                            className="svg-wrapper w-[0.5rem] mt-[0.1rem] ">
                            <svg
                                width="5"
                                height="9"
                                viewBox="0 0 5 9"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M5 4.5L0 0L0 9L5 4.5Z" fill="currentColor"></path>
                            </svg>
                        </span>
                        <span className="button-text">About us</span>
                    </a>
                </div>
            </div>
        </section>
    );
}

export default ManifiestoSection;