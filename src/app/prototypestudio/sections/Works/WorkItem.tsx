"use client";

import { useEffect, useRef } from "react";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

import type { WorkItem as WorkItemType } from "./types";

// gsap.registerPlugin(ScrollTrigger);

type Props = WorkItemType & {
    active: boolean;
};

const WorkItem = (item: Props) => {
    const imageRef = useRef<HTMLDivElement>(null);
    const itemRef = useRef<HTMLDivElement>(null);

    // useEffect(() => {
    //     if (!itemRef.current || !imageRef.current) return;

    //     const animation = gsap.fromTo(
    //         imageRef.current,
    //         {
    //             scale: 1.3,
    //             yPercent: -15,
    //         },
    //         {
    //             yPercent: 15,
    //             ease: "none",
    //         }
    //     );

    //     const trigger = ScrollTrigger.create({
    //         trigger: itemRef.current,
    //         start: "top bottom",
    //         end: "bottom top",
    //         markers: true,
    //         scrub: true,
    //         animation,
    //     });

    //     return () => {
    //         trigger.kill();
    //         animation.kill();
    //     };
    // }, []);

    return (
        <div
            ref={itemRef}
            className={[
                "works-item relative w-full pointer-events-auto",
                item.active ? "active" : "",
            ]
                .filter(Boolean)
                .join(" ")}
        >
            <a
                className="card-work group works-item-inner flex flex-col gap-y-10 is-loaded"
                href={item.href}
                aria-label={item.title}
            >
                <div className="relative w-full h-0 pt-[55.72%] overflow-hidden">
                    <div
                        ref={imageRef}
                        className="works-item-image absolute-full"
                    >
                        <div
                            className="image w-full h-full"
                            style={
                                {
                                    "--ratio": item.imageAspectRatio,
                                } as React.CSSProperties
                            }
                        >
                            <figure className="w-full h-full">
                                <img
                                    className="lazy opacity-0 w-full h-full object-cover entered loaded"
                                    width="150"
                                    height="150"
                                    alt={item.imgAlt}
                                    src={item.imageSrc}
                                />
                            </figure>
                        </div>

                        <video
                            className="card-work-video absolute-full object-cover"
                            autoPlay
                            loop
                            muted
                            playsInline
                            src={item.videoSrc}
                        />
                    </div>

                    <div className="works-item-overlay absolute-full bg-white opacity-50 pointer-events-none" />
                </div>

                <div className="flex flex-col gap-y-[0.8rem] xl:hidden">
                    <div className="flex gap-x-20 justify-between items-start">
                        <div className="body-38 uppercase">
                            {item.client}
                        </div>

                        <div className="body-18 font-heading italic mt-[0.7rem]">
                            {item.category}
                        </div>
                    </div>

                    <div className="body-18 font-heading italic">
                        {item.title}
                    </div>
                </div>
            </a>
        </div>
    );
};

export default WorkItem;